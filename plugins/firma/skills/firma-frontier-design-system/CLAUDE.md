# CLAUDE.md — Firma Capital design system

This project is a **two-brand design system on one shared foundation**. Read this first,
then the brand guide for whichever brand you're designing.

## The two brands

| | **Firma Frontier** | **Onym Capital** |
|---|---|---|
| Token entry CSS | `colors_and_type.css` (alias `frontier.css`) | `onym.css` |
| Brand guide | `brands/frontier.md` | `brands/onym.md` |
| UI kit | `ui_kits/firma-frontier/` | `ui_kits/onym/` |
| Personality | Expressive, world-stage | Restrained, editorial |
| Accent | Acid yellow `#f7ff05` (FILL only) + warm/acid iridescent | Pure monochrome charcoal; **no accent** |
| Surfaces | Light elevation (`--l-surface-*`) | Dark elevation (`--d-surface-*`) |
| Orb | Acid / yellow / ink (`assets/orb-acid-smooth.png` …) | Charcoal orb + real `onym capital` wordmark |
| Voice | "Capital for a new earth." | "Patient capital for the new economy." |

## How the layering works

- **`colors_and_type.css`** holds the shared foundation (fonts, type scale, spacing,
  radii, warm-charcoal ink, neutrals, shadows) **plus** the Frontier brand layer
  (yellow accent, warm/acid iridescent, light surfaces, chips). It is the default.
- **`onym.css`** `@import`s `colors_and_type.css` then overrides every colour token to
  monochrome and swaps the light elevation for a **dark** elevation scale (`--d-surface-*`).
- To build for a brand, link its entry CSS. Everything not overridden is shared.

## Hard rules (both brands)

- **Funds, never builds** — verbs are *fund / capitalize / back*. No fabricated numbers,
  track record, or bios; forward-looking framing where content is missing.
- CTAs stay honest ("Get in touch", "Subscribe"). No false urgency.
- **Wordmarks are lowercase, ligatures OFF.** Frontier's `firma frontier` is Space Grotesk
  700. Onym uses its **own supplied wordmark asset** (`assets/onym-capital-lockup.*`) — do
  not retype it in a system font (the "y" differs).
- **Lockup spacing (standard).** Orb height = the wordmark's cap-height (≈ **0.9em** of the
  wordmark font-size). Gap between orb and wordmark = **0.2× the orb size** (≈ 0.2em).
  Build the lockup in a flex row with `font-size` set to the wordmark size, the orb sized
  in `em` (`width:0.9em`) and `gap:0.2em`, so it scales as one unit. (Official artwork
  measures 0.27×; we tighten to 0.2 for optical balance at live text sizes.)
- **Orb finish — match the surface (`preview/brand-orb-usage.html`).** Pick by background, not
  taste. **Frontier:** *ink* orb (`orb-ink-official.png`) is the default on light surfaces (nav,
  body, UI); *yellow* orb (`orb-yellow-official.png`) is the default on dark/ink (it vanishes on
  white — same reason yellow is fill-only); *white* orb (`orb-mask-official.png`) is the quiet
  mark on dark — used in the footer or whenever yellow is too loud. The *acid* orb
  (`orb-acid-smooth.png`) is the **frontier·alt / expressive** treatment — reserve it for hero and
  brand moments, not default chrome. **Onym:** *black* orb on light, *white* orb on dark — never
  colour.
- No emoji. The middot `·` is the separator. Warm charcoal `#38353b`, never pure black.
- Reuse real assets in `assets/` — copy them out, don't redraw. Use `assets/dotmatrix.js`
  (`buildDotMatrixCard`, props `theme` + `accent`) for any data card.

## Where things live

- `brands/` — per-brand guides (voice, colour, type, surfaces, do/don't).
- `assets/` — shared + brand marks (orbs, lockups, mesh, dot-matrix component).
- `preview/` — Design-System specimen cards (Frontier cards link `colors_and_type.css`,
  Onym cards link `onym.css`).
- `fonts/` — self-hosted Satoshi, Space Grotesk, JetBrains Mono (no CDN font dependency).
- `ui_kits/<brand>/` — high-fidelity site recreations.
