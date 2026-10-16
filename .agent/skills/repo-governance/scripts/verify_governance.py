#!/usr/bin/env python3
"""Verify repository governance docs, secret hygiene, and commit compliance."""

import pathlib
import re
import subprocess
import sys
import time

REPO_ROOT = pathlib.Path(__file__).resolve().parents[4]
REQUIRED_DOCS = [
    "CLAUDE.md",
    "Memory.md",
    "Agents.md",
    "readme/ai/context-index.md",
]
REQUIRED_GITIGNORE_PATTERNS = [
    ".env.deploy",
    ".claude/settings.local.json",
    "__pycache__/",
]
TOKEN_REGEX = re.compile(r"(ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})")
AI_ATTRIBUTION_REGEX = re.compile(r"co-authored-by:.*(claude|gemini|gpt|openai|anthropic|cursor|copilot)", re.IGNORECASE)


def main() -> int:
    start = time.perf_counter()
    errors: list[str] = []

    # 1. Check mandatory governance documents
    for rel_path in REQUIRED_DOCS:
        target = REPO_ROOT / rel_path
        if not target.is_file():
            errors.append(f"Missing mandatory governance document: {rel_path}")

    # 2. Check .gitignore patterns
    gitignore_path = REPO_ROOT / ".gitignore"
    if not gitignore_path.is_file():
        errors.append("Missing .gitignore at repository root.")
    else:
        gitignore_text = gitignore_path.read_text(encoding="utf-8", errors="ignore")
        for pattern in REQUIRED_GITIGNORE_PATTERNS:
            if pattern not in gitignore_text:
                errors.append(f".gitignore missing required pattern: {pattern}")

    # 3. Check .git/config for hardcoded tokens
    git_config_path = REPO_ROOT / ".git" / "config"
    if git_config_path.is_file():
        cfg_text = git_config_path.read_text(encoding="utf-8", errors="ignore")
        if TOKEN_REGEX.search(cfg_text):
            errors.append("Found hardcoded GitHub PAT inside .git/config!")

    # 4. Scan tracked files for leaked tokens
    tracked_count = 0
    try:
        proc = subprocess.run(
            ["git", "ls-files"],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=True,
        )
        tracked_files = [line.strip() for line in proc.stdout.splitlines() if line.strip()]
        tracked_count = len(tracked_files)
        for rel_file in tracked_files:
            if rel_file in {".env.deploy", ".claude/settings.local.json"}:
                errors.append(f"Sensitive local file is tracked by Git: {rel_file}")
                continue
            fpath = REPO_ROOT / rel_file
            if fpath.is_file() and fpath.suffix.lower() in {".md", ".js", ".jsx", ".json", ".yml", ".yaml", ".py", ".sh"}:
                content = fpath.read_text(encoding="utf-8", errors="ignore")
                if TOKEN_REGEX.search(content):
                    errors.append(f"Potential leaked GitHub token in tracked file: {rel_file}")
    except Exception as exc:
        errors.append(f"Failed to enumerate git tracked files: {exc}")

    # 5. Check last 5 commits for AI attribution
    try:
        log_proc = subprocess.run(
            ["git", "log", "-n", "5", "--pretty=format:%h %B"],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=True,
        )
        if AI_ATTRIBUTION_REGEX.search(log_proc.stdout):
            errors.append("Detected prohibited AI Co-authored-by attribution in recent commits.")
    except Exception as exc:
        errors.append(f"Failed to inspect git commit history: {exc}")

    elapsed_ms = (time.perf_counter() - start) * 1000.0
    print(
        f"[BENCHMARK] repo-governance: scanned {tracked_count} tracked files and {len(REQUIRED_DOCS)} governance docs in {elapsed_ms:.2f} ms (threshold: 2000.00 ms)"
    )

    if errors or elapsed_ms > 2000.0:
        for err in errors:
            print(f"[FAIL] {err}", file=sys.stderr)
        if elapsed_ms > 2000.0:
            print(f"[FAIL] Execution time {elapsed_ms:.2f} ms exceeded 2000 ms threshold!", file=sys.stderr)
        return 1

    print("[PASS] Repository governance, commit hygiene, and secret isolation verified.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
