#!/usr/bin/env python3
"""Warn when tracked application source files exceed the recommended size."""

from pathlib import Path
import subprocess
import sys


LIMIT = 120
SOURCE_ROOTS = ("app", "api", "components", "data", "hooks", "lib", "store", "types")
SOURCE_SUFFIXES = {".ts", ".tsx", ".js", ".jsx"}
EXCLUDED_PARTS = {
    ".next",
    "__generated__",
    "build",
    "coverage",
    "dist",
    "generated",
    "node_modules",
    "out",
}


def main() -> int:
    result = subprocess.run(
        ["git", "ls-files", "-z", "--", *SOURCE_ROOTS],
        check=True,
        capture_output=True,
    )
    paths = (Path(item.decode()) for item in result.stdout.split(b"\0") if item)
    warnings = 0

    for path in paths:
        if path.suffix not in SOURCE_SUFFIXES:
            continue
        if any(part in EXCLUDED_PARTS for part in path.parts):
            continue
        if ".generated." in path.name or path.name.endswith(".g.ts"):
            continue

        line_count = len(path.read_bytes().splitlines())
        if line_count > LIMIT:
            print(f"WARNING: {path}: {line_count} physical lines (recommendation: {LIMIT})")
            warnings += 1

    if warnings:
        print(f"{warnings} source file(s) exceed the {LIMIT}-line recommendation; this is advisory.")
    else:
        print(f"All tracked application source files are at or below the {LIMIT}-line recommendation.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, subprocess.CalledProcessError) as error:
        print(f"Unable to check source line counts: {error}", file=sys.stderr)
        sys.exit(1)
