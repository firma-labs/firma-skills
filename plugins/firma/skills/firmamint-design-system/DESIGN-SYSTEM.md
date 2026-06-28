# Firmamint Design System

> The visual identity of Firma Labs and the firmamint ecosystem. Extracted from the [Figma Brand Guide](https://www.figma.com/design/oorII4hi6KsCBi6oxW3AXU/Firma-Labs--Brand-Guide).

**Design concept:** Neuroaesthetic Minimalism
**Tagline:** Build Sovereign Systems. Together.

---

## Color Palette

### Named Brand Colors

| Token | Hex | RGB | Role |
|-------|-----|-----|------|
| `baby-powder` | `#FAF9F6` | `rgb(250,249,246)` | Primary background / light neutral |
| `coral` | `#FA8C5D` | `rgb(250,140,93)` | Primary accent warm |
| `crayola` | `#F6718D` | `rgb(246,113,141)` | Primary accent pink |
| `vanilla` | `#FFE9A7` | `rgb(255,233,167)` | Accent warm highlight |
| `vista-blue` | `#84A7F7` | `rgb(132,167,247)` | Primary accent cool / blue |
| `white` | `#FFFFFF` | `rgb(255,255,255)` | Background / text on dark |
| `onyx` | `#3F3F3F` | `rgb(63,63,63)` | Primary dark / text color |

### Utility Colors

| Token | Hex | Role |
|-------|-----|------|
| `deep-navy` | `#002765` | Deep navy accent |
| `dark-brown` | `#160505` | Darkest text |
| `dark-gray` | `#38353B` | Secondary dark |
| `medium-gray` | `#706D73` | Muted text |
| `light-gray` | `#D9D9D9` | Light neutral |
| `soft-gray` | `#E5E5E5` | Border neutral |
| `warm-beige` | `#F4EFEC` | Warm background |
| `peach-cream` | `#F9DEC3` | Warm border |
| `ghost-white` | `#F9FAFF` | Blue-tinted white |
| `off-white` | `#FCFCFC` | Near-white |
| `error-red` | `#B9001C` | Error / destructive |

### Text Colors

| Usage | Hex |
|-------|-----|
| Primary | `#160505` |
| Secondary | `#38353B` |
| Body | `#3F3F3F` |
| Muted | `#706D73` |
| Accent | `#FA8C5D` |
| On dark | `#FFFFFF` |

### Background Colors

| Usage | Hex |
|-------|-----|
| Primary | `#FAF9F6` |
| White | `#FFFFFF` |
| Blue | `#F9FAFF` |
| Dark | `#3F3F3F` |
| Accent | `#FA8C5D` |
| Highlight | `#FFE9A7` |
| Neutral | `#D9D9D9` |
| Navy | `#002765` |

### Overlay Colors

| Value | Usage |
|-------|-------|
| `rgba(0,0,0,0.08)` | Subtle shadow |
| `rgba(0,0,0,0.25)` | Medium shadow |
| `rgba(173,166,160,0.1)` | Muted warm shadow |
| `rgba(240,237,235,0.5)` | Semi-transparent warm border |
| `rgba(255,255,255,0.25)` | Semi-transparent white |
| `rgba(255,255,255,0.5)` | Half-white overlay |

---

## Gradients

| Token | CSS | Description |
|-------|-----|-------------|
| `primary` | `linear-gradient(0deg, #FA8C5D 1.34%, #F6718D 51.14%, #84A7F7 100%)` | Coral -> Crayola -> Vista Blue (signature) |
| `primary-angled` | `linear-gradient(26deg, #FA8C5D 12.92%, #F6718D 50.67%, #84A7F7 87.71%)` | Primary at ~26deg |
| `primary-reversed` | `linear-gradient(46deg, #84A7F7 15.26%, #F6718D 52.97%, #FA8C5D 91.41%)` | Reversed |
| `soft-pastel` | `linear-gradient(148deg, #B4CCFB 0%, #FBABAD 49.52%, #C8B0E6 100%)` | Soft blue/pink/lavender |
| `warm-sunset` | `linear-gradient(213deg, #C7ABE3 0%, #FFB478 98.61%)` | Purple to warm orange |
| `golden-fire` | `linear-gradient(213deg, #FDBB5D 0%, #FC7B69 48.56%, #AAA8F1 100%)` | Golden to red to purple |

---

## Typography

### Font Families

| Role | Family | Weights | Usage |
|------|--------|---------|-------|
| **Headline** | Gambarino | Regular | Headlines and key messaging. Balance between spiritual and technological. |
| **Body** | Supreme | Regular, Medium, Bold | Primary body typeface |
| **Accent** | Instrument Serif | Regular, Italic | Decorative serif accent |
| **UI** | Instrument Sans | Regular, Medium, SemiBold | Small-scale elements, clarity at small sizes |
| **Secondary** | Satoshi | Medium | Secondary body text |
| **Light** | Outfit | Light | Light weight accent |
| **Editorial** | Times New Roman | Italic | Editorial/quote accent |
| **System** | Inter | Medium | System/fallback UI |

### Type Scale

| Token | Size |
|-------|------|
| `xs` | 11px |
| `sm` | 18px |
| `base` | 24px |
| `lg` | 30px |
| `xl` | 32px |
| `2xl` | 36px |
| `3xl` | 40px |
| `4xl` | 46px |
| `5xl` | 74px |
| `6xl` | 104px |
| `7xl` | 110px |
| `8xl` | 120px |
| `9xl` | 140px |

### Display Sizes (Hero/Feature)

110px, 120px, 175px, 197px, 246px, 295px

### Letter Spacing

| Context | Value |
|---------|-------|
| Headlines | -2% |
| Body | 0% |

### Line Heights

| Token | Value |
|-------|-------|
| Tight | 0.9 |
| Snug | 1.1 |
| Normal | 1.2 |
| Relaxed | 1.3 |
| Loose | 1.45 |
| Spacious | 1.5 |
| Brand spec | 120% |

### Font Feature Settings

- `'case' 1, 'dlig' 1` — case alternates + discretionary ligatures
- `'case' 1, 'ordn' 1` — case alternates + ordinals
- `'dlig' 1` — discretionary ligatures
- `'frac' 1` — fractions

---

## Spacing

### Gap Scale

| Token | Value |
|-------|-------|
| `2xs` | 8px |
| `xs` | 10px |
| `sm` | 15px |
| `md` | 16px |
| `lg` | 20px |
| `xl` | 30px |
| `2xl` | 32px |
| `3xl` | 40px |
| `4xl` | 48px |
| `5xl` | 55px |
| `6xl` | 80px |
| `7xl` | 92px |
| `8xl` | 98px |
| `9xl` | 115px |
| `10xl` | 200px |

### Common Padding

2px, 3px, 10px, 14px, 16px, 32px, 40px, 60px, 80px, 100px, 134px, 140px

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 3.5px | Smallest elements |
| `md` | 10px | Standard cards |
| `lg` | 12px | Larger cards |
| `xl` | 30px | Rounded containers |
| `2xl` | 35px | Large rounded |
| `3xl` | 100px | Very rounded |
| `pill` | 148px | Pill buttons |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `subtle` | `0 3px 6px rgba(244,239,236,0.5)` | Subtle warm lift |
| `soft` | `0 25px 49px rgba(244,239,236,0.5)` | Soft warm elevation |
| `medium` | `0 12px 25px rgba(0,0,0,0.08)` | Medium drop |
| `muted` | `0 25px 25px rgba(173,166,160,0.1)` | Muted warm |
| `hard` | `0 4px 4px rgba(0,0,0,0.25)` | Hard shadow |
| `glow` | `0 0 35px rgba(248,248,248,0.27)` | Text/element glow |

### Glassmorphism

```css
border: 12px solid rgba(240,237,235,0.5);
box-shadow: inset 0 25px 12px rgba(255,255,255,0.5),
            0 25px 49px rgba(244,239,236,0.5);
border-radius: 148px;
```

---

## Borders

| Width | Usage |
|-------|-------|
| 0.5px | Hairline |
| 0.6px | Fine |
| 1px | Standard |
| 6px | Medium accent |
| 12px | Thick accent |
| 25px | Heavy accent / glassmorphism |

---

## Logo Usage

### Variants
- Full-color
- Monochrome

### Don'ts
- Change the color of the logo
- Fill the logo with images
- Outline the logo
- Place over busy backgrounds
- Recreate with different fonts
- Skew the logo
- Use text without the graphic

---

## Token Studio Setup

1. Install [Token Studio](https://tokens.studio/) in Figma
2. Connect to GitHub: `firma-labs/firma-vault`
3. Token file path: `skills/firmamint-design-system/tokens.json`
4. Pull tokens, design

## Figma Variables

67 variables live in the [Brand Guide file](https://www.figma.com/design/oorII4hi6KsCBi6oxW3AXU/Firma-Labs--Brand-Guide) under the **Firmamint** collection.
