#!/usr/bin/env python3
"""Verify local Nginx configuration syntax ($uri preservation, balanced braces) and VPS isolation governance docs."""

import pathlib
import sys
import time

REPO_ROOT = pathlib.Path(__file__).resolve().parents[4]
NGINX_CONF = REPO_ROOT / "default.conf"
VPS_CONTEXT_DOC = REPO_ROOT / "readme" / "ai" / "vps-app-context.md"
PROTECTED_DOMAINS = [
    "docs.tnsai.vn",
    "ecodata.tnsai.vn",
    "pdfhub.tnsai.vn",
    "ecolab.io.vn",
    "ecolit.io.vn",
    "keywords.tnsai.vn",
    "bodulieu.tnsai.vn",
    "vietlod.tnsai.vn",
]


def main() -> int:
    start = time.perf_counter()
    errors: list[str] = []

    if not NGINX_CONF.is_file():
        errors.append("Missing default.conf Nginx configuration at repository root.")
    else:
        conf_text = NGINX_CONF.read_text(encoding="utf-8", errors="ignore")
        # 1. Check balanced curly braces
        open_braces = conf_text.count("{")
        close_braces = conf_text.count("}")
        if open_braces != close_braces or open_braces == 0:
            errors.append(f"Unbalanced curly braces in default.conf: '{{'={open_braces}, '}}'={close_braces}")
        # 2. Ensure $uri variable was not stripped by PowerShell interpolation
        if "try_files" in conf_text and "$uri" not in conf_text:
            errors.append("Critical: 'try_files' directive in default.conf is missing '$uri' variable!")

    if not VPS_CONTEXT_DOC.is_file():
        errors.append("Missing readme/ai/vps-app-context.md")
    else:
        ctx_text = VPS_CONTEXT_DOC.read_text(encoding="utf-8", errors="ignore")
        for dom in PROTECTED_DOMAINS:
            if dom not in ctx_text:
                errors.append(f"vps-app-context.md missing isolation mapping for domain: {dom}")

    elapsed_ms = (time.perf_counter() - start) * 1000.0
    print(
        f"[BENCHMARK] vps-nginx-isolation: audited default.conf and {len(PROTECTED_DOMAINS)} multi-app VPS domain mappings in {elapsed_ms:.2f} ms (threshold: 500.00 ms)"
    )

    if errors or elapsed_ms > 500.0:
        for err in errors:
            print(f"[FAIL] {err}", file=sys.stderr)
        if elapsed_ms > 500.0:
            print(f"[FAIL] Execution time {elapsed_ms:.2f} ms exceeded 500 ms threshold!", file=sys.stderr)
        return 1

    print("[PASS] Nginx configuration integrity ($uri preserved, balanced blocks) and VPS isolation registry verified.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
