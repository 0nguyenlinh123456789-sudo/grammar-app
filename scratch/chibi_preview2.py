# Iterate cute full-body chibi animals (fluffy kawaii style) as standalone SVG,
# rasterize with Inkscape, eyeball, refine — then port shapes to ChibiAnimals.jsx.
OUT = 'stroke="#8a6650" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"'
EYE = '#4a3228'

def eyes(happy, cy=53, dx=13):
    if happy:
        return (f'<g fill="none" stroke="{EYE}" stroke-width="3" stroke-linecap="round">'
                f'<path d="M {50-dx-5} {cy} Q {50-dx} {cy-7} {50-dx+5} {cy}"/>'
                f'<path d="M {50+dx-5} {cy} Q {50+dx} {cy-7} {50+dx+5} {cy}"/></g>')
    s = ''
    for ex in (50 - dx, 50 + dx):
        s += (f'<ellipse cx="{ex}" cy="{cy}" rx="6.6" ry="8.2" fill="{EYE}"/>'
              f'<circle cx="{ex-2}" cy="{cy-3.2}" r="2.7" fill="#fff"/>'
              f'<circle cx="{ex+2.2}" cy="{cy+2.6}" r="1.3" fill="#fff"/>')
    return s

def blush(cy=62, dx=27):
    return (f'<g fill="#ffb3c1" opacity="0.75"><ellipse cx="{50-dx}" cy="{cy}" rx="6" ry="3.8"/>'
            f'<ellipse cx="{50+dx}" cy="{cy}" rx="6" ry="3.8"/></g>')

def catmouth(y=61):
    return (f'<path d="M50 {y} l-2.6 2.4 h5.2 Z" fill="#c98b7a"/>'
            f'<path d="M50 {y+2.4} q-3 3 -6 1" fill="none" stroke="{EYE}" stroke-width="1.8" stroke-linecap="round"/>'
            f'<path d="M50 {y+2.4} q3 3 6 1" fill="none" stroke="{EYE}" stroke-width="1.8" stroke-linecap="round"/>')

def smile(y=62, w=4):
    return f'<path d="M {50-w} {y} Q 50 {y+4} {50+w} {y}" fill="none" stroke="{EYE}" stroke-width="2" stroke-linecap="round"/>'

BODY = 'M20 60 Q18 30 50 27 Q82 30 80 60 Q80 87 50 88 Q20 87 20 60 Z'  # round fluffy body

def clip(cid):
    return f'<clipPath id="{cid}"><path d="{BODY}"/></clipPath>'

def cat(h, cid):
    return (clip(cid) +
        # ears
        '<path d="M25 34 L30 12 L45 28 Z" fill="#fffaf4" ' + OUT + '/>'
        '<path d="M75 34 L70 12 L55 28 Z" fill="#f4c88a" ' + OUT + '/>'
        '<path d="M29 30 L32 19 L39 27 Z" fill="#f7b3c2"/><path d="M71 30 L68 19 L61 27 Z" fill="#f7b3c2"/>'
        # tail
        '<path d="M80 70 Q95 66 92 50 Q90 44 86 48 Q89 60 78 62 Z" fill="#f4c88a" ' + OUT + '/>'
        f'<path d="{BODY}" fill="#fffaf4" {OUT}/>'
        # calico patches (clipped to body)
        f'<g clip-path="url(#{cid})"><path d="M55 24 Q84 26 84 52 Q72 40 55 42 Z" fill="#f4c88a"/>'
        '<ellipse cx="72" cy="76" rx="15" ry="12" fill="#f4c88a"/></g>'
        # feet
        '<ellipse cx="38" cy="86" rx="9" ry="6" fill="#fffaf4" ' + OUT + '/><ellipse cx="62" cy="86" rx="9" ry="6" fill="#fffaf4" ' + OUT + '/>'
        + eyes(h) + blush() + catmouth() +
        '<g stroke="' + EYE + '" stroke-width="1.4" stroke-linecap="round" opacity="0.8"><path d="M22 60 h-9"/><path d="M22 64 h-8"/><path d="M78 60 h9"/><path d="M78 64 h8"/></g>')

def hamster(h, cid):
    return (clip(cid) +
        '<ellipse cx="30" cy="30" rx="9" ry="9" fill="#e59a5e" ' + OUT + '/><ellipse cx="70" cy="30" rx="9" ry="9" fill="#e59a5e" ' + OUT + '/>'
        '<ellipse cx="30" cy="30" rx="4.5" ry="4.5" fill="#f7b3c2"/><ellipse cx="70" cy="30" rx="4.5" ry="4.5" fill="#f7b3c2"/>'
        f'<path d="{BODY}" fill="#e59a5e" {OUT}/>'
        f'<g clip-path="url(#{cid})"><path d="M50 44 Q26 46 24 72 Q24 90 50 90 Q76 90 76 72 Q74 46 50 44 Z" fill="#fdf3e7"/></g>'
        '<ellipse cx="41" cy="82" rx="7" ry="8" fill="#f7b3c2" ' + OUT + '/><ellipse cx="59" cy="82" rx="7" ry="8" fill="#f7b3c2" ' + OUT + '/>'
        + eyes(h) + blush() +
        '<path d="M50 60 l-2.4 2.2 h4.8 Z" fill="#7a5240"/>' + smile(64, 3))

def bear(h, cid):
    return (
        '<ellipse cx="27" cy="30" rx="11" ry="11" fill="#b07b4f" ' + OUT + '/><ellipse cx="73" cy="30" rx="11" ry="11" fill="#b07b4f" ' + OUT + '/>'
        '<ellipse cx="27" cy="30" rx="5.5" ry="5.5" fill="#e7b98f"/><ellipse cx="73" cy="30" rx="5.5" ry="5.5" fill="#e7b98f"/>'
        f'<path d="{BODY}" fill="#b07b4f" {OUT}/>'
        '<ellipse cx="50" cy="64" rx="17" ry="14" fill="#e7b98f"/>'
        '<ellipse cx="38" cy="86" rx="9" ry="6" fill="#b07b4f" ' + OUT + '/><ellipse cx="62" cy="86" rx="9" ry="6" fill="#b07b4f" ' + OUT + '/>'
        + eyes(h) + blush() +
        '<ellipse cx="50" cy="60" rx="3.4" ry="2.6" fill="#5b3a26"/>' + smile(65, 4))

def bunny(h, cid):
    return (
        '<ellipse cx="40" cy="20" rx="7.5" ry="19" fill="#fffdfb" ' + OUT + '/><ellipse cx="60" cy="20" rx="7.5" ry="19" fill="#fffdfb" ' + OUT + '/>'
        '<ellipse cx="40" cy="21" rx="3.6" ry="13" fill="#f7b3c2"/><ellipse cx="60" cy="21" rx="3.6" ry="13" fill="#f7b3c2"/>'
        f'<path d="{BODY}" fill="#fffdfb" {OUT}/>'
        '<ellipse cx="38" cy="86" rx="9" ry="6" fill="#fffdfb" ' + OUT + '/><ellipse cx="62" cy="86" rx="9" ry="6" fill="#fffdfb" ' + OUT + '/>'
        + eyes(h) + blush() +
        '<path d="M50 59 l-2.2 2 h4.4 Z" fill="#f39bb0"/>' + smile(63, 3) +
        # bow
        '<path d="M50 40 L40 34 L40 46 Z" fill="#f7a8bd" ' + OUT + '/><path d="M50 40 L60 34 L60 46 Z" fill="#f7a8bd" ' + OUT + '/><circle cx="50" cy="40" r="3.2" fill="#ec8aa6" ' + OUT + '/>')

def chick(h, cid):
    return (
        f'<path d="{BODY}" fill="#ffe06b" {OUT}/>'
        '<path d="M50 22 q-4 -7 -8 -2 q0 5 8 5 Z" fill="#f6a13c"/>'
        '<ellipse cx="34" cy="88" rx="7" ry="4.5" fill="#f6a13c" ' + OUT + '/><ellipse cx="66" cy="88" rx="7" ry="4.5" fill="#f6a13c" ' + OUT + '/>'
        '<path d="M14 58 q-5 4 -2 9 q6 0 8 -5 Z" fill="#ffd84d" ' + OUT + '/><path d="M86 58 q5 4 2 9 q-6 0 -8 -5 Z" fill="#ffd84d" ' + OUT + '/>'
        + eyes(h) + blush() +
        '<path d="M44 59 L56 59 L50 66 Z" fill="#f6a13c" stroke="#c2410c" stroke-width="1.2"/>')

def cow(h, cid):
    return (clip(cid) +
        '<path d="M24 32 L20 14 L40 26 Z" fill="#fff" ' + OUT + '/><path d="M76 32 L80 14 L60 26 Z" fill="#fff" ' + OUT + '/>'
        # horns
        '<path d="M36 20 q-4 -8 2 -9 q3 4 1 9 Z" fill="#f4d9a6" ' + OUT + '/><path d="M64 20 q4 -8 -2 -9 q-3 4 -1 9 Z" fill="#f4d9a6" ' + OUT + '/>'
        f'<path d="{BODY}" fill="#ffffff" {OUT}/>'
        f'<g clip-path="url(#{cid})"><ellipse cx="30" cy="42" rx="10" ry="9" fill="#3a3a3a"/><ellipse cx="72" cy="70" rx="13" ry="11" fill="#3a3a3a"/></g>'
        '<ellipse cx="50" cy="66" rx="15" ry="11" fill="#f7b8c4"/>'
        '<ellipse cx="38" cy="86" rx="9" ry="6" fill="#fff" ' + OUT + '/><ellipse cx="62" cy="86" rx="9" ry="6" fill="#fff" ' + OUT + '/>'
        + eyes(h) +
        '<ellipse cx="44" cy="66" rx="2" ry="2.4" fill="#b06b7a"/><ellipse cx="56" cy="66" rx="2" ry="2.4" fill="#b06b7a"/>')

def bee(h, cid):
    return (clip(cid) +
        '<path d="M40 20 q-8 -10 -12 -2 q4 4 10 4" fill="none" stroke="' + EYE + '" stroke-width="2"/><circle cx="27" cy="16" r="3" fill="#3a3a3a"/>'
        '<path d="M60 20 q8 -10 12 -2 q-4 4 -10 4" fill="none" stroke="' + EYE + '" stroke-width="2"/><circle cx="73" cy="16" r="3" fill="#3a3a3a"/>'
        # wings
        '<ellipse cx="24" cy="46" rx="12" ry="16" fill="#dff1fb" ' + OUT + ' opacity="0.9"/><ellipse cx="76" cy="46" rx="12" ry="16" fill="#dff1fb" ' + OUT + ' opacity="0.9"/>'
        f'<path d="{BODY}" fill="#ffd54a" {OUT}/>'
        f'<g clip-path="url(#{cid})"><path d="M20 50 h60 v9 h-60 Z" fill="#3a3a3a"/><path d="M20 68 h60 v9 h-60 Z" fill="#3a3a3a"/></g>'
        + eyes(h) + blush() + smile(60, 4))

def sheep(h, cid):
    fluff = ''
    import math
    for i in range(10):
        a = math.pi * (0.08 + 0.84 * i / 9)
        cx = 50 - math.cos(a) * 33
        cy = 55 - math.sin(a) * 33
        fluff += f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="9" fill="#f5f5f7" {OUT}/>'
    return (fluff +
        '<circle cx="50" cy="58" r="26" fill="#fbeee6" ' + OUT + '/>'
        '<ellipse cx="34" cy="46" rx="6" ry="8" fill="#e8d7cc" ' + OUT + '/><ellipse cx="66" cy="46" rx="6" ry="8" fill="#e8d7cc" ' + OUT + '/>'
        '<ellipse cx="38" cy="86" rx="7" ry="6" fill="#8a6650"/><ellipse cx="62" cy="86" rx="7" ry="6" fill="#8a6650"/>'
        + eyes(h, 56, 11) + blush(64, 22) +
        '<path d="M50 62 l-2 1.8 h4 Z" fill="#8a6650"/>' + smile(66, 3))

ANIMALS = [('cat', cat), ('hamster', hamster), ('bear', bear), ('bunny', bunny),
           ('chick', chick), ('cow', cow), ('bee', bee), ('sheep', sheep)]

W = 130
rows = []
for ri, happy in enumerate([False, True]):
    for ci, (name, fn) in enumerate(ANIMALS):
        x, y = ci * W + 12, ri * (W + 26) + 12
        rows.append(f'<g transform="translate({x},{y})"><ellipse cx="50" cy="92" rx="30" ry="5" fill="#000" opacity="0.10"/>{fn(happy, name+str(ri))}</g>')
        rows.append(f'<text x="{x+50}" y="{y+112}" font-family="sans-serif" font-size="9" font-weight="700" text-anchor="middle" fill="#334155">{name} {"happy" if happy else "idle"}</text>')

svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W*len(ANIMALS)+24}" height="{2*(W+26)+30}" '
       f'viewBox="0 0 {W*len(ANIMALS)+24} {2*(W+26)+30}"><rect width="100%" height="100%" fill="#f8fafc"/>' + ''.join(rows) + '</svg>')
open('scratch/chibi_preview2.svg', 'w', encoding='utf-8').write(svg)
print('wrote scratch/chibi_preview2.svg')
