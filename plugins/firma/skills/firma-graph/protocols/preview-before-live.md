---
name: preview-before-live
description: A redesign of a live page is built at a preview path and shown first. The live file changes only after Curtis's explicit go. In a git-linked repo, saving a tracked file is a deploy. Check git status for parallel sessions before editing.
type: protocol
status: LOCKED 2026-09-03
source: Curtis on the /edges remake: "i told you not to mess with the actual link until we completed the firma edge design."
---

# Preview before live

His live sites are his public face. A redesign is not done until he says so.

- Build at a separate path (`<page>/remake-preview.html`, a preview Netlify site, or a gitignored scratch), show the preview URL, copy over the live file only after an explicit go.
- Never edit the live-bound file in place, even when the ask sounds like "remake the site."
- **firmalabs.org, portal.firmalabs.org, and the firma-websites sites are git-linked: push to main is the deploy.** firma-vault has an auto-committer that sweeps tracked files mid-session; add new files to git immediately so they are not lost, and know that a tracked edit will ship.
- Run `git status` before design edits. Uncommitted work you did not make means another session is live in the repo; ask first.
- Work on main; never revive a merged branch name. Prove location with merge-base, not branch names.
- Never restore a deleted file without asking; deletions are usually intentional. Removing a page means removing the HTML only, never its images.
- After a Netlify deploy, assert "Production URL" printed. Curl every function after shipping.
