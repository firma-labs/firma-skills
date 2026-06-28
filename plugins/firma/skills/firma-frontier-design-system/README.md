# Firma Capital — Design System

A brand & web design system for **Firma Capital**, the investment family behind two
sibling funds — **Firma Frontier** (expressive, world-stage) and **Onym Capital**
(restrained, editorial) — sharing one foundation. The bar is *a16z's cultural authority
+ MGX's world-stage gravitas*: a global institution announcing itself — calm, confident,
expensive, unforgettable.

> **Firma funds, it never builds.** Every fund verb is *fund / capitalize / back*.
> No fabricated numbers, track records, or bios — forward-looking framing where content is missing.

---

## Company & product context

Firma Frontier is one fund within a larger family of "firma" entities. It deploys
**conviction capital for the frontier**: backing founders building the systems a
civilization runs on — energy, intelligence, sovereignty. The thesis is that
*returns are the result of stewardship, not its enemy.*

**What they back:** AI & advanced compute · Deeptech · Network states · Charter cities ·
Digital twins · Edge of society.

**Approach pillars:** Conviction · Scale · Stewardship.

**The family** (footer lockup): Onym Capital · **Firma Frontier** · Firma Terra · firma labs.

The flagship surface is a single immersive marketing website (the `firma-frontier`
Figma page). This system captures its foundations and rebuilds its signature
components — the iridescent **orb** mark, the **dot-matrix data card**, the lowercase
**wordmark**, and the soft iridescent atmosphere.

---

## Two siblings, one foundation

This project holds **two brands that share one foundation** — do not duplicate the
system to add more. The shared core lives at the root; each sibling is a thin *skin*
that overrides only what differs.

| | **Firma Frontier** | **Onym Capital** |
|---|---|---|
| Brand guide | `brands/frontier.md` | `brands/onym.md` |
| Token entry | `colors_and_type.css` / `frontier.css` | `onym.css` |
| Personality | Expressive, world-stage | Restrained, editorial |
| Reference | a16z × MGX | Spark Capital × ADQ |
| Accent | **Acid yellow `#f7ff05`** (fill-only) + warm/acid iridescent | **Pure monochrome** — charcoal + warm grays, no accent |
| Surfaces | Light elevation (`--l-surface-*`), yellow selection | Dark elevation (`--d-surface-*`), warm-grey selection |
| Orb | Acid / yellow / ink finishes | Charcoal orb + supplied wordmark |
| Motion | Staggered reveal + slow ambient drift | Quiet fades, **no glow, no drift** |
| Voice | "Capital for a new earth." | "Patient capital for the new economy." |
| UI kit | `ui_kits/firma-frontier/` | `ui_kits/onym/` |

**Everything else is shared:** the typefaces (Satoshi / Space Grotesk / JetBrains Mono),
the type scale, spacing, radii, shadows, the warm-charcoal ink, the orb mark, and the
dot-matrix data-card component (`assets/dotmatrix.js`, which supports `theme` and
`accent` props so both siblings drive it).

> **How the skin works.** `onym.css` imports `colors_and_type.css`, then redefines the
> colour tokens (`--accent*`, `--blue*`, `--iridescent*`, `--glow-irid`, pill fills) to
> monochrome. Point any page or kit at `onym.css` instead of `colors_and_type.css` and it
> inherits the whole foundation while rendering pure charcoal. To add a *third* sibling
> (e.g. Firma Terra), copy this pattern: a new `<name>.css` that imports the foundation
> and overrides only its accent / orb / atmosphere.

> **The wordmark "y".** Both wordmarks render the **default** Space Grotesk lowercase `y`
> (straight descender) — ligatures and stylistic alternates are off
> (`font-feature-settings:"liga" 0`). Do not enable a stylistic-set `y` (the curly-tail
> alternate); the straight `y` is the correct mark.

### Sources used to build this system

- **Figma file** — *Firma Labs — Brand Guide*, fileKey `oorII4hi6KsCBi6oxW3AXU`.
  The flagship page `firma-frontier` (node `7487:6228`) is the literal source of truth.
  Key nodes referenced: hero `7487:6227`, mono-orb hero `7479:601` / `7481:627`,
  concept board `7482:400`, dot-matrix card (`cardff`).
- **Uploaded assets** — orb (gradient + mono), full lockups, the dot-matrix card,
  the neuraesthetic gradient bust, the iridescent wave, and the category-chip cluster.
- **GitHub** — `firma-labs/firma-vault` (`assets/site/firma-capital/` subtree),
  attached as reference. ⚠️ This repo was **not reachable** from this session
  (404 / not in the connection's repo list). The system was built from the Figma
  + uploads instead. If you have access, explore
  <https://github.com/firma-labs/firma-vault/tree/main/assets/site/firma-capital>
  to pull production site assets and improve fidelity.

---

## CONTENT FUNDAMENTALS

**Voice — quiet authority.** Firma Frontier speaks like an institution that has
already arrived. Short, declarative, certain. No hype, no urgency, no exclamation.
The confidence comes from brevity and conviction, not adjectives.

- **Casing.** The wordmark `firma frontier` is **always lowercase** — it is signature.
  Display headlines are **sentence case** ("Capital for a new earth.", "Conviction at
  sovereign scale."). Mono labels and kickers are **UPPERCASE** with wide tracking
  ("FIRMA FRONTIER · CONVICTION CAPITAL FOR THE FRONTIER"). Body and category labels
  are mostly lowercase or sentence case ("network states", "edge of society").
- **Person.** First-person plural collective — **"we"** ("We fund it.", "We bring it.",
  "We back the founders…"). The reader is addressed implicitly as a builder, rarely "you".
- **Sentence shape.** Manifesto cadence: declare, then qualify, then turn.
  *"The frontier doesn't need more extraction. It needs conviction. We bring it."*
  The manifesto display lead is prefixed with a mono prompt glyph — `> A new earth is
  being built. We fund it.` — a quiet nod to the terminal/builder world.
- **Honesty rules.** CTAs are honest ("Get in touch", "Subscribe") — never "Schedule"
  or false urgency. Any data is **illustrative** and labelled as such. No fabricated
  performance figures, no invented bios — forward-looking placeholders instead.
  Sovereign partners stay unnamed. Phase-1 copy is secular.
- **No emoji.** Ever. The only "icons" are the orb mark and a small set of thin-line
  glyphs. Punctuation is restrained; the **middot ·** is the signature separator
  (kickers, footer family lockup).

**Vibe:** a sovereign wealth fund that reads poetry. Expensive whitespace, a few
true sentences, one luminous image.

---

## VISUAL FOUNDATIONS

**Canvas & air.** Pure white `#ffffff` is the default ground; warm off-white
`#faf9f6` (`--paper`) for cards and recessed wells. The design is *mostly air* —
generous margins, large empty regions, one focal object per view. Never crowd.
Respect the whitespace as a material.

**Ink.** Warm charcoal `#38353b` (`--ink`) for all primary text — **never pure black**.
Secondary `#706d73`, tertiary `#a7a3a9`. Hairlines are warm grey `#e7e3e6` / `#f4efec`.

**Colour strategy — two registers, never competing:**
1. **Iridescent gradient = soul.** A **warm/acid** melt: pink `#ffa6c2` → peach `#ffb9a3`
   → warm-rose `#ffc28f` → acid yellow `#f7ff05`. **No blue, no purple** — the cool end
   was dropped so the gradient harmonizes with the yellow accent instead of fighting it
   (blue + acid-yellow is a complementary clash). Used *atmospherically and sparingly* —
   the orb fill, soft mesh glows behind the hero / data card / section anchors.
   Soft, premium, slowly drifting. Never a flat full-bleed gradient panel.
2. **Acid yellow `#f7ff05` = precision + pop.** Sharp and functional: button fills,
   the dot-matrix highlight, the small numeral marks, focus accents. Yellow is a
   **FILL** colour only — always set ink text/icons on top of it; never use yellow as
   text or a thin line on white (it disappears). Links use ink text with a yellow
   underline; focus rings are ink. Tokens: `--accent` / `--accent-press` / `--accent-ink`
   / `--accent-line` (the `--blue*` names remain as aliases so older fills keep working).

**Typography.**
- **Wordmark:** Space Grotesk **700**, lowercase, letter-spacing **−0.047em**,
  **ligatures OFF** (`font-feature-settings:"liga" 0`) so "fi" never ligates. Logo use only.
- **Display:** Satoshi **Bold**, large (desktop clamp toward ~96–100px), line-height ~1.1,
  letter-spacing −0.03em.
- **Body:** Satoshi **Regular**, ~20px, line-height 1.45, letter-spacing −0.02em.
- **Mono (labels/kickers/data):** JetBrains Mono, UPPERCASE, tracked ~0.18–0.22em.

**Imagery.** Warm, luminous, slightly grainy 3D-render gradients — peach/pink/violet/blue
"neuraesthetic" forms (an iridescent human bust, soft dune-like waves). Always soft-focus
and atmospheric, never literal or photographic. Imagery sits inside rounded cards or
floats over a soft same-palette glow.

**Backgrounds.** Predominantly flat white. Atmosphere is added by *placing* a blurred
iridescent mesh behind a focal element (hero card, section anchor) — not by tinting the
whole page. A slow, subtle gradient drift animates these glows.

**Cards.** White or `--paper`, radius **20–24px**, **very soft** shadow
(`0 4px 8px rgba(244,239,236,.5)` quiet, up to `0 8px 28px rgba(173,166,160,.18)` floating).
1–2px hairline border in `--paper-line`. The hero data card additionally floats over a
pink iridescent glow (`0 14px 60px rgba(233,95,251,.22)`).

**Pills / chips.** Fully rounded (`999px`), `--paper` fill, hairline border, soft pill
shadow with a subtle inner top highlight (`inset 0 4px 2px rgba(255,255,255,.5)`).
Category chips can take soft tinted fills — peach `#fde5cd` / violet `#c9c0ed` — with a
matching darker ink. The selected/accent chip is the violet one.

**Borders & radii.** Hairlines are 1–2px, warm grey. Radii ladder: 10 → 16 → 20 → 24 →
40 (frame) → 999 (pill).

**Motion.** Calm and premium. One orchestrated staggered reveal on hero load
(wordmark → headline → subline → card). Restrained scroll reveals (fade + 16–24px
translate-up). Slow ambient gradient drift behind hero/section glows (8–20s loops).
Easing is a soft ease-out `cubic-bezier(.22,.61,.36,1)`. No bounce, no spring, nothing
fast. Always honour `prefers-reduced-motion`.

**Hover / press.** Buttons → deeper yellow (`--accent-press`) + a hair of lift, press →
settle (no shrink-bounce). Links → ink text, yellow underline deepens on hover. Cards →
slightly deeper soft shadow + 2–4px rise. Quiet, never theatrical.

**Transparency & blur.** Fixed nav is white with a backdrop blur. Iridescent glows are
large, heavily blurred, low-opacity layers placed *behind* content. Card surfaces are
opaque.

---

## ICONOGRAPHY

Firma Frontier is **icon-light by design**. The brand leans on type, the orb, and
whitespace rather than an icon set. Where glyphs appear they are **thin-line (≈1.5–2px
stroke), rounded-join, monochrome charcoal** — matching the wordmark's restraint.

- **The orb is the only true brand mark.** A segmented globe/seed: a circle with one
  vertical meridian and one horizontal equator, a vesica/seed lens at centre. Frontier
  finishes: **acid** (`assets/orb-acid-smooth.png`, hero/nav), **yellow**
  (`assets/orb-yellow-official.png`, on dark), **ink/black** (`assets/orb-ink-official.png`),
  **mesh** (`assets/orb-acid-meshfill.png`). Onym uses the **charcoal** orb
  (`assets/orb-mono.png`) with its supplied wordmark. Never recolour outside these.
- **Utility glyphs.** A handful of thin-line marks appear in the Figma (a globe, an
  asterisk/sparkle, a network/share node). These match the **Lucide / Feather** family
  (1.5–2px stroke, round caps). This system links **Lucide** from CDN as the substitute
  set — flagged, since the originals are bespoke vectors in the Figma rather than a named
  icon font. Use `stroke: var(--ink)` and keep them sparse.
- **No emoji. No unicode-glyph icons.** The middot `·` is used as a separator, not an icon.

**Assets in `assets/`:**

| File | What it is |
|---|---|
| `orb-gradient.png` | Iridescent orb brand mark (transparent, 219²) |
| `orb-mono.png` | Charcoal orb mark |
| `orb-shape.svg` | Orb silhouette vector (scalable, mono) |
| `lockup-gradient.png` | Orb + lowercase `firma frontier` (gradient orb) |
| `lockup-mono.png` | Charcoal full lockup |
| `iridescent-mesh.png` | Wide iridescent wave — the ambient "soul" glow source |
| `gradient-wave-tall.png` | Tall iridescent wave (mobile / vertical glow) |
| `neuraesthetic-bust.png` | Iridescent human-bust render (manifesto imagery) |
| `hero-data-card.png` | Reference render of the dot-matrix revenue card |
| `dot-matrix-card-ref.png` | Dot-matrix card on a pink glow (reference) |
| `chips-ref.png` | Category-chip cluster (reference) |
| `dark-card-ref.png` | Dark "Pioneers funding a new earth" card (reference) |

---

## Fonts

Type families and how they load (all wired through `colors_and_type.css`):

- **Satoshi** (display + body) — **self-hosted** in `fonts/` (`Satoshi-Light/Regular/Medium/Bold/Black` + italics, `.otf`). Weights 300/400/500/700/900.
- **Space Grotesk** (wordmark) — **self-hosted** variable file `fonts/SpaceGrotesk-VariableFont_wght.ttf` (axis 300–700).
- **JetBrains Mono** (labels / kickers / data / code — `--font-mono` and `--font-code`) — **self-hosted** variable files `fonts/JetBrainsMono-VariableFont_wght.ttf` (+ italic). This is now the brand mono across the system.

> ⚠️ **Mono note:** the brand mono is **JetBrains Mono** (self-hosted, variable). The original
> spec called for IBM Plex Mono and the Figma uses DM Mono in places — this system standardises
> on JetBrains Mono per the latest direction. All families are self-hosted, so the system has
> **no CDN font dependency** and works fully offline.

---

## Index — what's in this system

| Path | Purpose |
|---|---|
| `README.md` | This file — context, content + visual foundations, iconography |
| `CLAUDE.md` | Project instructions (two-brand model) — read first |
| `brands/frontier.md` | **Firma Frontier** brand guide (voice, colour, type, surfaces) |
| `brands/onym.md` | **Onym Capital** brand guide (monochrome, dark surfaces) |
| `colors_and_type.css` / `frontier.css` | Frontier tokens = shared foundation + Frontier layer |
| `onym.css` | Onym tokens = foundation + monochrome overrides + dark elevation |
| `SKILL.md` | Agent-Skill manifest (covers both brands) |
| `assets/` | Brand marks, lockups, iridescent imagery, dot-matrix component |
| `preview/` | Design-system specimen cards (shown in the Design System tab) |
| `fonts/` | Self-hosted Satoshi / Space Grotesk / JetBrains Mono |
| `ui_kits/firma-frontier/` | Frontier flagship website recreation |
| `ui_kits/onym/` | Onym monochrome sibling website recreation |

Start with `CLAUDE.md` for the two-brand model, then the relevant `brands/*.md` guide.
For the assembled sites see `ui_kits/<brand>/index.html`; for foundations at a glance,
the `preview/` cards.
