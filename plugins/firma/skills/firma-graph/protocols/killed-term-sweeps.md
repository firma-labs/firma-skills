---
name: killed-term-sweeps
description: How to retire a term without destroying the trail. Rewrite current-tense claims, leave kill notices and history alone, mark historical mentions "(retired)", delete dead file rows, verify with a scoped grep.
type: protocol
status: LOCKED
source: 2026-05-13 cleanup lessons
---

# Killed-term sweeps

Two failure modes: mass search-and-replace that turns a kill notice into nonsense ("replaces 'module' terminology"), and deleting every historical mention so nobody later knows the term is dead and reintroduces it.

- **Current-tense claims** about the killed thing → rewrite to current canon.
- **Kill notices, terminology tables, build history** → leave them; they explain what is killed and why.
- **File references in active source tables** → delete the row.
- **Mentions in build-history, prophetic, or vision docs** → mark inline "(retired)".

Automate the clear cases, then scan the result by hand for self-inflicted regressions inside kill-notice contexts. Finish with `grep -rln "term" wiki/ | grep -v archive/`. The list is in [[killed-words]].
