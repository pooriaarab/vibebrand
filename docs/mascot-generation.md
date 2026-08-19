# Mascot generation

**TL;DR.** Text-to-image drifts — the same prompt will not give you the same character twice. Lock one approved frame, paste a hard constraint block, and edit every pose from that frame with high input fidelity. Raster AI stills are concept references; a layered vector master is what actually ships.

Anyone should be able to generate their own brand mascot on-model in any pose, angle, or expression. Copy the constraint block, fill the slots, run the command.

Run a pair, not a single asset: a clean scalable **mark** for product UI / favicon, plus a rich full-body **mascot** for personality, marketing, and emotion. That is the Duo / Octocat / Snoo model. The mark does recognition at 16px. The mascot does character.

---

## 1. The core problem

Text-to-image alone drifts. The same prompt, run twice, produces two different characters — different proportions, different eye spacing, different body mass, sometimes a new color sneaking in. Run it six times and you may get three identities, one of them wearing clothes you never asked for.

That is unusable for a mascot system. You cannot build a set of poses that feel like one character if each pose is a fresh roll of the dice.

**Never generate mascot poses from a blank prompt.** Prompt-only generation is for brand-new base concepts only — and even then, you lock one winner and never go prompt-only again.

---

## 2. The fix — reference-image workflow

Pick **one** approved reference frame. Edit every other pose from that frame with input fidelity set high. When you need a whole set (front, 3/4, side, wave, celebrate, sleep), regenerate every frame from that **same** reference so they share identity.

The approved reference is the source of truth. The constraint block (§3) is the written lock. The model still needs the picture.

This gets you close. It is still not 100%. True consistency needs a hand-built **vector master**. Treat AI frames as a pitch deck for the character, then redraw.

| Do | Don't |
|---|---|
| Lock one on-model reference, then edit | Prompt six poses independently and hope they match |
| Pin hex colors and ban inventions in the prompt | Say "a cute `<animal>`" and let the model invent clothes or extra colors |
| Treat AI output as a preview | Ship AI poses as the production mascot |
| Rebuild the winner as a vector master | Try to "prompt harder" toward 100% consistency |
| Regenerate the whole set from the same `$URL` | Mix references mid-batch |

### Workflow

1. Invent a base concept with text-to-image (once).
2. Approve one master still. Save it as `approved-frame.png`.
3. Upload it and keep the CDN URL.
4. Edit every new pose from that URL with `input_fidelity=high`.
5. When the set is locked, redraw a layered vector master and derive the logo, face-icon, and animation from that file.

---

## 3. The constraint block (paste into every prompt)

Prepend this to every generation. Do not paraphrase it. Do not shorten it. Fill the placeholders once for your brand, then paste the filled block as-is.

```
Match this exact <animal/character> character with 100% consistency: same <body color> body, same proportions, same thick clean <outline color> outline, flat cartoon style. STRICT palette: <body description>, <PRIMARY #hex> <where primary lives>, <accent #hex> <where accent lives>, <outline color> outline. NO clothing, NO off-palette colors (<banned colors>). All shapes rounded, no pointy edges.
```

| Placeholder | What to fill | Example shape (not a brand) |
|---|---|---|
| `<animal/character>` | The species or character type | `fox`, `owl`, `blob` |
| `<body color>` / `<body description>` | Dominant fill | `white fur`, `soft cream body` |
| `<PRIMARY #hex>` | Brand primary, exact hex | `#3b5bdb` |
| `<where primary lives>` | The 1–2 features that carry primary | `inner ears and nose` |
| `<accent #hex>` | Warm or secondary accent, exact hex | `#ffd6e8` |
| `<where accent lives>` | Usually one feature | `blush cheeks only` |
| `<outline color>` | Contour | `black` |
| `<banned colors>` | The colors the model keeps inventing | `brown/tan/beige` |

If you skip this block, the model will invent clothing, off-palette fills, or a different character. If you rewrite it each time, you will get silent drift. Paste it filled, then add the slots from the template.

The palette is closed. Allowed colors are only what you list. No clothing. No extra colors on props unless a prompt explicitly calls for a single on-palette accent. If the model invents a scarf, a shirt, or a third fill, the frame is wrong — throw it out and regenerate from the approved reference.

---

## 4. The prompt template (slots)

Build every prompt in this order:

```
<constraint> + <angle> + <pose> + <expression> + <props> + <shadow> + <background>
```

| Slot | What to put | Notes |
|---|---|---|
| **Constraint** | The filled block from §3 | Always first. Never optional. |
| **Angle** | `front view` / `three-quarter view` / `side profile facing left` / `back view` | One camera. Do not mix "front and side." |
| **Pose** | `standing` / `waving with one arm up` / `jumping` / `sitting` / `pointing to the right` | Body only. Keep it one action. |
| **Expression** | `friendly smile` / `thinking` / `sleepy closed eyes` / `confused` / `thumbs-up grin` | Face only. Do not restate the whole character. |
| **Props** *(optional)* | `small <PRIMARY> thought bubble` / `<PRIMARY> send arrow` / `zzz marks` | Stay on-palette. No brown objects, no clothes. |
| **Shadow** | `<PRIMARY #hex> pill-shaped shadow under the character` | Always. Never "soft oval shadow." |
| **Background** | `Plain white background, centered.` | Always last. No scenes, no floors, no gradients. |

Example assembled prompt (front icon):

```
Match this exact <animal/character> character with 100% consistency: same <body color> body, same proportions, same thick clean <outline color> outline, flat cartoon style. STRICT palette: <body description>, <PRIMARY #hex> <where primary lives>, <accent #hex> <where accent lives>, <outline color> outline. NO clothing, NO off-palette colors (<banned colors>). All shapes rounded, no pointy edges. Front view, standing, friendly smile, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.
```

Keep suffixes short. The constraint block already locked identity; the suffix only steers camera, body, face, and any accent. Do not stack three actions in one suffix.

### Starter pose library

Copy the **Prompt suffix** after the constraint block. Do not regenerate these from a blank canvas — edit the approved reference.

| Asset name | Angle | Pose / Expression | Prompt suffix (after the constraint block) |
|---|---|---|---|
| Front icon | Front | Standing, friendly smile | `Front view, standing, friendly smile, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.` |
| 3/4 view | Three-quarter | Standing, friendly smile | `Three-quarter view, standing, friendly smile, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.` |
| Side profile | Side | Standing, neutral-friendly | `Side profile facing left, standing, calm friendly expression, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.` |
| Back view | Back | Standing | `Back view, standing, <primary features> visible, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.` |
| Waving | Front / 3/4 | One arm up, happy | `Three-quarter view, waving with one arm raised, happy open smile, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.` |
| Celebrating | Front | Jump, no clothes | `Front view, jumping in celebration, both arms up, big grin, no clothing, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.` |
| Thinking | Front | Hand to chin, thought bubble | `Front view, thinking pose with one <hand> to chin, small <PRIMARY> thought bubble, curious expression, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.` |
| Sleeping | Front / 3/4 | Eyes closed, zzz | `Three-quarter view, sleeping sitting or curled, eyes closed, soft smile, <PRIMARY> zzz marks, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.` |
| Pointing / presenting | 3/4 | Arm out, presenting | `Three-quarter view, pointing to the right with one arm extended, presenting smile, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.` |
| Confused / 404 | Front | Lost, tilted head | `Front view, confused, head slightly tilted, puzzled eyes, small <PRIMARY> question mark, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.` |
| Error / oops | Front | Wince, raised hands | `Front view, oops pose, sheepish wince, <hands> raised, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.` |
| Success thumbs-up | Front | Thumbs-up, grin | `Front view, one <hand> thumbs-up, proud grin, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered.` |

Need a pose that is not in the table? Keep the constraint block, pick one angle, one pose, one expression, optional on-palette accent, then the pill shadow and white background.

---

## 5. Shape language

Adapted from Duolingo's public illustration guidelines ([design.duolingo.com/illustration/shape-language](https://design.duolingo.com/illustration/shape-language)).

**Construction.** Build from three primitives only: rounded rectangle, circle, rounded triangle. Every edge is rounded. Pointy is off-brand.

**Rhythm.** Vary shape sizes like musical notes. Same-weight shapes feel dull.

**Simplicity.** Use the fewest shapes that still tell the story. About 15 is good. Six is too abstract. Thirty is too busy.

**Perspective.** Stay flat. Suggest depth only on the same line of sight — no three-quarter "into the page" drawing.

**Shadow.** A **pill** under the character, never an oval. Ovals imply perspective. The shadow should be darker than the surface it sits on, and it should be on-palette (`<PRIMARY #hex>`), never a grey blob or a photographic drop-shadow.

**Color.** Few colors per illustration. Never gray (it reads lifeless). Stay vibrant. Prefer the closed palette from §3 over white-on-white fills that wash out.

**Floating accents.** Sparkles, a send-arrow, zzz — useful for posing flexibility, but only if they serve the pose. Decoration for its own sake fights the simplicity rule. Accents stay on-palette.

If a generated frame breaks construction (pointy ears, sharp elbows, angular feet) or invents a new color, throw it out.

---

## 6. Vector logo from the mascot

The mascot is the character. The logo is the mark that has to work at 16px. Generate a **native SVG** mark that matches the mascot's face — same proportions, same closed palette, same outline weight — then clean it.

Do not trace a raster still into SVG and call it done. Generate a real vector (Recraft text-to-vector is the usual path), then:

1. **Strip baked backgrounds.** Recraft often embeds a white rect or a metadata blob. Delete anything that is not the mark.
2. **Strip metadata / editor junk.** Remove `data-*` attributes, unused defs, and foreign namespaces you do not need.
3. **Normalize colors to exact brand hexes.** Models land *near* `#3b5bdb` and ship `#3a5cdb` or a fill that is not in the token file. Search-and-replace every fill/stroke onto the locked tokens (`<PRIMARY #hex>`, `<accent #hex>`, outline, body). If the mark introduces a second unofficial red/pink/blue, that is a palette split — migrate it onto the token or formally add the new hex. Do not leave both.
4. **Crop to the mark.** Tight viewBox, no leftover canvas. The face-icon crop of the front mascot is usually the right starting silhouette.

The mark and the mascot must read as the same character. If the logo face does not match the approved mascot face, regenerate the vector from a prompt that describes *that* face — do not invent a third identity.

---

## 7. Tooling

Use **WaveSpeed CLI**. Two jobs, two models:

| Job | Model | Notes |
|---|---|---|
| Pose variants | `openai/gpt-image-1.5/edit` | Image-to-image from the approved frame. `input_fidelity=high`. ~$0.10 |
| Base concept only | `openai/gpt-image-1.5/text-to-image` | Once. After one frame is approved, stop using this for the character. ~$0.04 |
| Native SVG logo | Recraft text-to-vector (e.g. `recraft-ai/recraft-v3` / `recraft/text-to-vector`) | Match the mascot face. Then strip + normalize (§6). |

**zsh gotcha:** quote the size or the shell will glob the `*`.

```bash
# wrong — unquoted * expands
-i size=1024*1024

# right
-i 'size=1024*1024'
```

### Upload → reference URL

```bash
wavespeed upload approved-frame.png
# → CDN URL
```

Keep that URL. Pass it as `images[0]` for every edit. Do not re-upload a new "almost the same" frame mid-set.

### Edit a pose from the approved frame

```bash
URL="https://cdn.example.com/approved-frame.png"  # paste the real URL from upload

wavespeed submit openai/gpt-image-1.5/edit \
  -i "images[0]=$URL" \
  -i input_fidelity=high \
  -i 'size=1024*1024' \
  -i prompt="<constraint block> Three-quarter view, waving with one arm raised, happy open smile, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered."
```

Swap only the suffix after the constraint block. Do not drop `images[0]`, `input_fidelity=high`, or the quoted size. Generate a whole set from the **same** `$URL` so the batch matches.

### Text-to-image (base concept only — do not use for pose variants)

```bash
wavespeed submit openai/gpt-image-1.5/text-to-image \
  -i 'size=1024*1024' \
  -i prompt="<constraint block> Front view, standing, friendly smile, <PRIMARY #hex> pill-shaped shadow under the character. Plain white background, centered."
```

Lock the winner, upload it, and switch to edit for every later frame.

### Recraft text-to-vector (logo)

```bash
wavespeed submit recraft-ai/recraft-v3 \
  -i style=vector_illustration \
  -i prompt="Native SVG logo mark of the <animal/character> face. Match the approved mascot: <body description>, <PRIMARY #hex> <where primary lives>, <accent #hex> <where accent lives>, thick <outline color> outline, flat, rounded primitives, no clothing, no background."
```

Then strip backgrounds/metadata and normalize fills to the exact brand hexes (§6).

---

## 8. Placement + animation

Generate (or rig) only what a surface actually needs.

### Marketing site

| Surface | Asset to use |
|---|---|
| Hero | Waving or pointing / presenting |
| Feature sections | Pointing / presenting (aimed at the UI) |
| Pricing | Celebrating (jump, no clothes) |
| Testimonials | Front icon or 3/4, happy smile |
| Blog / OG headers | 3/4 or side profile as a background accent + mascot |
| Footer | Small sitting pose (front or 3/4, compact) |
| 404 page | Confused / 404 |

### In-app

| Surface | Asset to use |
|---|---|
| App icon + favicon | Face crop of the front icon (or the cleaned SVG mark) |
| Onboarding | Wave loop / waving still |
| Empty states | Thinking or sleeping |
| Loading | Loading hop |
| Success toasts | Celebrate jump or success thumbs-up |
| Error states | Error / oops |
| Upgrade / paywall | Pointing / presenting |
| Achievement / streak | Celebrating |

### Lottie / Rive pipeline

Be honest about what the AI frames are. Raster generations are **concept references**, not animation assets. You cannot take a GPT Image still, drop it into Lottie, and get clean limb motion. Pixels do not rig.

For real animation:

1. Take the approved mascot (front + 3/4 stills are enough).
2. Redraw a clean **vector master** with **separate layers/paths**: head features, body, each eye, each arm, each leg, accent, shadow.
3. Rig that master in **Rive**, or in **After Effects** and export with **Bodymovin** to Lottie JSON.
4. Layer separation is what makes ears twitch and arms wave. A flat PNG cannot do that.

Do not animate clothing. There is no clothing. Keep fills on the closed palette.

| Animation | Motion | Where it is used |
|---|---|---|
| Idle twitch + blink | Subtle feature bounce, occasional blink | Empty states |
| Wave loop | One arm cycles a greeting | Onboarding welcome |
| Celebrate jump | Anticipation, jump, land, arms up | Task complete / success toast |
| Sleepy breathing | Slow body scale, closed eyes, zzz | Paused / idle |
| Loading hop | Small repeating hop in place | Loading spinner |
| Point-and-present | Arm extends, holds, retracts | Feature callouts |

Build these six first. They cover the in-app surfaces above. New loops should still start from the same vector master, not from a new AI still.

When a surface needs motion, ship the matching loop. When it needs a still, ship the matching library pose, edited from the same approved reference.
