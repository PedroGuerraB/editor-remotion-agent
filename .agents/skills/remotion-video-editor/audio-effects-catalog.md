# Audio Effects — Serve the Narrative

---

## Sound Effect Placement

SFX go in `public/sfx/`. Reference via `staticFile('sfx/name.mp3')`.

```jsx
import { Audio, staticFile, Sequence } from 'remotion'

<Sequence from={frameOfImpact} durationInFrames={30}>
  <Audio src={staticFile('sfx/whoosh.mp3')} volume={0.6} />
</Sequence>
```

---

## When to Add Which SFX

| Moment | SFX Type | Timing |
|--------|----------|--------|
| Element pop-in | Short pop/ding | Exact frame of appearance |
| Section transition | Whoosh | 5 frames before cut |
| Price reveal | Impact/cash | Frame of new price appearing |
| CTA button | Rising tone | Frame button pops in |
| Urgency section | Heartbeat/tick | Loop during urgency |

Only add SFX when creative energy calls for it. Calm educational = no impact sounds.

---

## Narration Audio Rules

Source narration from `public/video.mp4` is the anchor. Everything wraps around it.

```jsx
// ALWAYS bound narration with <Sequence durationInFrames>
// NEVER use volume callback as primary cut mechanism
// ALWAYS run silencedetect before placing Audio sequences

<Sequence from={phraseStartFrame} durationInFrames={phraseDurationFrames}>
  <Audio src={staticFile('video.mp4')} startFrom={Math.round(phraseStartSeconds * fps)} />
</Sequence>
```

---

## Background Music

Use only if brief mentions it OR video has long silent dead sections.

- Volume: 10-20% during speech
- Volume: 0% during CTA (voice must be 100% clear)
- Fade out: 15 frames before video ends

```jsx
<Audio
  src={staticFile('music/background.mp3')}
  volume={(f) => f >= ctaStartFrame ? 0 : 0.15}
/>
```

---

## Audio Checklist

- [ ] Narration uses `<Sequence durationInFrames>` not volume callbacks
- [ ] No audio bleeds past intended section
- [ ] SFX volume never louder than narration (max 0.7)
- [ ] Music ducked to 0 during CTA
- [ ] Silencedetect run before every segment boundary
- [ ] No unwanted content in any segment
- [ ] CTA section ends in complete silence (3s hold)
