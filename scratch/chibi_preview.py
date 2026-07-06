# Emit a standalone SVG previewing all chibi animals (idle + happy), mirroring the
# shapes in ChibiAnimals.jsx, so we can rasterize with Inkscape and eyeball cuteness.
INK = '#1f2937'
OUT = 'stroke="#0f172a" stroke-width="3" stroke-linejoin="round"'

def eyes(happy, y=49, dx=11):
    if happy:
        return (f'<g fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round">'
                f'<path d="M {50-dx-5} {y+1} Q {50-dx} {y-6} {50-dx+5} {y+1}"/>'
                f'<path d="M {50+dx-5} {y+1} Q {50+dx} {y-6} {50+dx+5} {y+1}"/></g>')
    return (f'<ellipse cx="{50-dx}" cy="{y}" rx="5" ry="6.4" fill="{INK}"/>'
            f'<ellipse cx="{50+dx}" cy="{y}" rx="5" ry="6.4" fill="{INK}"/>'
            f'<circle cx="{50-dx+1.7}" cy="{y-2.6}" r="1.9" fill="#fff"/>'
            f'<circle cx="{50+dx+1.7}" cy="{y-2.6}" r="1.9" fill="#fff"/>')

def blush(y=55, dx=20, color='#fb7185'):
    return (f'<g fill="{color}" opacity="0.55"><ellipse cx="{50-dx}" cy="{y}" rx="5.5" ry="3.3"/>'
            f'<ellipse cx="{50+dx}" cy="{y}" rx="5.5" ry="3.3"/></g>')

def smile(y=58, w=5):
    return f'<path d="M {50-w} {y} Q 50 {y+5} {50+w} {y}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>'

def fox(h):
    return (f'<path d="M22 20 L34 40 L14 38 Z" fill="#f97316" {OUT}/><path d="M78 20 L66 40 L86 38 Z" fill="#f97316" {OUT}/>'
            f'<path d="M26 24 L33 38 L20 36 Z" fill="#ffe4c4"/><path d="M74 24 L67 38 L80 36 Z" fill="#ffe4c4"/>'
            f'<circle cx="50" cy="50" r="30" fill="#f97316" {OUT}/>'
            f'<path d="M50 40 Q34 46 40 62 Q50 72 60 62 Q66 46 50 40 Z" fill="#fff7ed"/>'
            f'{blush(color="#f43f5e")}{eyes(h)}<ellipse cx="50" cy="57" rx="3" ry="2.2" fill="{INK}"/>{smile()}')

def cat(h):
    return (f'<path d="M24 18 L36 40 L16 36 Z" fill="#a3b3c9" {OUT}/><path d="M76 18 L64 40 L84 36 Z" fill="#a3b3c9" {OUT}/>'
            f'<path d="M27 22 L34 37 L22 34 Z" fill="#fbcfe8"/><path d="M73 22 L66 37 L78 34 Z" fill="#fbcfe8"/>'
            f'<circle cx="50" cy="50" r="30" fill="#b9c6d8" {OUT}/>{blush(color="#f472b6")}{eyes(h)}'
            f'<path d="M50 55 l-3 3 h6 Z" fill="#f472b6"/>{smile(60)}'
            f'<g stroke="{INK}" stroke-width="1.6" stroke-linecap="round"><path d="M30 56 h-12"/><path d="M30 60 h-11"/><path d="M70 56 h12"/><path d="M70 60 h11"/></g>')

def panda(h):
    eye = ('<g fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M33 50 Q38 45 43 50"/><path d="M57 50 Q62 45 67 50"/></g>'
           if h else '<circle cx="39" cy="50" r="3.2" fill="#fff"/><circle cx="63" cy="50" r="3.2" fill="#fff"/>')
    return (f'<circle cx="28" cy="26" r="10" fill="{INK}" {OUT}/><circle cx="72" cy="26" r="10" fill="{INK}" {OUT}/>'
            f'<circle cx="50" cy="52" r="30" fill="#ffffff" {OUT}/>'
            f'<ellipse cx="38" cy="50" rx="8" ry="10" fill="{INK}"/><ellipse cx="62" cy="50" rx="8" ry="10" fill="{INK}"/>'
            f'{eye}{blush(60,21)}<ellipse cx="50" cy="59" rx="3" ry="2.2" fill="{INK}"/>{smile(63)}')

def bunny(h):
    return (f'<ellipse cx="40" cy="20" rx="7" ry="18" fill="#ffffff" {OUT}/><ellipse cx="60" cy="20" rx="7" ry="18" fill="#ffffff" {OUT}/>'
            f'<ellipse cx="40" cy="20" rx="3.4" ry="12" fill="#fbcfe8"/><ellipse cx="60" cy="20" rx="3.4" ry="12" fill="#fbcfe8"/>'
            f'<circle cx="50" cy="52" r="29" fill="#ffffff" {OUT}/>{blush()}{eyes(h)}'
            f'<path d="M50 55 l-2.6 2.6 h5.2 Z" fill="#fb7185"/>{smile(61)}')

def penguin(h):
    return (f'<ellipse cx="50" cy="52" rx="30" ry="32" fill="#1f2937" {OUT}/><ellipse cx="50" cy="56" rx="20" ry="24" fill="#ffffff"/>'
            f'{eyes(h,46,9)}<path d="M44 54 L56 54 L50 62 Z" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>'
            f'{blush(54,24)}<ellipse cx="40" cy="84" rx="7" ry="4" fill="#f59e0b" {OUT}/><ellipse cx="60" cy="84" rx="7" ry="4" fill="#f59e0b" {OUT}/>')

def chick(h):
    return (f'<path d="M50 16 l-3 6 h6 Z" fill="#fb923c"/><circle cx="50" cy="52" r="31" fill="#fde047" {OUT}/>'
            f'{blush()}{eyes(h)}<path d="M44 56 L56 56 L50 63 Z" fill="#fb923c" stroke="#c2410c" stroke-width="1.4"/>'
            f'<path d="M22 74 q6 6 12 2" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>'
            f'<path d="M78 74 q-6 6 -12 2" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>')

ANIMALS = [('fox', '#ffedd5', fox), ('cat', '#f1f5f9', cat), ('panda', '#e0f2fe', panda),
           ('bunny', '#fce7f3', bunny), ('penguin', '#cffafe', penguin), ('chick', '#fef9c3', chick)]

def cell(name, disc, fn, happy):
    inner = (f'<ellipse cx="50" cy="93" rx="26" ry="4" fill="#0f172a" opacity="0.12"/>'
             f'<circle cx="50" cy="54" r="45" fill="{disc}" stroke="#0f172a" stroke-width="3.5"/>{fn(happy)}')
    return inner

W = 120
rows = []
for ri, happy in enumerate([False, True]):
    for ci, (name, disc, fn) in enumerate(ANIMALS):
        x, y = ci * W + 10, ri * (W + 24) + 10
        rows.append(f'<g transform="translate({x},{y})">{cell(name, disc, fn, happy)}</g>')
        rows.append(f'<text x="{x+50}" y="{y+112}" font-family="sans-serif" font-size="9" font-weight="700" text-anchor="middle" fill="#334155">{name} {"happy" if happy else "idle"}</text>')

svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W*len(ANIMALS)+20}" height="{2*(W+24)+30}" '
       f'viewBox="0 0 {W*len(ANIMALS)+20} {2*(W+24)+30}"><rect width="100%" height="100%" fill="#f8fafc"/>' + ''.join(rows) + '</svg>')
open('scratch/chibi_preview.svg', 'w', encoding='utf-8').write(svg)
print('wrote scratch/chibi_preview.svg')
