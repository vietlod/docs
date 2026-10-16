#!/usr/bin/env python3
"""Verify UI theme stylesheet (src/css/custom.css), React/SVG components in src/components/, and landing page."""

import pathlib
import sys
import time

REPO_ROOT = pathlib.Path(__file__).resolve().parents[4]
REQUIRED_UI_FILES = [
    "src/css/custom.css",
    "src/pages/index.js",
    "src/pages/index.module.css",
    "src/theme/MDXComponents.js",
    "src/components/EcoDataSvg/index.js",
    "src/components/EcoDataSvg/EconometricsPipelineSvg.jsx",
    "src/components/EcoDataSvg/McpServerFlowSvg.jsx",
    "src/components/EcoDataSvg/JevCoProcessorSvg.jsx",
]


def main() -> int:
    start = time.perf_counter()
    errors: list[str] = []

    for rel in REQUIRED_UI_FILES:
        if not (REPO_ROOT / rel).is_file():
            errors.append(f"Missing required UI/Theme component file: {rel}")

    css_files = list((REPO_ROOT / "src").rglob("*.css"))
    for css_file in css_files:
        text = css_file.read_text(encoding="utf-8", errors="ignore")
        # Strip CSS comments before counting braces
        clean_lines = []
        in_comment = False
        i = 0
        n = len(text)
        while i < n:
            if not in_comment and text[i : i + 2] == "/*":
                in_comment = True
                i += 2
            elif in_comment and text[i : i + 2] == "*/":
                in_comment = False
                i += 2
            else:
                if not in_comment:
                    clean_lines.append(text[i])
                i += 1
        cleaned = "".join(clean_lines)
        if cleaned.count("{") != cleaned.count("}"):
            errors.append(
                f"Unbalanced CSS braces in {css_file.relative_to(REPO_ROOT).as_posix()}: '{{'={cleaned.count('{')}, '}}'={cleaned.count('}')}"
            )

    custom_css = REPO_ROOT / "src" / "css" / "custom.css"
    if custom_css.is_file():
        css_text = custom_css.read_text(encoding="utf-8", errors="ignore")
        if "[data-theme='dark']" not in css_text and '[data-theme="dark"]' not in css_text:
            errors.append("src/css/custom.css missing dark mode selector [data-theme='dark']")

    elapsed_ms = (time.perf_counter() - start) * 1000.0
    print(
        f"[BENCHMARK] ui-theme-components: audited {len(REQUIRED_UI_FILES)} UI component entries and {len(css_files)} CSS stylesheets in {elapsed_ms:.2f} ms (threshold: 500.00 ms)"
    )

    if errors or len(css_files) == 0 or elapsed_ms > 500.0:
        for err in errors:
            print(f"[FAIL] {err}", file=sys.stderr)
        if elapsed_ms > 500.0:
            print(f"[FAIL] Execution time {elapsed_ms:.2f} ms exceeded 500 ms threshold!", file=sys.stderr)
        return 1

    print("[PASS] All UI theme stylesheets, Dark/Light tokens, and React/SVG components verified.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
