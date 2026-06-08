---
description: Senior video editor command. Analyzes creative semantics and produces a fully edited video with captions, headlines, visual/audio effects, cuts, and CTA. Invoked after human validation of a creative.
---

# /remotion — AI Senior Video Editor

$ARGUMENTS

---

## What This Does

Takes a validated creative (video + copy/brief) and produces a professionally edited final video. No fixed templates — every decision is driven by what the creative needs.

---

## Steps

### 1. Load Skill
Activate `remotion-video-editor` skill. Read `SKILL.md` and `copy-analysis.md` mandatory files.

### 2. Understand the Creative

Collect from user or project:
- `public/video.mp4` — source video
- Copy/brief — text, file, or inferred from narration

If no brief provided, analyze narration structure with silencedetect to map the content semantically.

Ask user ONE question if brief is missing:
> "Qual é o objetivo principal deste criativo e qual a ação que o espectador deve tomar?"

### 3. Semantic Analysis

- Map narration phrases to timestamps
- Identify emotional register (urgency / proof / educational / transformation)
- Find: hook moment, price reveal, CTA phrase, urgency signals
- Identify sections that have silence/dead air (candidates for cut)
- Decide what the video needs: captions? headlines? cuts? SFX? CTA overlay?

### 4. Present Editing Plan

Show the user a concise plan before executing:

```
PLANO DE EDIÇÃO
───────────────
Fonte: public/video.mp4 ([duration]s)
Tom detectado: [urgência / educacional / prova social / etc]

Edições planejadas:
✅ Legendas automáticas — [N] frases mapeadas
✅ Headlines dinâmicas — [list key moments]
✅ Cortes — [list dead air sections removed]
✅ CTA overlay — "[exact phrase]" nos últimos Xs
✅ Efeitos visuais — [specific effects for this creative]
✅ Efeitos sonoros — [specific sfx for this creative]

Duração final estimada: Xs
Output: out/final_[name].mp4

Confirma? (s/n)
```

### 5. Build

After confirmation:

1. **Audio mapping** — run silencedetect, build phrase timestamp map
2. **Write components** — one per logical section, semantic naming
3. **Captions** — if decided, build from phrase map
4. **Headlines** — only at moments that need amplification
5. **Effects** — visual and audio per decisions in plan
6. **CTA** — use exact phrase from brief, with silent hold at end
7. **Update Root.jsx** — add new composition

### 6. Render

```bash
npx remotion render src/index.jsx [CompositionId] out/[name].mp4
```

### 7. Concat if Needed

```bash
COMP="node_modules/@remotion/compositor-darwin-arm64"
DYLD_LIBRARY_PATH="$COMP" "$COMP/ffmpeg" -y \
  -t [MAIN_S] -i out/main.mp4 \
  -i out/cta.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" \
  -c:v h264_videotoolbox -b:v 4M -c:a aac \
  out/final_[name].mp4
```

### 8. Deliver

```
✅ Edição concluída
📁 out/final_[name].mp4 ([size], [duration])

O que foi feito:
- [list of what was actually added]
- [any decisions made and why]
```

---

## Usage Examples

```
/remotion
/remotion public/criativo_oferta.mp4
/remotion brief.txt
/remotion — criativo do produto X, CTA é "clique em saiba mais"
```
