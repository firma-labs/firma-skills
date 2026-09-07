---
name: secrets
description: Keys go in the tool's connection field, never in chat. A pasted secret gets one short rotate reminder. Never write anyone's secret to a file, memory, Notion, or git.
type: protocol
status: LOCKED
source: 2026-05-20 incidents
---

# Secrets

When a secret is needed for a tool being wired, ask for it to be pasted into that tool's connection field, not into chat. If one lands in chat, flag it in one line and ask for it to be rotated; the transcript now holds it. Never write secrets to files, memory, Notion, or git. Not preachy: one reminder, then move on. Runtime secrets on Netlify go through the dashboard variable form; the CLI needs a linked site and the API create call fails.
