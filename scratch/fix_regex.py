# Replace the literal control/zero-width-char regexes in buildIeltsRoadmap.js with
# \u escapes (lint no-irregular-whitespace / no-control-regex safe). Run once.
p = 'src/data/buildIeltsRoadmap.js'
s = open(p, encoding='utf-8').read()

i = s.index("function stripJunk(s) {")
j = s.index("\n}", i) + 2
strip_new = (
    "function stripJunk(s) {\n"
    "  return String(s || '')\n"
    "    .replace(/[\\u2400-\\u243F]/g, '')\n"
    "    // eslint-disable-next-line no-control-regex -- intentionally stripping control chars\n"
    "    .replace(/[\\u0000-\\u001F\\u0080-\\u009F]/g, '')\n"
    "    .replace(/[\\u200B-\\u200F\\uFEFF]/g, '')\n"
    "    .replace(/\\s+/g, ' ')\n"
    "    .trim();\n"
    "}"
)
s = s[:i] + strip_new + s[j:]

i = s.index("function normVi(s) {")
j = s.index("\n}", i) + 2
norm_new = (
    "function normVi(s) {\n"
    "  return stripJunk(s).toLowerCase()\n"
    "    .normalize('NFD').replace(/[\\u0300-\\u036F]/g, '')\n"
    "    .replace(/\\u0111/g, 'd')\n"
    "    .replace(/[^a-z0-9\\s]/g, ' ')\n"
    "    .replace(/\\s+/g, ' ').trim();\n"
    "}"
)
s = s[:i] + norm_new + s[j:]

open(p, 'w', encoding='utf-8', newline='').write(s)

chk = open(p, encoding='utf-8').read()
out = []
out.append('has \\u200B escape: %s' % ('\\u200B' in chk))
out.append('has \\u0300 escape: %s' % ('\\u0300' in chk))
out.append('has \\u0111 escape: %s' % ('\\u0111' in chk))
out.append('literal U+2400 gone: %s' % ('␀' not in chk))
open('scratch/patchcheck.txt', 'w', encoding='utf-8').write('\n'.join(out))
