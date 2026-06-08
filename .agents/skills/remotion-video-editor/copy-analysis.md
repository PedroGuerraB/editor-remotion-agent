# Copy Analysis — Video Editor Brain

> Copy is the script. Video is the performance. Never deviate from the script.

---

## How to Read a Creative Semantically

### 1. Find the Golden Sentence
The ONE phrase the viewer must remember:
- Becomes the biggest headline
- Anchors the CTA
- Is the video's emotional peak

### 2. Identify Emotional Register

| Register | Signals | Visual Treatment |
|----------|---------|------------------|
| **FOMO/Urgency** | "só hoje", "últimas vagas", "encerra em" | Red palette, countdown, shake |
| **Social Proof** | "mais de X clientes", "avaliações" | Numbers animating up, testimonial cards |
| **Price Anchor** | "de R$X por R$Y", "desconto" | Strike-through old, yellow highlight new |
| **Authority** | "especialista", "certificado" | Clean, professional, measured pacing |
| **Transformation** | "antes/depois", "resultados" | Split screens, progress bars |
| **Educational** | "aprenda", "descubra" | Step numbers, calm pace |

### 3. Map Copy to Video Sections

For EACH sentence in the narration, assign:
- **Section**: Hook / Problem / Solution / Proof / Urgency / CTA
- **Timestamp**: when in video (use silencedetect)
- **Visual**: what appears on screen at that moment
- **Headline**: key word(s) to animate (only if needed)

### 4. Price Display Rules
If offer has a price:
- Show crossed-out original first (animate strikethrough)
- Reveal new price with pop animation
- Keep price visible minimum 3 seconds
- Yellow (#FFE600) or green (#00E676) for final price

### 5. CTA is SACRED
Use the EXACT words from the brief. Never paraphrase.
- "Clique em saiba mais" → button: "👇 CLIQUE EM SAIBA MAIS"
- "Acesse agora" → button: "👆 ACESSE AGORA"

### 6. Urgency Signals to Amplify
If brief mentions time/stock limits:
- Time limit → pulsing visual indicator
- Stock limit → low-stock badge
- Price increasing → before/after price animation

---

## Input Format

When `/remotion` is invoked, accept:
1. **Text brief** — user pastes copy/script
2. **File path** — `public/brief.txt`
3. **Video only** — derive from narration via silencedetect

If video only:
```bash
COMP="node_modules/@remotion/compositor-darwin-arm64"
DYLD_LIBRARY_PATH="$COMP" "$COMP/ffmpeg" \
  -i public/video.mp4 \
  -vn -af "silencedetect=noise=-30dB:d=0.1" \
  -f null - 2>&1 | grep -E "silence_(start|end)"
```
Phrase structure = editing structure.
