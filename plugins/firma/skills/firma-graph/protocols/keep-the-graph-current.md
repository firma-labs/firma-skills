---
name: keep-the-graph-current
description: The graph stays true only if rulings land in it. A ruling made with an agent is written into the node the same session, committed, and pushed. A weekly sweep proposes the rest as a pull request. The lint flags nodes whose source changed after them. The Blueprint snapshot refreshes itself nightly.
type: protocol
status: LOCKED 2026-09-06
source: Curtis: "how does this stay updated and not get stale?"
---

# Keep the graph current

Nothing keeps a folder of markdown true on its own. The graph is the team's record, so writing to it is part of every loop.

1. **Rulings land here first.** When Curtis rules something in a session (a word locked, a term killed, a shape decided), the agent edits the node in `firma-graph` that session, keeps the YAML description true, updates `SKILL.md` if a node is added or removed, commits, and pushes to `firma-labs/firma-skills` main. Private agent memory becomes a pointer; the graph is the record. A ruling that only lives in a conversation is not a ruling anyone else can follow.
2. **The weekly sweep.** Every Monday a cloud routine named "Firma graph sweep" reads the week's commits in the vault (wiki, handbook, sources, engineering/builds), the Blueprint export, and this repo, compares them to the nodes, and opens a pull request titled `graph sweep YYYY-MM-DD` with minimal edits. It sends Curtis one Slack message with the summary and the link. Nothing lands without a person merging.
3. **The lint.** `python3 tools/lint.py` fails on dangling links, orphans, and missing frontmatter, and prints `STALE?` for any node whose source file in the vault changed after the node did. Run it before every commit to this folder.
4. **The Blueprint snapshot** (`blueprint/blueprint-full.md`) is refreshed nightly by a GitHub Action from https://firma-blueprint.netlify.app/blueprint.md. Never edit it by hand; edit the Blueprint data and redeploy.
5. **Rulings made elsewhere** (Slack, in person) reach the graph when someone says "put it in the graph" to any agent with this plugin, or when the sweep finds them written down in the vault.

When the DNA Protocol is live, catching drift between what the team says and what the canon says is its job, and this graph is the canon it checks against. See [[dna-protocol]], [[find-canon-first]], [[correct-dont-narrate]].
