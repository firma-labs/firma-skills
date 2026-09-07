---
name: hive-masthead
description: Every Colony app wears Allotmint's bar, full width across the top of its own face, sticky, one hairline beneath. Never a floating island, never a notch. "Reverting" is CSS specificity.
type: design
status: LOCKED 2026-08-17
source: firma-websites DESIGN-LAW.md §Masthead; sites/allotmint/src/app/globals.css .am-nav
---

# The masthead

Curtis: "EVERY APP NEEDS TO HAVE THE EXACT HEADER AS ALLOTMINT."

The bar runs the full width across the top of the app's own face, sticky, one hairline rule beneath it, top corners at the face radius, no shadow, no blur, no outer margin. It carries the face's own surface color (white in Colony, Sojourn, Converge; the dark card in Hive Mind). The masthead and the content are one continuous surface; the orange ground shows only as the frame around the whole thing. Reference shape: Solidroad's header.

If the bar ends up outside the face, on the orange, or floating with its own radius and shadow, that is a regression. Fix it, do not redesign around it.

The masthead lives inside the face element in the JSX, and its rules are declared in that app's own sheet. It "reverts" because of specificity: an `overflow: hidden` on an ancestor inside a media query outranks a bare override appended later, and overflow-hidden kills sticky with no error. Match the specificity inside the same query. See [[colony-design-law]].
