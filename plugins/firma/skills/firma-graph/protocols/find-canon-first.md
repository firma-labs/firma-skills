---
name: find-canon-first
description: Looking for canon on X: open wiki/X-protocol.md or wiki/X-master-knowledge.md first, grep code identifiers not prose, and read the hiring source of truth before drafting anything about structure, values, or mission. Scope greps to wiki/; the vault root times out.
type: protocol
status: LOCKED
source: Curtis 2026-08-16; 2026-05-14
---

# Find the named canon file first

Pattern-grepping feels thorough but only finds the shapes you guessed. Canon lives in named protocol docs and in code blocks (structs, interfaces, enums). The six dimensions of Embodimint sat in `wiki/embodimint-protocol.md`, the file named for the thing, unopened.

1. Open `~/dev/firma-vault/wiki/X-protocol.md` or `wiki/X-master-knowledge.md`.
2. Grep for code identifiers (`struct`, `interface`, `Score`, `enum`), not only prose.
3. Follow a promising identifier immediately.
4. Scope greps to `wiki/` with globs; a bare grep over the vault root times out.

**Before drafting anything about governance, entity structure, mission, values, ethos, or conduct,** read `sources/firma-hiring-source-of-truth.md` and `handbook/who-we-are.md`. Pull load-bearing lines verbatim. Do not invent ministries, councils, or alliances that are not there. The hierarchy for Edge and Photon is `wiki/edge-master-knowledge.md` v3+ and `wiki/firma-photon-master-knowledge.md`; never cite v2 or the old edge-energy and edge-base pages.

The vault lives only at `~/dev/firma-vault/`. The Desktop path is dead. Living drive is `HTML/Storage`; `archive/` is outdated and not a source. When files carry `-v[N]`, touch only the latest. Commit single vault files via the GitHub API when a worktree is unreliable.
