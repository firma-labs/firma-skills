# THEOS — UI Kit

The agent-first workstation. One ambient room, summoned surfaces, no apps.

## Anatomy

- **Ambient stage** — full-bleed indigo room (`bg_room_night.jpg` / `_day`), darkened and softened. The user never sees a flat background.
- **Tab rail** — vertical glass platter on the left, four icon affordances. Mostly decorative — agent-first means nav is rare.
- **Brand badge** — top-left mark + system status ("Ambient." / "THEO is thinking.").
- **Notifications** — capsule platters that bleed in from the top-right. Each carries a *prepared response* and a single **Send THEO** primary.
- **Ask bar** — bottom-center pill, the universal verb. Placeholder: *"Ask. THEO listens."*
- **Surfaces** — thick-glass platters summoned by THEO into the room. They float, can be **Place**'d (pinned) or **Let go** (dissolved). Inside: a sheet, a chat, a card grid, etc.
- **Hero state** — when nothing is summoned, the room shows a quiet breathing line of copy.

## Components

| File | Exports |
|---|---|
| `components.jsx` | `Glass`, `IconBtn`, `Pill`, `Avatar`, `NotificationPill`, `AskBar`, `AmbientStage`, `TabRail`, `ThinkingLine` |
| `Surface.jsx` | `Surface` (the summoned panel with Place / Let go) |
| `SummonedViews.jsx` | `Sheet`, `ChatThread` — sample inner views |
| `index.html` | Working click-thru: ask, summon, place, dismiss, day/night |

## Try

- Type *"pull edge nodes"* or click the suggestion chip → a Sheet surface bleeds in.
- A second notification (Firmamint) drifts in after a beat. Click **Send THEO** — a chat surface opens with the prepared response.
- Toggle **Day / Night** top-right.

## Notes

This is a faithful translation of the visionOS liquid-glass material vocabulary into THEOS's verbal dialect. The components are illustrative — real production would use SwiftUI's `glassEffect` (see `liquid-glass/SKILL.md` in this project's source).
