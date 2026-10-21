#!/usr/bin/env python3
"""Build a structural line-number index for the cached EHDS regulation text.

Scans the centered CHAPTER / SECTION / Article headings in
assets/cache/ehds-regulation-2025-327.txt and writes assets/cache/index.md
mapping each heading (with its title) to the line number in the .txt file.
Deterministic, offline, no dependencies beyond the Python standard library.
"""
from __future__ import annotations

import re
from pathlib import Path

CACHE = Path(__file__).resolve().parent.parent / "assets" / "cache"
SRC = CACHE / "ehds-regulation-2025-327.txt"
OUT = CACHE / "index.md"

# Centered headings: deeply indented and alone on the line.
CHAPTER = re.compile(r"^\s{6,}CHAPTER\s+([IVXLC]+)\s*$")
SECTION = re.compile(r"^\s{6,}SECTION\s+(\d+)\s*$")
ARTICLE = re.compile(r"^\s{6,}Article\s+(\d+)\s*$")


def next_title(lines: list[str], i: int) -> str:
    """Return the first non-empty line after index i (the heading's title)."""
    for line in lines[i + 1 : i + 6]:
        t = line.strip()
        if t:
            return t
    return ""


def main() -> None:
    # Split on \n only so line numbers match sed/grep/read_file. Do NOT use
    # str.splitlines(), which also breaks on the PDF's form-feed page markers.
    lines = SRC.read_text(encoding="utf-8").split("\n")
    rows: list[str] = []
    first_chapter_line = None

    for i, line in enumerate(lines):
        lineno = i + 1
        if m := CHAPTER.match(line):
            if first_chapter_line is None:
                first_chapter_line = lineno
            rows.append(f"| **CHAPTER {m.group(1)}** | {next_title(lines, i)} | {lineno} |")
        elif m := SECTION.match(line):
            rows.append(f"| &nbsp;&nbsp;SECTION {m.group(1)} | {next_title(lines, i)} | {lineno} |")
        elif m := ARTICLE.match(line):
            rows.append(f"| Article {m.group(1)} | {next_title(lines, i)} | {lineno} |")

    header = [
        "# EHDS Regulation — Structural Index",
        "",
        "Line numbers refer to [ehds-regulation-2025-327.txt](./ehds-regulation-2025-327.txt).",
        "Jump to a heading's line, then read the following lines to quote and cite the provision.",
        "",
        f"Recitals (preamble) precede CHAPTER I, i.e. before line {first_chapter_line}.",
        "",
        "| Division | Title | Line |",
        "| --- | --- | --- |",
    ]
    OUT.write_text("\n".join(header + rows) + "\n", encoding="utf-8")
    print(f"Wrote {OUT} with {len(rows)} entries.")


if __name__ == "__main__":
    main()
