# Editing Principles — Semantic-First

> Read the creative. Let it tell you what it needs. Never impose a template.

---

## The Only Rule: Serve the Creative

Before touching any tool, answer:
- What is this video trying to make the viewer FEEL?
- What is the ONE action it wants them to take?
- What makes this specific offer unique?

Every edit decision flows from those answers.

---

## How to Read a Creative Semantically

### Listen to the narration first
```bash
COMP="node_modules/@remotion/compositor-darwin-arm64"
DYLD_LIBRARY_PATH="$COMP" "$COMP/ffmpeg" \
  -i public/video.mp4 \
  -vn -af "silencedetect=noise=-30dB:d=0.1" \
  -f null - 2>&1 | grep -E "silence_(start|end)"
```

Map every pause. Each pause = potential cut, headline moment, or effect trigger.
The narration structure IS the editing structure.

### Identify the natural rhythm
- Fast speech = high energy = fast cuts, bold effects
- Slow deliberate speech = authority = clean design, fewer elements
- Emotional peaks = amplify visually at that exact moment
- Silence after key phrase = hold that frame, let it breathe

### Find moments that need amplification
Not every sentence needs a headline. Look for:
- The phrase the narrator EMPHASIZES (louder, slower)
- Price reveals
- The problem statement
- The CTA (always)

---

## Cuts

Cut when the video benefits from it. No other reason.

- Long silence with no visual change? Cut it.
- Topic changes? Maybe a cut, maybe a fade — depends on energy.
- Use silencedetect: pause > 0.5s with no visual change = candidate.

---

## Audio Sync Discipline

Never guess timestamps. Always measure:
1. Run silencedetect
2. Map silence gaps to phrase boundaries
3. Build `<Sequence>` with measured `durationInFrames`
4. Preview in Remotion Studio: `npm run remotion`

One wrong timestamp = everything out of sync.

---

## What to Add (Decide Per Creative)

| Element | Add when | Skip when |
|---------|----------|-----------|
| Captions | Viewer might watch muted, fast narration | Video already has subtitle overlay |
| Dynamic headlines | Key phrase needs visual emphasis | Video already has strong text graphics |
| Price animation | Price is the hook | Price mentioned casually |
| Sound effects | Transition feels flat, CTA needs punch | Video has strong background audio |
| Cuts | Pauses with no visual change | Pacing already tight |
| CTA section | Brief has explicit call to action | Video ends naturally |
| Zoom effects | Static shot feels dead | Camera already moving |

---

## The "Is This Better?" Test

After every addition ask:
- Does this serve the message?
- Does it respect the pace the narrator set?
- Does it help conversion?

If the answer is "it looks cool" but not "yes to all three" — remove it.
