#!/usr/bin/env python3
"""Verify Markdown/MDX files across docs/ and i18n/en/ for balanced code fences, frontmatter, and LaTeX/Acorn safety."""

import pathlib
import re
import sys
import time

REPO_ROOT = pathlib.Path(__file__).resolve().parents[4]
DOC_ROOTS = [
    REPO_ROOT / "docs",
    REPO_ROOT / "i18n" / "en" / "docusaurus-plugin-content-docs" / "current",
]
FENCE_REGEX = re.compile(r"^\s*(`{3,}|~{3,})")
RAW_LATEX_OUTSIDE_MATH_REGEX = re.compile(r"\\(frac|sum|int|prod|sqrt|alpha|beta|gamma|sigma|theta|lambda)\s*\{")


def check_file(filepath: pathlib.Path) -> list[str]:
    issues: list[str] = []
    text = filepath.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()

    # Check YAML frontmatter if starts with ---
    if lines and lines[0].strip() == "---":
        closing_idx = None
        for idx in range(1, min(len(lines), 60)):
            if lines[idx].strip() == "---":
                closing_idx = idx
                break
        if closing_idx is None:
            issues.append(f"{filepath.relative_to(REPO_ROOT)}: Unclosed YAML frontmatter '---'")

    # Walk lines tracking code fences and display math blocks
    in_code_fence = False
    fence_marker = ""
    in_math_block = False

    for line_no, line in enumerate(lines, start=1):
        stripped = line.strip()
        fence_match = FENCE_REGEX.match(line)
        if fence_match:
            marker = fence_match.group(1)[:3]
            if not in_code_fence:
                in_code_fence = True
                fence_marker = marker
            elif marker == fence_marker:
                in_code_fence = False
                fence_marker = ""
            continue

        if in_code_fence:
            continue

        # Count $$ occurrences not escaped
        if stripped == "$$":
            in_math_block = not in_math_block
            continue
        elif "$$" in stripped:
            count_dd = stripped.count("$$")
            if count_dd % 2 == 1:
                in_math_block = not in_math_block
            continue

        if in_math_block:
            continue

        # Remove inline math $...$ and inline code `...` before checking for raw LaTeX
        cleaned = re.sub(r"`[^`]*`", "", line)
        cleaned = re.sub(r"\$[^$]+\$", "", cleaned)
        if RAW_LATEX_OUTSIDE_MATH_REGEX.search(cleaned):
            issues.append(
                f"{filepath.relative_to(REPO_ROOT)}:{line_no}: Raw LaTeX macro with braces outside math/code block"
            )

    if in_code_fence:
        issues.append(f"{filepath.relative_to(REPO_ROOT)}: Unclosed code fence block ({fence_marker})")
    if in_math_block:
        issues.append(f"{filepath.relative_to(REPO_ROOT)}: Unclosed display math block ($$)")

    return issues


def main() -> int:
    start = time.perf_counter()
    all_issues: list[str] = []
    file_count = 0

    for root in DOC_ROOTS:
        if not root.is_dir():
            all_issues.append(f"Missing documentation root directory: {root.relative_to(REPO_ROOT)}")
            continue
        for path in sorted(root.rglob("*")):
            if path.is_file() and path.suffix.lower() in {".md", ".mdx"}:
                file_count += 1
                all_issues.extend(check_file(path))

    elapsed_ms = (time.perf_counter() - start) * 1000.0
    print(
        f"[BENCHMARK] docusaurus-mdx-latex: audited {file_count} Markdown/MDX files in {elapsed_ms:.2f} ms (threshold: 2000.00 ms)"
    )

    if all_issues or file_count == 0 or elapsed_ms > 2000.0:
        for issue in all_issues[:20]:
            print(f"[FAIL] {issue}", file=sys.stderr)
        if file_count == 0:
            print("[FAIL] No Markdown/MDX files found to audit!", file=sys.stderr)
        if elapsed_ms > 2000.0:
            print(f"[FAIL] Execution time {elapsed_ms:.2f} ms exceeded 2000 ms threshold!", file=sys.stderr)
        return 1

    print("[PASS] All Markdown/MDX files passed frontmatter, code fence, and KaTeX/Acorn safety checks.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
