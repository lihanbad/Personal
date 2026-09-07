#!/usr/bin/env python3
"""Regenerate notes-data.js from the /notes folder.

The notebook uses inline note text so it still works when opened
directly from disk (file://) where the browser blocks fetch().

Usage:
    python3 build_notes_data.py
"""
import json
import pathlib

NOTES_DIR = pathlib.Path(__file__).resolve().parent / "notes"
OUT_FILE = pathlib.Path(__file__).resolve().parent / "notes-data.js"

notes = {}
for p in sorted(NOTES_DIR.glob("*.md")):
    notes[p.name] = p.read_text(encoding="utf-8")

data = json.dumps(notes, ensure_ascii=False, separators=(",", ":"))
out = (
    "// AUTO-GENERATED from /notes -- run: python3 build_notes_data.py\n"
    "// Provides inline note text so the notebook works even when\n"
    "// opened from disk (file://) where fetch() is blocked.\n"
    "window.NOTES_DATA = " + data + ";\n"
)
OUT_FILE.write_text(out, encoding="utf-8")
print(f"generated {OUT_FILE.name} with {len(notes)} notes, {len(out)} bytes")