---
name: page-rhythm
description: The rhythm for site pages, from supermemory.ai. Dark interlude bands, image and copy in the same unit, tight scale, visual relief instead of photo stacking.
type: design
status: LOCKED 2026-05-14
source: firma-vault assets/site/supermemory-source.html; assets/site/firma.html
---

# Page rhythm

1. **Dark interlude bands** break the rhythm between content sections.
2. **Image and copy live in the same unit**, side by side or stacked tight. Never a standalone image in one section and its explanation in the next.
3. **Tight scale.** Smaller padding, smaller headings, denser type. "Everything is too big" was the correction. The hero must not dwarf the rest.
4. **Visual rhythm, not photo stacking.** Alternate image-and-copy, tight text, dark band, cards. If a page runs five sections without an interlude, add one.

Reference implementations in the vault: `assets/site/firma.html` (light, `.dark-band`, `.feat-comp`, paired units), `firma-edge-dark.html` and `firma-photon-dark.html` (dark, `.edge-interlude`). Grep those for the patterns; do not re-derive. The system underneath is [[super-firma-blue]] or [[super-firma-acid-dither]].
