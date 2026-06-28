# Onym Capital — brand guide

The restrained, editorial sibling. *Spark Capital × ADQ.* Expensive through **calm**, not energy.
Token entry: **`onym.css`** (imports the shared foundation, overrides to monochrome).

> Shares the entire foundation with Frontier — fonts, type scale, spacing, radii, ink, the
> dot-matrix component. Onym only removes colour and swaps to a dark elevation system.

## Voice
Patient, disciplined, long-horizon. "Patient capital for the new economy." Same honesty rules
as Frontier (funds never builds; no fabricated figures; honest CTAs). Quieter still — restraint
is the edge.

## Colour — pure monochrome
**No accent. No iridescent. No glow.** Warm charcoal `#38353b` / `#221f25`, warm greys, and
hairlines. Colour belongs to Frontier — never Onym. Every accent token (`--accent*`, `--blue*`,
`--iridescent*`) is overridden to charcoal in `onym.css`.

## Wordmark — use the real asset
Onym's wordmark is **supplied**, not typed: `assets/onym-capital-lockup.png` / `.svg`
(full "onym capital" + orb) and `assets/onym-lockup.png` / `.svg` (short "onym" + orb). Its
lowercase **"y"** is specific — **do not** retype it in Space Grotesk or any system font. On
ink, knock out to white (`filter:invert(1) brightness(2)`). Orb mark alone: **black**
(`assets/orb-ink-official.png`) on light surfaces, **white** (`assets/orb-mask-official.png`)
on dark — never colour. See `preview/brand-orb-usage.html`.

## Type
Same families as Frontier. Display Satoshi Bold, body Satoshi Regular, mono JetBrains Mono.
Wordmark comes from the supplied asset (above), not live text.

## Lockup spacing (locked standard)
Onym's wordmark is a **supplied lockup asset** that already bakes in the correct orb-to-text
gap — use it whole (`assets/onym-capital-lockup.*`), don't recompose orb + text. If you ever
place the orb mark beside separate text, follow the family standard: orb height = text
cap-height (≈ 0.9em), **gap = 0.2 × orb size**.

## Surfaces (dark elevation — the signature)
macOS-style layered greyish-blacks, warm-tinted so they read as Onym not neutral Apple grey.
Surfaces get **lighter** as they nest toward the viewer:
`--d-surface-0` app → `--d-surface-1` window/sidebar → `--d-surface-2` card →
`--d-surface-3` card-in-card → `--d-surface-4` popover. `--d-hover` and `--d-selected` shift
the shade on interaction. Text `--d-ink` / `--d-ink-2` / `--d-ink-3`; dividers `--d-hairline`.
See `preview/onym-surfaces.html`.

## Motion
Quiet fades only. **No glow, no ambient drift.** Restraint over spectacle.

## UI kit
`ui_kits/onym/` — the monochrome sibling site (nav, hero with mono dot-matrix card, thesis,
what we back, approach, CTA, footer). Same architecture as Frontier, zero colour.
