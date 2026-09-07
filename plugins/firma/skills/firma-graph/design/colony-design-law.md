---
name: colony-design-law
description: The one system every Colony app obeys. The orange room with a white face, Edge palette only, type and rhythm scale in size/line-height pairs, five radius steps, orange as the action color everywhere, dark-first in Allotmint. Includes the gotchas that keep biting.
type: design
status: LOCKED
source: firma-websites DESIGN-LAW.md; sites/allotmint/src/app/globals.css; sites/colony/src/screens/thehive.css
---

# Colony design law

**The room.** Every app stands on a field of Firma orange `#ff5a1f` with a 46px white grid at 13%, on ONE face with `--r-face` corners. The masthead is sticky so the face never leaves the top; see [[hive-masthead]]. Phones (≤700px) go full-bleed: no margin, no radius, no shadow.

**Palette = Firma Edge only.** See [[firma-edge-design]]. No navy, no Monday blue `#0073ea`, no purple or indigo. Color indicates function, never decoration. **Orange is the action color in every app.** Curtis rejected per-app accent colors for actions: "i want converge to look like the others."

**Per-app identity:** one accent equal to the app's hexagon tint on the Colony comb, used only in the masthead rule and active nav. Sojourn, Hive Mind, Increase = mint. Calendar, Converge, Allotmint = information blue. Basecamp = concrete.

**Type and rhythm.** Sizes ship in size/line-height pairs: micro 10/1.4 · xs 12/1.45 · sm 13.5/1.5 · base 15/1.6 · md 17/1.5; headings and stats clamped with their own leading. Prose measure 62ch. Space scale 4/8/12/16/24/32/48/64 for every gap and pad. Cards share one structure and one padding. Geist 800–900 caps for headings; Geist Mono uppercase 0.14em for every label and status. Nothing informational under 9px. The absence of this scale is what reads as "squashed boxes and floating text."

**Radius, five steps:** face 22 · surface 14 · card 10 · control 8 · pill 999.

**Dark mode is the default** in Allotmint.

**Gotchas.** `overflow: hidden` on the face silently kills sticky. Declare per-app rules in that app's own sheet; the shared shell sheet loads first and wins ties. A bundled sheet that loads later ties and loses at equal specificity, so raise specificity in the same media query. rAF and IntersectionObserver pause in background tabs; reveal above-the-fold content synchronously. Never give a board a fixed viewport height; height is a minimum. Hover states restate color or go unreadable in the other theme. Assert "Production URL" printed after every Netlify deploy.
