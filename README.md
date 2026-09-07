# firma-skills

Firma's skill graph, design systems, and agents, packaged as a Claude Code plugin marketplace so they install with one command on any machine and stay in sync via `git`.

## Install

```
/plugin marketplace add firma-labs/firma-skills
/plugin install firma
```

That's it — restart Claude Code and the skills + agents are available in **every** project.

## What's in the `firma` plugin

**The skill graph**
- `firma-graph` — the graph every agent reads first. `SKILL.md` is the entry point; the nodes sit in seven folders: `truths/` (the machine: firmamint, Atonemint, FIG, Elemint, Fragmint, Embodimint, THEOS, DNA, Edge and Photon, Realm, SeedBase, Settlemint), `words/` (casing, killed words, terminology), `design/` (which design system applies where, the Colony law, the masthead, mobile first), `images/` (asset rules and where the real renders live), `protocols/` (how agents engage), `people/` (roles, formation), `blueprint/` (the Firma Blueprint: systems, never rules, rulings, and a full snapshot). Every node has a YAML description and links to its neighbors with `[[wikilinks]]`. Open the folder in Obsidian to see the graph.

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

The design-system skills are authored in `firma-vault`; this repo is the published snapshot. `firma-graph` is authored here: edit the node, keep the YAML description true, link the neighbors, and update `SKILL.md` if a node is added or removed. To ship an update: make the change, bump the version in `plugin.json`, commit, and push. Installs pick it up on the next `/plugin marketplace update`.

---
Firma Labs · for internal/team use.
