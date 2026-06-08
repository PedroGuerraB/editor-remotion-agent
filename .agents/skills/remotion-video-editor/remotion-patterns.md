# Remotion Patterns — Proven Implementation

---

## Project Structure
```
src/
  index.jsx          ← registerRoot
  Root.jsx           ← <Composition> definitions
  [Creative]Main.jsx ← main composition component
public/
  video.mp4          ← source video (narration + visuals)
  sfx/               ← sound effects
out/
  [name].mp4         ← rendered output
```

## Root.jsx Pattern
```jsx
import { Composition } from 'remotion'
import { CreativeMain } from './CreativeMain'

export const RemotionRoot = () => (
  <Composition
    id="CreativeMain"
    component={CreativeMain}
    durationInFrames={TOTAL_FRAMES}
    fps={30}
    width={1080}
    height={1920}
  />
)
```

## Main Composition Pattern
```jsx
import { AbsoluteFill, Audio, Sequence, Video, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'

export const CreativeMain = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill>
      <Video src={staticFile('video.mp4')} />

      {/* Narration — bounded per section */}
      <Sequence durationInFrames={SECTION_1_END}>
        <Audio src={staticFile('video.mp4')} startFrom={Math.round(START_S * fps)} />
      </Sequence>

      {CAPTIONS.map(({ text, from, duration }) => (
        <Sequence key={text} from={from} durationInFrames={duration}>
          <Caption text={text} />
        </Sequence>
      ))}

      {frame >= HEADLINE_1_START && frame < HEADLINE_1_END && (
        <Headline text="KEY PHRASE" frame={frame - HEADLINE_1_START} />
      )}

      {frame >= CTA_START && (
        <CTASection frame={frame - CTA_START} fps={fps} />
      )}
    </AbsoluteFill>
  )
}
```

## Caption Component
```jsx
const Caption = ({ text, duration }) => {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 5, duration - 5, duration], [0, 1, 1, 0], { extrapolateRight: 'clamp' })
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 120 }}>
      <div style={{
        opacity,
        fontSize: 56, fontWeight: 800, color: '#fff',
        textAlign: 'center',
        textShadow: '2px 2px 8px #000, -2px -2px 8px #000',
        padding: '0 40px', lineHeight: 1.3,
        fontFamily: "'Arial Black', Arial, sans-serif",
      }}>{text}</div>
    </AbsoluteFill>
  )
}
```

## Silencedetect → Caption Map
```bash
COMP="node_modules/@remotion/compositor-darwin-arm64"
DYLD_LIBRARY_PATH="$COMP" "$COMP/ffmpeg" \
  -i public/video.mp4 \
  -vn -af "silencedetect=noise=-30dB:d=0.1" \
  -f null - 2>&1 | grep -E "silence_(start|end)"
```
Parse: each `silence_end` = phrase start. Next `silence_start` = phrase end.
Convert: `frames = Math.round(seconds * 30)`

## Render + Concat
```bash
npx remotion render src/index.jsx CreativeMain out/creative.mp4

COMP="node_modules/@remotion/compositor-darwin-arm64"
DYLD_LIBRARY_PATH="$COMP" "$COMP/ffmpeg" -y \
  -t MAIN_SECONDS -i out/main.mp4 \
  -i out/cta.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" \
  -c:v h264_videotoolbox -b:v 4M -c:a aac \
  out/final.mp4
```

## Common Gotchas
- `Audio` must be from `remotion`, not `@remotion/media`
- `Video` component from `remotion` for source video
- `staticFile()` only serves from `public/`
- `durationInFrames` on `<Sequence>` = safest audio cut mechanism
- `h264_videotoolbox` = macOS hardware encoder. Use `libx264` on Linux.
