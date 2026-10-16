#!/usr/bin/env python3
"""Verify build scripts in package.json, container/Makefile artifacts, and webhook deployment specifications."""

import json
import pathlib
import sys
import time

REPO_ROOT = pathlib.Path(__file__).resolve().parents[4]
REQUIRED_FILES = [
    "package.json",
    "Dockerfile",
    "docker-compose.yml",
    "Makefile",
    "readme/ai/deploy-checklist.md",
    "readme/ai/build-runbook.md",
]
REQUIRED_NPM_SCRIPTS = ["start", "build", "serve", "clear"]


def main() -> int:
    start = time.perf_counter()
    errors: list[str] = []

    for rel in REQUIRED_FILES:
        if not (REPO_ROOT / rel).is_file():
            errors.append(f"Missing required build/deploy file: {rel}")

    pkg_path = REPO_ROOT / "package.json"
    if pkg_path.is_file():
        try:
            pkg_data = json.loads(pkg_path.read_text(encoding="utf-8"))
            scripts = pkg_data.get("scripts", {})
            for req_script in REQUIRED_NPM_SCRIPTS:
                if req_script not in scripts:
                    errors.append(f"package.json missing required npm script: '{req_script}'")
        except Exception as exc:
            errors.append(f"Invalid JSON in package.json: {exc}")

    checklist_path = REPO_ROOT / "readme" / "ai" / "deploy-checklist.md"
    if checklist_path.is_file():
        text = checklist_path.read_text(encoding="utf-8", errors="ignore")
        for keyword in ("docs-webhook", "3051", "docs-oauth-proxy", "3050", "/opt/docs/ecodata"):
            if keyword not in text:
                errors.append(f"deploy-checklist.md missing critical operational reference: '{keyword}'")

    elapsed_ms = (time.perf_counter() - start) * 1000.0
    print(
        f"[BENCHMARK] webhook-cicd-deploy: verified {len(REQUIRED_FILES)} build/deploy specs and {len(REQUIRED_NPM_SCRIPTS)} npm scripts in {elapsed_ms:.2f} ms (threshold: 500.00 ms)"
    )

    if errors or elapsed_ms > 500.0:
        for err in errors:
            print(f"[FAIL] {err}", file=sys.stderr)
        if elapsed_ms > 500.0:
            print(f"[FAIL] Execution time {elapsed_ms:.2f} ms exceeded 500 ms threshold!", file=sys.stderr)
        return 1

    print("[PASS] Webhook CI/CD pipeline specifications and Docusaurus build scripts verified.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
