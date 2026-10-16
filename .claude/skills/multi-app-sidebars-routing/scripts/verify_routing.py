#!/usr/bin/env python3
"""Verify 5-app sidebar definitions in sidebars.js, navbar bindings in docusaurus.config.js, and slug rules."""

import pathlib
import re
import sys
import time

REPO_ROOT = pathlib.Path(__file__).resolve().parents[4]
EXPECTED_SIDEBARS = [
    "ecodataSidebar",
    "ecolabSidebar",
    "ecolitSidebar",
    "pdfhubSidebar",
    "keywordsSidebar",
]
DOC_ID_REGEX = re.compile(r"['\"]((?:ecodata|ecolab|ecolit|pdfhub|keywords)/[a-zA-Z0-9_/-]+)['\"]")
DEPRECATED_SLUGS = ["ecolab/mo-hinh", "mo-hinh/danh-muc"]


def resolve_doc_file(base_dir: pathlib.Path, doc_id: str) -> pathlib.Path | None:
    for ext in (".md", ".mdx"):
        candidate = base_dir / f"{doc_id}{ext}"
        if candidate.is_file():
            return candidate
    return None


def main() -> int:
    start = time.perf_counter()
    errors: list[str] = []

    sidebars_path = REPO_ROOT / "sidebars.js"
    config_path = REPO_ROOT / "docusaurus.config.js"
    docs_dir = REPO_ROOT / "docs"

    if not sidebars_path.is_file():
        print("[FAIL] Missing sidebars.js at repository root.", file=sys.stderr)
        return 1
    if not config_path.is_file():
        print("[FAIL] Missing docusaurus.config.js at repository root.", file=sys.stderr)
        return 1

    sidebars_text = sidebars_path.read_text(encoding="utf-8", errors="ignore")
    config_text = config_path.read_text(encoding="utf-8", errors="ignore")

    # 1. Verify all 5 sidebars exist in sidebars.js and docusaurus.config.js
    for sb in EXPECTED_SIDEBARS:
        if sb not in sidebars_text:
            errors.append(f"Missing sidebar definition in sidebars.js: {sb}")
        if sb not in config_text:
            errors.append(f"Sidebar not bound in docusaurus.config.js navbar: {sb}")

    # 2. Check for deprecated slugs
    for bad_slug in DEPRECATED_SLUGS:
        if bad_slug in sidebars_text:
            errors.append(f"Deprecated slug '{bad_slug}' found in sidebars.js")
        if (docs_dir / bad_slug).exists():
            errors.append(f"Deprecated path exists on disk: docs/{bad_slug}")

    # 3. Verify every doc ID referenced in sidebars.js exists on disk in docs/
    doc_ids = sorted(set(DOC_ID_REGEX.findall(sidebars_text)))
    for doc_id in doc_ids:
        if resolve_doc_file(docs_dir, doc_id) is None:
            errors.append(f"Broken sidebar reference: '{doc_id}' has no matching .md/.mdx file in docs/")

    elapsed_ms = (time.perf_counter() - start) * 1000.0
    print(
        f"[BENCHMARK] multi-app-sidebars-routing: verified {len(EXPECTED_SIDEBARS)} sidebars and {len(doc_ids)} doc routes in {elapsed_ms:.2f} ms (threshold: 500.00 ms)"
    )

    if errors or len(doc_ids) == 0 or elapsed_ms > 500.0:
        for err in errors:
            print(f"[FAIL] {err}", file=sys.stderr)
        if elapsed_ms > 500.0:
            print(f"[FAIL] Execution time {elapsed_ms:.2f} ms exceeded 500 ms threshold!", file=sys.stderr)
        return 1

    print("[PASS] All 5 app sidebars, navbar bindings, and document routes verified.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
