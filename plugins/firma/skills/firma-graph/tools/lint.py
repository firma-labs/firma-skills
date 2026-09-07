#!/usr/bin/env python3
"""Lint the firma-graph: dangling wikilinks, orphan nodes, missing frontmatter,
and (when a vault path is given) nodes whose source file changed after the node.

Usage: python3 tools/lint.py [--vault ~/dev/firma-vault] [--websites ~/dev/firma-websites]
Exit 1 when any hard error (dangling link, orphan, bad frontmatter) is found.
"""
import argparse, os, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LINK = re.compile(r"\[\[([^\]|#]+)")

def frontmatter(text):
    if not text.startswith("---"):
        return None
    end = text.find("\n---", 3)
    if end < 0:
        return None
    fm = {}
    for line in text[3:end].strip().splitlines():
        if ":" in line and not line.startswith(" "):
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip()
    return fm

def git_date(repo, rel):
    try:
        out = subprocess.run(["git", "-C", str(repo), "log", "-1", "--format=%cs", "--", rel],
                             capture_output=True, text=True, timeout=30).stdout.strip()
        return out or None
    except Exception:
        return None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--vault", default=os.path.expanduser("~/dev/firma-vault"))
    ap.add_argument("--websites", default=os.path.expanduser("~/dev/firma-websites"))
    a = ap.parse_args()

    nodes = {p.stem: p for p in ROOT.rglob("*.md")
             if p.name != "blueprint-full.md" and "tools" not in p.parts}
    errors, warnings = [], []
    inbound = {k: 0 for k in nodes}

    for name, p in nodes.items():
        text = p.read_text()
        fm = frontmatter(text)
        if name != "SKILL" and (not fm or "description" not in fm or "name" not in fm):
            errors.append(f"{p.relative_to(ROOT)}: missing name/description frontmatter")
        for target in LINK.findall(text):
            target = target.strip()
            if target == "name":
                continue  # the placeholder in SKILL.md's explanation
            if target in nodes:
                if target != name:
                    inbound[target] += 1
            else:
                errors.append(f"{p.relative_to(ROOT)}: dangling link [[{target}]]")
        # freshness: compare node date to its source's last change in the vault or websites repo
        if fm and "source" in fm:
            node_date = git_date(ROOT, str(p.relative_to(ROOT)))
            for repo_root, prefixes in ((Path(a.vault), ("firma-vault ",)), (Path(a.websites), ("firma-websites ",))):
                if not repo_root.exists():
                    continue
                for tok in re.split(r"[;,]", fm["source"]):
                    tok = tok.strip()
                    for pre in prefixes:
                        if tok.startswith(pre):
                            rel = tok[len(pre):].split(" ")[0]
                            if (repo_root / rel).exists():
                                src_date = git_date(repo_root, rel)
                                if node_date and src_date and src_date > node_date:
                                    warnings.append(f"{p.relative_to(ROOT)}: source {rel} changed {src_date}, node last touched {node_date}")

    for name, n in inbound.items():
        if name != "SKILL" and n == 0:
            errors.append(f"{nodes[name].relative_to(ROOT)}: orphan (no inbound link)")

    for w in warnings:
        print("STALE?", w)
    for e in errors:
        print("ERROR ", e)
    print(f"{len(nodes)} nodes · {len(errors)} errors · {len(warnings)} possibly stale")
    sys.exit(1 if errors else 0)

if __name__ == "__main__":
    main()
