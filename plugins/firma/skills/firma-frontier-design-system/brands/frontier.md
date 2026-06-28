# Firma Frontier — brand guide

The expressive, world-stage sibling. *a16z's cultural authority + MGX's gravitas.* A global
institution announcing itself — calm, confident, expensive. Token entry: **`colors_and_type.css`**.

> **Funds, never builds.** Verbs are *fund / capitalize / back*. No fabricated numbers or bios.

## Voice
Quiet authority — an institution that has already arrived. Short, declarative, certain.
First-person plural ("We fund it.", "We back the founders…"). The reader is implicitly a
builder. Manifesto cadence: declare, qualify, turn — *"The frontier doesn't need more
extraction. It needs conviction. We bring it."* No hype, no exclamation, no emoji.

- Wordmark `firma frontier` — **always lowercase**, signature.
- Display headlines — sentence case ("Capital for a new earth.").
- Mono kickers — UPPERCASE, wide tracking ("FIRMA FRONTIER · CONVICTION CAPITAL FOR THE FRONTIER").
- Data is **illustrative** and labelled; CTAs honest ("Get in touch").

## Colour — two registers, never competing
1. **Warm/acid iridescent = soul.** pink `#ffa6c2` → peach `#ffb9a3` → warm-rose `#ffc28f`
   → acid yellow `#f7ff05`. **No blue, no purple** (dropped so it harmonizes with the accent).
   Atmospheric only — orb fill, soft blurred glows behind a focal element. Never a flat panel.
2. **Acid yellow `#f7ff05` = precision + pop.** A **FILL** colour only — always ink text on
   top; never yellow text/thin-lines on white (it disappears). Buttons, dot-matrix highlight,
   selected states. Links = ink text + yellow underline. Focus rings = ink.
   Tokens: `--accent` / `--accent-press` / `--accent-ink` / `--accent-line`.

Canvas pure white `#ffffff`; cards warm cream `#FAF9F5`. Ink warm charcoal `#38353b`.

## Type
Wordmark Space Grotesk 700, −0.047em, ligatures OFF. Display Satoshi Bold (~96px, −0.03em).
Body Satoshi Regular ~20px/1.45. Mono JetBrains Mono UPPERCASE, tracked ~0.20em.

## Lockup spacing (locked standard)
Orb + `firma frontier` is **one unit**. Orb height = wordmark **cap-height ≈ 0.9em** of the
wordmark font-size; **gap = 0.2 × orb size (≈ 0.2em)**. Build it as a flex row whose
`font-size` is the wordmark size, with the orb sized in `em` and `gap:0.2em` so the whole
lockup scales together and the spacing never drifts:

```html
<div style="display:flex; align-items:center; gap:0.2em; font-size:clamp(40px,6vw,84px)">
  <img src="assets/orb-acid-smooth.png" style="width:0.9em; height:0.9em">
  <span class="ff-wordmark" style="font-size:1em">firma frontier</span>
</div>
```

(The official artwork measures a 0.27× gap; we tighten to 0.2 for optical balance — a small
orb beside large text makes a literal 0.27 read as floating.)

## Surfaces (light elevation)
`--l-backdrop` (warm grey) → `--l-surface-1` white window → `--l-surface-2` cream panel →
`--l-surface-3` white card (floats with shadow). Hover lifts; **selected = yellow fill**
(`--l-selected`). See `preview/frontier-surfaces.html`.

## Orb
Official segmented globe/seed. Finishes: **acid** (`assets/orb-acid-smooth.png`, hero/nav),
**yellow** (`assets/orb-yellow-official.png`, on dark), **ink/black**
(`assets/orb-ink-official.png`), **mesh** (`assets/orb-acid-meshfill.png`). Never recolour
outside these.

**When to use which (match the surface):** *acid* is the default on light surfaces — its
pink/peach has contrast on white. *Yellow* only on dark/ink (it disappears on white, same as
the fill-only rule). *Ink* for one-colour / print / favicons / dense UI on light. *White*
(`orb-mask-official.png`) for a quiet mark on dark when the yellow is too loud. See
`preview/brand-orb-usage.html`.

## Motion
One staggered hero reveal (wordmark → headline → subline → card). Restrained scroll fades
(+16–24px). Slow ambient glow drift (8–20s). Ease-out `cubic-bezier(.22,.61,.36,1)`. No bounce.
Honour `prefers-reduced-motion`.

## Cards & chips
Cards: white/cream, radius 20–24px, very soft warm shadow, 1px hairline. Hero data card floats
over a warm glow. Chips: fully rounded, **two fills only** — cream `#FAF9F5` (default) and acid
yellow (active, ink text). Peach/pink chips were tried and dropped.

## UI kit
`ui_kits/firma-frontier/` — the flagship site (nav, hero + dot-matrix card, manifesto, what we
back, approach, credibility, people, CTA with corner acid-yellow glow, footer).
