#!/usr/bin/env python3
# Extract the IELTS foundation zip into public/ielts-foundation, preserving the
# correct UTF-8 filenames (the archive sets the UTF-8 flag, so zipfile decodes
# names correctly). Optional substring filter for piloting a single lesson.
import sys, zipfile, os

ZIP = r"D:/1. IELTS NỀN TẢNG.zip"
DEST = r"D:/HocCode/grammar-app/public/ielts-foundation"
substr = sys.argv[1] if len(sys.argv) > 1 else None

z = zipfile.ZipFile(ZIP)
n = 0
total = 0
for zi in z.infolist():
    if zi.is_dir():
        continue
    name = zi.filename
    if substr and substr not in name:
        continue
    z.extract(zi, DEST)
    n += 1
    total += zi.file_size
    if n % 50 == 0:
        sys.stdout.buffer.write(f"  ...{n} files\n".encode("utf-8"))
        sys.stdout.flush()

sys.stdout.buffer.write(f"DONE: {n} files, {total/1024/1024:.1f} MB\n".encode("utf-8"))
