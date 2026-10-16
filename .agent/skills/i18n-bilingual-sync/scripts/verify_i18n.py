#!/usr/bin/env python3
"""Verify 1:1 bilingual file parity between docs/ (VI) and i18n/en/ (EN) and validate JSON translation catalogs."""

import json
import pathlib
import sys
import time

REPO_ROOT = pathlib.Path(__file__).resolve().parents[4]
VI_ROOT = REPO_ROOT / "docs"
EN_ROOT = REPO_ROOT / "i18n" / "en" / "docusaurus-plugin-content-docs" / "current"
JSON_CATALOGS = [
    REPO_ROOT / "i18n" / "en" / "code.json",
    REPO_ROOT / "i18n" / "en" / "docusaurus-plugin-content-docs" / "current.json",
    REPO_ROOT / "src" / "i18n" / "vi.json",
    REPO_ROOT / "src" / "i18n" / "en.json",
]


APP_DIRS = ("ecodata", "ecolab", "ecolit", "pdfhub", "keywords")


def collect_relative_docs(root: pathlib.Path) -> set[str]:
    if not root.is_dir():
        return set()
    results: set[str] = set()
    for app in APP_DIRS:
        app_dir = root / app
        if app_dir.is_dir():
            for p in app_dir.rglob("*"):
                if p.is_file() and p.suffix.lower() in {".md", ".mdx"}:
                    results.add(p.relative_to(root).as_posix())
    return results


def main() -> int:
    start = time.perf_counter()
    errors: list[str] = []

    vi_docs = collect_relative_docs(VI_ROOT)
    en_docs = collect_relative_docs(EN_ROOT)

    missing_in_en = sorted(vi_docs - en_docs)
    missing_in_vi = sorted(en_docs - vi_docs)

    for rel in missing_in_en:
        errors.append(f"Missing English translation in i18n/en/.../current/: {rel}")
    for rel in missing_in_vi:
        errors.append(f"Orphan English file missing in docs/: {rel}")

    # Validate JSON translation catalogs
    parsed_jsons: dict[str, dict] = {}
    for jpath in JSON_CATALOGS:
        rel_name = jpath.relative_to(REPO_ROOT).as_posix()
        if not jpath.is_file():
            errors.append(f"Missing translation catalog: {rel_name}")
            continue
        try:
            data = json.loads(jpath.read_text(encoding="utf-8"))
            if not isinstance(data, dict) or len(data) == 0:
                errors.append(f"Empty or non-object JSON catalog: {rel_name}")
            parsed_jsons[rel_name] = data
        except Exception as exc:
            errors.append(f"Invalid JSON syntax in {rel_name}: {exc}")

    # Check key parity between src/i18n/vi.json and src/i18n/en.json
    if "src/i18n/vi.json" in parsed_jsons and "src/i18n/en.json" in parsed_jsons:
        vi_keys = set(parsed_jsons["src/i18n/vi.json"].keys())
        en_keys = set(parsed_jsons["src/i18n/en.json"].keys())
        diff_keys = vi_keys ^ en_keys
        if diff_keys:
            errors.append(f"Key mismatch between src/i18n/vi.json and src/i18n/en.json: {sorted(diff_keys)[:5]}")

    elapsed_ms = (time.perf_counter() - start) * 1000.0
    print(
        f"[BENCHMARK] i18n-bilingual-sync: compared {len(vi_docs)} VI docs vs {len(en_docs)} EN docs and {len(JSON_CATALOGS)} JSON catalogs in {elapsed_ms:.2f} ms (threshold: 500.00 ms)"
    )

    if errors or len(vi_docs) == 0 or elapsed_ms > 500.0:
        for err in errors[:20]:
            print(f"[FAIL] {err}", file=sys.stderr)
        if elapsed_ms > 500.0:
            print(f"[FAIL] Execution time {elapsed_ms:.2f} ms exceeded 500 ms threshold!", file=sys.stderr)
        return 1

    print("[PASS] 100% bilingual 1:1 file parity and JSON translation catalogs verified.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
