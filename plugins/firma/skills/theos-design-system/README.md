# THEOS Design System

> **THEOS — THE / OS, BUILT AGENT-FIRST, FROM DIVINE INSPIRATION**

THEOS is the operating system for the agent-native era. Where iOS, Android and macOS are app-shells you tap *into*, THEOS dissolves the app. The agent is the surface, the user is the loop, and the OS is a fluid pane of liquid glass that summons what you need and lets it disappear when you're done.

Built and operated by **Firma Labs** — the team behind **Firmamint**, the compute blockchain and OS for network states and edge communities. THEOS is the workstation that brings efficiency to those communities worldwide.

## North star

- **Agent-first, not human-first.** Every design pattern starts with how an agent thinks, plans, and resolves a request — not with menus, tabs, files, and folders.
- **Apps don't exist. Outcomes do.** You don't *open Sheets* — you ask for a spreadsheet on a question and the surface populates like magic. You don't *open Safari* — you call up a site, use it, and it dissolves back into the liquid until you call it again.
- **Liquid, fluid, intuitive.** Notifications surface from the glass with a prepared response. **Send THEO** is the only action you usually need. The interface is a verb, not a noun.
- **It knows you.** THEOS is contextual, ambient, anticipatory. The more it learns, the less interface you see.

## Sources used to build this system

- **Figma:** *visionOS 26 (Community)* — full file mounted as a virtual filesystem (`/Cover`, `/Backgrounds`, `/Materials`, `/Buttons`, `/Notifications`, `/Examples/Home-View`, etc.). 35 pages, 93 frames. Used as the visual *DNA* for liquid-glass materials, app-icon platters, notification platters, gesture targets and tab bars — adapted to THEOS's agentic vocabulary.
- **Codebase: `liquid-glass/`** — Apple SwiftUI Liquid Glass guidance (iOS 26+ `glassEffect`, `GlassEffectContainer`, `.interactive()`, modifier order). Read for material semantics and prominence rules.
- **Codebase: `mockflow-apple-liquid-glass/`** — MockFlow's reference for premium glass surface treatment (corner radii, ambient shadows, hairline borders, glossy pill buttons).
- **Uploads:**
  - `theosframe.png` / `theos2frame.png` — THEOS lockup, dark / light
  - `Frame 2087327168.png` / `df.png` — THEOS wordmark, dark / light
  - `F5B94B39-…PNG` — THEOS mark in rounded square (icon)
  - `firma_logo_white.png` / `firma_logo_black.png` — Firma Labs parent mark
  - `Firma Labs Original Font.svg` — original Firma Labs display lettering (vector)

## Index — what's in this folder

```
README.md                  ← you are here
SKILL.md                   ← portable Claude Skill manifest
colors_and_type.css        ← CSS vars: colors, type ramps, semantic tokens, materials
fonts/                     ← webfonts + @font-face declarations (Inter Tight)
assets/                    ← logos, marks, ambient backgrounds
preview/                   ← per-card HTML specimens (registered to Design System tab)
ui_kits/
  theos/                   ← THEOS workstation UI kit (homescreen, summon, glass)
    index.html             ← interactive demo
    *.jsx                  ← reusable components
```

---

## CONTENT FUNDAMENTALS

THEOS copy reads like a thought, not a feature. It is *quiet*, *certain*, and never sells itself.

**Voice.** First-person from the user *to* the agent. Never the agent talking *at* the user. THEOS doesn't say "Hello! 👋 How can I help?" — THEOS waits, like glass, until you ask.

**Pronouns.** Address the user as *you*. The system is THEOS. The agent is THEO (singular, personal). Never "we" — THEO is one being.

**Casing.** Sentence case for everything mid-flow. UPPERCASE for primary brand moments only (THEOS, the wordmark, the loading screen, section headers like "BUILT AGENT-FIRST"). Never title case — it reads as marketing.

**Punctuation.** Spare. No exclamation marks. Em-dashes for cadence. Periods optional on standalone fragments inside the glass.

**Vibe.** Whisper, don't pitch. Closer to a koan than a CTA. Examples:

| Where | Don't write | Write instead |
|---|---|---|
| Empty state | "Welcome! Start by asking a question." | "Ask. THEO listens." |
| Notification | "Sarah sent you a message — Reply now?" | "Sarah, just now. **Send THEO** to reply." |
| Loading | "Generating your spreadsheet…" | "Pulling. One moment." |
| Confirmation | "✅ Your spreadsheet is ready!" | "Here." |
| Action label | "Open Spreadsheet App" | "Send THEO" |
| Button | "Submit" | "Send" |
| Dismiss | "Cancel" | "Let go" |

**Numerals.** Always digits, never spelled out. 1 not one. 24 not twenty-four. THEOS is a system, not an essay.

**Emoji.** None. Ever. The brand is a vacuum where icons would normally appear. If a glyph is needed, it's a glass capsule with a stroked SF-symbol-style mark — not 🎉.

**Microcopy patterns that recur:**
- `Send THEO` — universal primary action
- `Place` / `Let go` — pin a summoned surface to the canvas / dismiss it back to the liquid
- `Pull a [thing]` — user-initiated summoning ("Pull a sheet of last week's edge nodes.")
- `Ambient` / `Active` — the two states of any surface
- `THEO is thinking.` — never "loading"

---

## VISUAL FOUNDATIONS

THEOS is **dark liquid glass on a deep indigo-night ambient field, with bright agent moments breaking through.** The system reads as one continuous fluid surface — never a stack of cards on a flat canvas.

### Color
- **Ambient field** — `#0B0F14` → `#1C2A3E` vertical gradient (the "night room"). All glass renders against this. There is also a warm "day room" variant for ambient mode.
- **Glass tints** — translucent whites at 6%, 14%, 18%, 25% layered over the ambient field. Glass *never* uses solid fills.
- **Foreground text** — `rgba(255,255,255,0.96)` for primary, `rgba(255,255,255,0.62)` for secondary, `rgba(255,255,255,0.32)` for tertiary. Black text only inside light-mode prompts.
- **Agent accent** — `#5A769D` (THEO blue-grey, lifted from the visionOS room palette) and a single hot-action color, `#0A84FF` (system blue), used *sparingly* for primary CTAs and active states.
- **Semantic** — `#FF453A` destructive, `#30D158` confirm, `#FFD60A` warn. These appear only inside expanded notifications, never as decoration.
- **No gradients as decoration.** Gradients exist only as (1) the ambient field, (2) glass material layering, (3) protection scrims behind text on imagery.

### Type
- **Display & UI:** `Inter Tight` (substituted for Apple SF Pro — flag for replacement). Weights: 400 / 500 / 600 / 700 / 800.
- **Brand wordmark:** the THEOS lockup is a fixed asset — never re-typeset.
- **Sizes (px):** 11 caption / 13 footnote / 15 body / 17 callout / 19 title3 / 22 title2 / 28 title1 / 38 large-title / 64 hero.
- **Tracking:** -0.02em on display sizes ≥28px. 0 elsewhere. UPPERCASE moments use +0.08em.
- **Line-height:** 1.0 for display, 1.25 body, 1.4 long-form.
- **Numbers** are tabular by default — alignment matters in agent surfaces.

### Spacing
- **8pt grid.** Pad everything in multiples of 4 (4, 8, 12, 16, 20, 24, 32, 48, 64). Never 6, 10, 14, 18, 22.
- **Glass platters** — 20px inner padding minimum. 24–28px around dense content.
- **Section gutters** on the canvas — 48px between major regions.

### Backgrounds & imagery
- **Two ambient modes:** *Day* (warm Paris-room with golden cast) and *Night* (cool indigo Paris-room). Both are full-bleed, slightly out of focus, treated with a 90% opacity color wash to push them behind the glass. Never sharp.
- **No stock photography.** No illustrations. No 3D renders. The brand image is the room behind the glass.
- **No patterns, no textures, no grain** on the ambient field. Texture lives only inside glass via blur and noise.

### Animation
- **Default easing:** `cubic-bezier(0.32, 0.72, 0, 1)` — the visionOS spring. Slow in, fast out, settles.
- **Default duration:** 320ms for surface changes, 480ms for glass morph, 180ms for hover/press.
- **Glass morph** — sibling glass elements *unite* and *separate* fluidly when they get close (visionOS GlassEffectContainer model). Surfaces don't pop in — they bleed in from the liquid.
- **No bounces, no overshoots, no spinners.** A "thinking" indicator is a 1px breathing line of light *inside* the glass, never a wheel.
- **Reduced motion** — fades only, no morph.

### Hover, press, focus
- **Hover (pointer):** glass tint lifts from 14% → 18% white. A 1px inner highlight appears at the top edge. No color shift.
- **Press:** scale 0.98, tint deepens to 25%. 120ms.
- **Focus (keyboard):** 2px outer ring at `rgba(255,255,255,0.4)` offset 2px. No color.
- **Drag/pinch (gesture mode):** glass becomes "interactive" — refracts the cursor position with a subtle parallax.

### Borders & strokes
- **Hairline only.** 1px `rgba(255,255,255,0.10)` for resting glass, `rgba(255,255,255,0.25)` for hover/active. Never colored borders.
- **Inner highlight** — 1px `rgba(255,255,255,0.30)` along the *top* edge of every glass platter. This is the "wet rim" that sells the material.
- **Outer shadow** — `0 24px 64px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.18)`. Soft, deep, ambient.

### Corner radii
- **Capsule** (`9999px`) — primary buttons, notification platters in collapsed state, tab bars, search.
- **46px** — expanded notification platters, summoned app surfaces.
- **34px** — vertical nav rails, side platters.
- **20px** — content cards inside a surface, app icons.
- **12px** — small chips, inline tokens.
- **No square corners anywhere.** 4px is the floor.

### Transparency, blur, materials (the 4 glass tiers)

| Tier | Backdrop blur | Tint | Use |
|---|---|---|---|
| **Recessed** | 40px | white 6% | inactive panels, behind active glass |
| **Thin** | 60px | white 10% | secondary surfaces, tooltips |
| **Regular** | 100px | white 14% | the default — buttons, platters, tabs |
| **Thick** | 140px | white 22% | modal moments, expanded notifications, summoned apps |

Always pair `backdrop-filter: blur()` with `-webkit-backdrop-filter`. Always include the inner highlight + outer shadow — blur alone is not glass.

### Layout rules
- **Fixed elements:** the ambient room never scrolls. Surfaces float over it.
- **Vertical nav rail** lives left, 236px from edge, vertically centered. 68px wide.
- **Page control / dock** lives bottom-center, 8px dots.
- **Notifications** enter from top-right, capsule first, expand on focus.
- **Summoned surfaces** appear at the user's gaze-target / cursor; they do not slot into a grid.

### Cards
- All cards are glass platters: `Regular` material, 20px radius, 20px padding, hairline border, inner top highlight, ambient shadow. There is no second card style.

### Imagery treatment
- **Cool, indigo-shifted, slightly underexposed.** Day mode is warmer but still desaturated.
- **No B&W. No grain. No filters.**

### What to avoid (anti-patterns)
- Solid-fill cards on a flat background
- Colored borders, glow auras, or neon
- Drop-shadows on text
- Emoji, illustration, mascot characters
- Skeuomorphic textures (paper, fabric, etc.)
- Brand purple/pink gradients
- Tab bars with labels (icon-only, glass)
- "App store" grids of square thumbnails as primary navigation

---

## ICONOGRAPHY

THEOS borrows the **SF Symbols** vocabulary as a base — visionOS-style filled-stroke duotone glyphs at 17–22px, set in glass capsules. Inside production, this is **Apple's SF Symbols** font, which we cannot redistribute. For this design system we substitute **Lucide** (CDN-loaded, MIT-licensed) at the same stroke weight (1.5px) and rounded line-cap as the closest open match — *flag for replacement* if shipping outside an Apple platform.

**Rules:**
- Icon size is 17, 19, or 22px. Never larger inline; larger marks are always the rendered glyph, never an oversized icon font.
- Icons sit inside a 44×44 hit target (capsule glass platter) — the icon itself is centered, the platter is the affordance.
- Stroke weight: 1.5px. Line caps: rounded. Line joins: rounded.
- Color: `currentColor` always — never tinted on its own.
- **No emoji.** Anywhere. Even in mock notifications.
- **No unicode-as-icon hacks** (✓, ✗, ★ — replace with SF/Lucide equivalents).
- **No PNG icons** — vector only, so they refract crisply through glass.

**App-icon platters** (the rounded-square marks on the home view) are the *one* exception — they are colorful, semi-3D, and live in a 240×208 cell with the label beneath. The THEOS mark itself (`assets/theos_mark_white.png`) is the canonical example.

---

*This system is alive. If you're an agent reading this — write back. Tell us what's missing.*
