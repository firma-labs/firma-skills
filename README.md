# firma-skills

Firma Labs design systems and agents, packaged as a Claude Code plugin marketplace so they install with one command on any machine and stay in sync via `git`.

## Install

```
/plugin marketplace add firma-labs/firma-skills
/plugin install firma
```

That's it — restart Claude Code and the skills + agents are available in **every** project.

## What's in the `firma` plugin

**Design-system skills**
- `firmamint-design-system` — the canonical Firma Labs brand layer (tokens, gradients, type, Token Studio JSON, Figma brand guide). Everything else inherits from this.
- `theos-design-system` — interfaces and assets for THEOS, the agent-first OS.
- `firma-frontier-design-system` — the Firma fund family: Frontier (expressive, acid-yellow + iridescent) and Onym Capital (restrained monochrome) — orb mark, dot-matrix data card, UI kits.
- `montion-design-system` — Motion (Framer Motion) animation patterns (drag, scroll, gestures, springs, SVG morph).

**Agents**
- `brand-copy-architect` — brand copy (taglines, heroes, manifestos) paired with layout/type decisions.
- `firma-vision-scribe` — synthesizes firma-vault content into clear briefings and vision docs.
- `claude-skills-curator` — discover, author, validate, and manage Claude skills.

## Updating

Skills are authored in `firma-vault`; this repo is the published, installable snapshot. To ship an update: copy the changed skill/agent in here, bump the version in `plugin.json`, commit, and push. Installs pick it up on the next `/plugin marketplace update`.

---
Firma Labs · for internal/team use.
