---
name: firma-design
description: Use this skill to generate well-branded interfaces and assets for the Firma family of investment funds — Firma Frontier (expressive, acid-yellow + iridescent) and Onym Capital (restrained, pure monochrome) — for production or throwaway prototypes/mocks. Contains design guidelines, colors, type, fonts, the orb mark, the dot-matrix data card, and UI-kit components for both siblings.
user-invocable: true
---

# Firma Capital — design skill

Read `README.md` first — it covers the company context, the **two-sibling / one-foundation**
architecture, content/voice rules, and the full visual foundations. Then explore the files.

## The two brands

- **Firma Frontier** — token entry `colors_and_type.css`. Expressive, world-stage. Accent is
  **acid yellow `#f7ff05`** (a FILL only — ink text on top; never yellow text/lines on white),
  plus the soft **iridescent** atmosphere and the gradient **orb**. UI kit: `ui_kits/firma-frontier/`.
- **Onym Capital** — token entry `onym.css` (imports the foundation, overrides to monochrome).
  Restrained, editorial. **Pure charcoal + warm grays, no accent, no glow.** Solid charcoal orb.
  UI kit: `ui_kits/onym/`.

Pick the right entry stylesheet for the brand you are designing. Everything else (fonts, type
scale, spacing, radii, shadows, ink, the orb, the dot-matrix card) is shared.

## Working rules

- Funds, never builds — verbs are *fund / capitalize / back*. No fabricated numbers, track
  record, or bios; use forward-looking framing. CTAs stay honest ("Get in touch," "Subscribe").
- Wordmarks are lowercase Space Grotesk 700, ligatures OFF, **default straight `y`** (no stylistic
  alternate). Logo use only.
- Reuse the real assets in `assets/` (orbs, dot-matrix component, imagery) — copy them out, don't
  redraw. Use `assets/dotmatrix.js` (`buildDotMatrixCard`) for any data card; it takes `theme`
  (`light`/`ink`) and `accent` (`blue`→accent fill / `iridescent` / `none`) props.

## Output

If you're making visual artifacts (slides, mocks, throwaway prototypes), copy assets out and
produce static HTML files for the user to view. If you're working on production code, copy the
assets and read the rules here to design fluently in the brand.

If invoked with no other guidance, ask which sibling and what they want to build, ask a few
focused questions, then act as an expert designer who outputs HTML artifacts or production code.
