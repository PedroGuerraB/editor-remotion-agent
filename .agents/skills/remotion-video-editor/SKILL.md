---
name: remotion-video-editor
description: Senior video editor for ad creatives. Use when /remotion is invoked after creative validation. Analyzes copy semantics, adds dynamic headlines, auto-captions, visual/audio effects, cuts, and CTA using Remotion.js. Acts as a professional video editor who understands marketing psychology.
when_to_use: "After human validation of a creative brief. Invoked via /remotion. Produces a complete edited video ready for publishing."
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Remotion Senior Video Editor

> **Philosophy:** Every frame earns attention. Every cut has intent. Copy drives every visual decision.
> **Core Principle:** The video must SELL. Aesthetics serve conversion, not vanity.

---

## Selective Reading (MANDATORY)

| File | Status | When |
|------|--------|------|
| [copy-analysis.md](copy-analysis.md) | 🔴 REQUIRED | Always — copy drives everything |
| [editing-principles.md](editing-principles.md) | 🔴 REQUIRED | Always — pacing and cuts |
| [visual-effects-catalog.md](visual-effects-catalog.md) | ⚪ Optional | When adding visual FX |
| [audio-effects-catalog.md](audio-effects-catalog.md) | ⚪ Optional | When adding sound FX |
| [remotion-patterns.md](remotion-patterns.md) | ⚪ Optional | Remotion implementation |

---

## Pipeline (ALWAYS FOLLOW THIS ORDER)

```
1. ANALYZE  → Read copy + video semantics
2. PLAN     → Map sections, timing, effects
3. CONFIRM  → Show plan to user before executing
4. BUILD    → Write Remotion components
5. RENDER   → npx remotion render
6. CONCAT   → ffmpeg with bundled binary
7. DELIVER  → Final file in out/
```

---

## ANALYZE: Copy Semantics

Extract from creative brief:

| Element | What to Find |
|---------|-------------|
| **Hook** | First 3s attention grabber |
| **Problem** | Pain point being solved |
| **Solution** | Product/offer positioning |
| **Proof** | Social proof, price anchor |
| **Urgency** | Scarcity, deadline, FOMO |
| **CTA** | Exact action phrase |
| **Tone** | Aggressive / Educational / Emotional |

---

## BUILD: Remotion Components

### Audio Sync Protocol (MANDATORY BEFORE ANY AUDIO WORK)
```bash
COMP="node_modules/@remotion/compositor-darwin-arm64"
DYLD_LIBRARY_PATH="$COMP" "$COMP/ffmpeg" \
  -ss [START] -t [DURATION] \
  -i public/video.mp4 \
  -vn -af "silencedetect=noise=-30dB:d=0.1" \
  -f null - 2>&1 | grep -E "silence_(start|end)"
```
Map silence gaps to phrase boundaries. Never cut mid-word.

### Captions
- Extract phrase timestamps from silencedetect
- Position: bottom 15% of frame
- Style: white text, black outline, 52-60px
- Never overlap two captions

### Dynamic Headlines
- Only where copy calls for emphasis
- Max 1 headline visible at a time
- Timing synced to narrator speaking the phrase

---

## RENDER

```bash
# Render
npx remotion render src/index.jsx [CompositionId] out/[name].mp4

# Concat (ALWAYS re-encode, never -c copy)
COMP="node_modules/@remotion/compositor-darwin-arm64"
DYLD_LIBRARY_PATH="$COMP" "$COMP/ffmpeg" -y \
  -t [MAIN_S] -i out/main.mp4 -i out/cta.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" \
  -c:v h264_videotoolbox -b:v 4M -c:a aac \
  out/final_[name].mp4
```

---

## Anti-Patterns (NEVER DO)

| Bad | Good |
|-----|------|
| `-c copy` for concat | Always re-encode |
| `volume callback` on @remotion/media Audio | Use `<Sequence durationInFrames>` |
| Guessing audio timestamps | Always silencedetect first |
| Multiple concurrent captions | 1 caption at a time |
| System ffmpeg | Bundled compositor ffmpeg |

---

## Bundled ffmpeg
```
node_modules/@remotion/compositor-darwin-arm64/ffmpeg
DYLD_LIBRARY_PATH=node_modules/@remotion/compositor-darwin-arm64
```
