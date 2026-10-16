#!/usr/bin/env python3
"""Verify Sveltia CMS static configuration (static/admin/config.yml, index.html, logo.svg) and collection folders."""

import pathlib
import re
import sys
import time

REPO_ROOT = pathlib.Path(__file__).resolve().parents[4]
ADMIN_DIR = REPO_ROOT / "static" / "admin"
FOLDER_REGEX = re.compile(r'^\s*folder:\s*["\']?([^"\'\n#]+)["\']?', re.MULTILINE)
COLLECTION_NAME_REGEX = re.compile(r'^\s*-\s*name:\s*["\']?([^"\'\n#]+)["\']?', re.MULTILINE)


def main() -> int:
    start = time.perf_counter()
    errors: list[str] = []

    config_yml = ADMIN_DIR / "config.yml"
    index_html = ADMIN_DIR / "index.html"
    logo_svg = ADMIN_DIR / "logo.svg"

    for req_file in (config_yml, index_html, logo_svg):
        if not req_file.is_file():
            errors.append(f"Missing required Sveltia CMS file: {req_file.relative_to(REPO_ROOT).as_posix()}")

    folders: list[str] = []
    collection_names: list[str] = []

    if config_yml.is_file():
        cfg_text = config_yml.read_text(encoding="utf-8", errors="ignore")
        required_tokens = [
            "name: github",
            "repo: vietlod/docs",
            "branch: main",
            "base_url: https://docs.tnsai.vn",
            "auth_endpoint: oauth/auth",
            'media_folder: "static/img"',
        ]
        for token in required_tokens:
            if token not in cfg_text:
                errors.append(f"static/admin/config.yml missing required setting: '{token}'")

        folders = [m.strip() for m in FOLDER_REGEX.findall(cfg_text)]
        collection_names = [m.strip() for m in COLLECTION_NAME_REGEX.findall(cfg_text)]

        if len(set(collection_names)) != len(collection_names):
            errors.append("Duplicate collection names detected in static/admin/config.yml")

        for folder_rel in folders:
            target_dir = REPO_ROOT / folder_rel
            if not target_dir.is_dir():
                errors.append(f"Collection folder declared in config.yml does not exist: {folder_rel}")

    if index_html.is_file():
        html_text = index_html.read_text(encoding="utf-8", errors="ignore")
        if "sveltia-cms" not in html_text.lower():
            errors.append("static/admin/index.html does not reference sveltia-cms bundle")

    elapsed_ms = (time.perf_counter() - start) * 1000.0
    print(
        f"[BENCHMARK] sveltia-cms-workflow: verified {len(collection_names)} CMS collections and {len(folders)} target folders in {elapsed_ms:.2f} ms (threshold: 500.00 ms)"
    )

    if errors or len(folders) == 0 or elapsed_ms > 500.0:
        for err in errors:
            print(f"[FAIL] {err}", file=sys.stderr)
        if elapsed_ms > 500.0:
            print(f"[FAIL] Execution time {elapsed_ms:.2f} ms exceeded 500 ms threshold!", file=sys.stderr)
        return 1

    print("[PASS] Sveltia CMS config.yml, OAuth endpoints, and all collection folders verified.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
