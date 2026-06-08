# Visual Effects — Use Only What the Creative Needs

> Every effect must earn its place.

---

## Remotion Primitives

```jsx
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion'

const frame = useCurrentFrame()
const { fps } = useVideoConfig()

// Spring pop-in
const scale = spring({ frame, fps, config: { damping: 10, stiffness: 180, mass: 0.8 } })

// Smooth fade
const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })

// Slide up
const y = interpolate(frame, [0, 20], [60, 0], { extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) })

// Pulse (CTA buttons)
const pulse = interpolate((frame % 60) / 60, [0, 0.5, 1], [0.97, 1.03, 0.97])
```

---

## Effect Decisions

### Price Reveal
Use when price is the hook:
```jsx
const oldPriceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })
const newPriceScale = spring({ frame: frame - 30, fps, config: { damping: 8, stiffness: 200 } })
```

### Zoom Punch
Use when static shot needs energy:
```jsx
const zoom = interpolate(frame, [0, 8], [1.08, 1.0], { extrapolateRight: 'clamp' })
```

### Section Background
Different gradient = different emotional zone:
- Urgency: dark red/orange
- Solution: dark green
- Proof: dark blue
- CTA: deep green

---

## What NOT to Add

- Particle effects unless lifestyle/luxury brief
- Glitch effects unless brand is tech/edgy
- Animations lasting > 1s for a simple element
- More than 3 simultaneous animated elements
- Effects that hide the subject's face

---

## Color Psychology Per Emotion

| Emotion | Primary | Accent |
|---------|---------|--------|
| Urgency/FOMO | #FF2D2D red | #FFE600 yellow |
| Trust/Authority | #1a1a2e navy | #FFFFFF white |
| Success/Positive | #00C853 green | #FFFFFF white |
| Premium/Luxury | #1a1a1a black | #D4AF37 gold |
| Energy/Youth | #FF6B00 orange | #FFE600 yellow |

Match to creative brief tone. Never default without reading copy first.
