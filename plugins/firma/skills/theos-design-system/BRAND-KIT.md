# Theos Brand Kit

> Source: [Figma Brand Guide — theos-brand-kit](https://www.figma.com/design/oorII4hi6KsCBi6oxW3AXU/Firma-Labs--Brand-Guide?node-id=7004-322&m=dev)

---

## Brand Overview

**Theos** (stylized as "theo" in lowercase or "THEOS" in uppercase) is the brand identity for Firma's agentic AI operating system. The visual identity centers on a distinctive **theta (θ) logo mark** — an abstract capsule/pill shape with hatched line texture — paired with bold, tightly-tracked Supreme typography.

The system is strictly **monochromatic**: `#3F3F3F` (onyx) and `#FFFFFF` (white). No other colors are used.

---

## Color Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-dark` | `#3F3F3F` | `rgb(63, 63, 63)` | Primary dark / text on light |
| `--color-light` | `#FFFFFF` | `rgb(255, 255, 255)` | Primary light / text on dark |

### Application Rules

- **Light mode**: White background, dark logo and text
- **Dark mode**: Dark background, white logo and text
- Never use the logo on colored backgrounds or with color overlays

---

## Typography

| Property | Value |
|----------|-------|
| **Font Family** | Supreme |
| **Font Weight** | Bold (700) |
| **OpenType Features** | `'dlig' 1` (discretionary ligatures) |
| **Letter Spacing** | -3% of font size |
| **Line Height** | 1.2 |

Supreme Bold with discretionary ligatures and tight negative tracking is the only typeface used in the brand.

---

## Logo Components

### 1. Theta Logo Mark

The primary brand symbol — a stylized theta (θ) rendered as an abstract capsule/pill shape rotated ~72 degrees, with a horizontal bar and hatched line texture (23 parallel lines creating an engraved effect).

**Construction:**
- Two overlapping elliptical/capsule shapes rotated ~72deg
- Back shape is solid filled
- Front shape has horizontal hatched lines
- Together they create a dimensional, engraved-coin effect

| Variant | File |
|---------|------|
| White on dark | `brand-kit/theta-logo-white.svg` |
| Dark on light | `brand-kit/theta-logo-dark.svg` |

### 2. "theo" Wordmark (Lowercase)

The lowercase lockup: theta mark + "theo" in Supreme Bold.

| Variant | File |
|---------|------|
| Dark on white | `brand-kit/theo-subtitle-dark.svg` |
| White on dark | `brand-kit/theo-subtitle-white.svg` |

### 3. "THEOS" Wordmark (Uppercase)

The uppercase lockup: theta mark + "THEOS" in Supreme Bold. Used for larger, more prominent brand moments.

| Variant | File |
|---------|------|
| Dark on white | `brand-kit/theos-wordmark-dark-title.svg` |

### 4. App Icon — Theta

The theta mark rendered as an app icon in a rounded square container.

| Variant | File |
|---------|------|
| Dark mark on white | `brand-kit/theta-dark-app-icon.svg` |
| White mark on dark | `brand-kit/theta-white-app-icon.svg` |

---

## Usage Guidelines

### Do

- Use the logo mark at sizes where the hatched texture is clearly visible (>100px)
- Maintain the -3% negative letter spacing on all brand typography
- Keep clear space around the logo mark equal to at least the height of the horizontal bar
- Use only on `#3F3F3F` or `#FFFFFF` backgrounds
- Always enable `'dlig' 1` for Supreme Bold brand text

### Don't

- Don't apply color to the logo — strictly monochromatic
- Don't stretch, rotate, or distort the logo mark
- Don't use the hatched version at very small sizes where lines blur
- Don't alter the letter spacing of the wordmark
- Don't use fonts other than Supreme Bold for brand text
- Don't add shadows, gradients, or effects to the logo
- Don't place the logo on photographic or patterned backgrounds

### Minimum Sizes

| Component | Minimum Width |
|-----------|---------------|
| Logo mark (hatched) | 100px |
| Logo mark (outlined) | 32px |
| Wordmark | 120px |
| Full lockup | 200px |

---

## Asset Inventory

All brand kit assets are stored in `brand-kit/`:

| File | Description |
|------|-------------|
| `theta-logo-white.svg` | Theta mark, white (for dark backgrounds) |
| `theta-logo-dark.svg` | Theta mark, dark (for light backgrounds) |
| `theta-dark-app-icon.svg` | App icon, dark mark on white |
| `theta-white-app-icon.svg` | App icon, white mark on dark |
| `theo-subtitle-dark.svg` | "theo" lowercase lockup, dark |
| `theo-subtitle-white.svg` | "theo" lowercase lockup, white |
| `theos-wordmark-dark-title.svg` | "THEOS" uppercase wordmark, dark |
| `dark-rectangle-bg.svg` | Dark background rectangle |
| `dark-long-rectangle-bg.svg` | Dark background tall rectangle |
| `rounded-rectangle-bg.svg` | Rounded rectangle background |

---

## CSS Variables

```css
:root {
  --theos-color-dark: #3F3F3F;
  --theos-color-light: #FFFFFF;
  --theos-font-family: 'Supreme', sans-serif;
  --theos-font-weight: 700;
  --theos-letter-spacing: -0.03em;
  --theos-line-height: 1.2;
}

.theos-brand-text {
  font-family: var(--theos-font-family);
  font-weight: var(--theos-font-weight);
  letter-spacing: var(--theos-letter-spacing);
  line-height: var(--theos-line-height);
  font-feature-settings: 'dlig' 1;
}
```
