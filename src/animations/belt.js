import { gsap } from 'gsap'

// The hero's background, modelled on how svz.io builds its hero.
//
//  - A belt of 19 large grey figures slides right to left at a constant pace in an 18 s loop. The second half of the belt
//    is an exact copy of the first, one period along (P), so the loop closes with no seam at all.
//  - The belt's keyframes play 1.8x slower than their frame count (600 frames over 18 s).
//  - Some figures animate: the cross spins, the post tips, the bowl hops, a bar shoots up, a half-disc topples onto its
//    edge and, as it lands, the block with the coral foot is knocked over and swings back.
//  - Two coral balls follow the reference's own scripted bounce paths: they hop along the floor, get launched by the rising
//    bar, arc over the figures and land again. A collision pass against the drawn figures nudges a ball out if it ever
//    overlaps one, so it never visibly passes through. They are elements above the headline with a difference blend, so
//    the type they cross inverts.
//
// Scene units: 1600 x 500, bottom-aligned in the hero and scaled to its width. Screen space is in px; velocities are px/tick.

const LOOP = 18, FPS = 60, STRETCH = 1.8
const P = 3239.251                       // the belt's exact repeat distance, in scene units
const TICK = 1000 / 60
const rad = (d) => (d * Math.PI) / 180
const lerp = (a, b, p) => a + (b - a) * p
const rnd = (a, b) => a + Math.random() * (b - a)

// ---- keyframes: [frame, value, outX, outY, inX, inY, hold?] (cubic-bezier easing per segment) ---------------------------
function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by
  const X = (t) => ((ax * t + bx) * t + cx) * t, Y = (t) => ((ay * t + by) * t + cy) * t, dX = (t) => (3 * ax * t + 2 * bx) * t + cx
  return (p) => { let t = p; for (let i = 0; i < 6; i++) { const d = dX(t); if (Math.abs(d) < 1e-6) break; t -= (X(t) - p) / d } return Y(Math.min(1, Math.max(0, t))) }
}
const track = (rows) => rows.map(([t, v, ox, oy, ix, iy, hold, to, ti]) => ({ t, v, hold, to, ti, ease: ox === undefined ? null : bezier(ox, oy, ix, iy) }))
function sample(kfs, t) {
  if (t <= kfs[0].t) return kfs[0].v
  const last = kfs[kfs.length - 1]
  if (t >= last.t) return last.v
  let i = 0; while (kfs[i + 1].t <= t) i++
  const a = kfs[i], b = kfs[i + 1]
  if (a.hold) return a.v
  const p = a.ease ? a.ease((t - a.t) / (b.t - a.t)) : (t - a.t) / (b.t - a.t)
  if (!Array.isArray(a.v)) return lerp(a.v, b.v, p)
  if (a.to && a.ti) { // positions travel along a curve: a cubic Bezier through the keyframe values and their tangent handles
    const q = 1 - p, w0 = q * q * q, w1 = 3 * q * q * p, w2 = 3 * q * p * p, w3 = p * p * p
    return a.v.map((x, k) => w0 * x + w1 * (x + a.to[k]) + w2 * (b.v[k] + a.ti[k]) + w3 * b.v[k])
  }
  return a.v.map((x, k) => lerp(x, b.v[k], p))
}

const ballA = track([
  [-1, [706.31, 86.53], .299, .691, .852, .764, 0, [0, 0], [0, 0]], [36, [816.31, 86.53], .172, .119, .833, .812, 0, [0, 0], [-3, -26]],
  [41.68, [836.31, 117.53], .167, .167, .833, .833, 0, [3, 26], [0, 0]], [58.27, [856.31, 271.53], .167, .167, .833, .833, 0, [0, 0], [43, -5]],
  [71.33, [728.31, 272.53], .167, .167, .833, .833, 0, [-43, 5], [2, -76]], [95.09, [657.96, 457], .167, .28, .71, 1, 0, [29.5, -51.5], [0, 0]],
  [118.67, [752.76, 455]]])
const ballB = track([
  [138.67, [1587, 184.78], .167, .167, .639, .591, 0, [0, 0], [0, 0]], [141.33, [1626.02, 194.41], .257, .395, .833, .854, 0, [0, 0], [-38.69, -75.69]],
  [168, [1765.33, 455.5], .167, .219, .833, .769, 0, [54.69, -53.31], [0, 0]], [184, [1870.18, 455.5], .417, .758, .833, .749, 0, [0, 0], [-166.22, 1]],
  [258.67, [2290.73, 455.5], .167, .071, .833, .879, 0, [49.22, 0], [-8.55, 67.55]], [277.33, [2341.22, 96.67], .167, .317, .666, .75, 0, [13.2, -34.77], [-35.66, -1.54]],
  [292, [2433.96, 48.06], .333, .252, .667, .693, 0, [12.49, 1.55], [-15.02, -2.03]], [298.67, [2476.34, 73.44], .336, .204, .833, .902, 0, [90.25, 15.77], [-115.11, -18.66]],
  [328, [2804.47, 128.99], .203, .155, .833, .912, 0, [38.73, 57.73], [0, 0]], [340, [2837.13, 226.7], .177, .096, .833, .881, 0, [0, 0], [78, -13.97]],
  [384, [2470.28, 290.06], .167, .106, .833, .887, 0, [-16, 35.97], [-2.12, -43]], [394.67, [2442.27, 385.52], .167, .12, .703, .746, 0, [49.91, 7.88], [-129.98, -19.45]],
  [429.33, [2746.97, 435.73], .444, .376, .833, .901, 0, [74.17, 21.45], [0, 0]], [448, [2913.18, 455.5], .167, .356, .667, .994, 0, [0, 0], [0, 0]],
  [472, [2853.18, 455.5]]])
// the animated pair, and their resting twins one period along (placed exactly on the start of each path, so the loop has no jump)
const balls = [{ p: ballA }, { x: 706.3 + P, y: 86.5 }, { p: ballB }, { x: 1587 + P, y: 184.8 }]
const kf = {
  semiY: track([[54.7, 500, .33, 0, .83, .83], [61.3, 493, .17, .17, .83, .83], [72, 500]]),
  semiR: track([[54.7, 0, .33, 0, .83, .83], [61.3, -16, .17, .17, .83, .83], [72, 0]]),
  treeR: track([[60, 0, .17, .24, .66, .94], [106.7, 13.2, .34, .03, .83, .83], [156, 38.5]]),
  windR: track([[184, 0, .6, 1.3, .81, 1], [373.3, -270]]),
  pushY: track([[260, 100, .17, .17, .83, .83], [270, 1108]]),
  fallP: track([[448, [2958.18, 500], .167, .167, .291, .291, 0, [14.51, 0], [-75.17, .9]], [481.33, [3043.66, 442], .326, .286, .7, .689, 0, [84.32, -1], [-16.58, 0]], [504, [3144.68, 499], 0, 0, 0, 0, true]]),
  fallA: track([[448, [.18, 373], .167, .167, .833, .833, 0, [14.49, -14.51], [-36.13, 36.16]], [481.33, [85.58, 287.52], .167, .167, .833, .833, 0, [41.3, -41.34], [-16.56, 16.58]], [504, [186.5, 186.5], 0, 0, 0, 0, true]]),
  fallR: track([[448, 0, .17, .17, .83, .83], [504, 90, 0, 0, 0, 0, true], [564, 90, .33, 0, .69, 1.31], [594, 71, 0, 0, 0, 0, true]]),
  pumpM: track([[512, 0, .167, .167, .833, .917], [542.67, 1, .167, .167, .833, .833], [574.67, 1, .167, .167, .833, .833], [596, 0]]), // 0 = relaxed, 1 = squeezed by the hit
  armR: track([[485.3, 0, .18, .14, .83, .89], [514, -69.1, .12, .68, 1, 1], [532, -74, .33, 0, .83, .87], [564, -20, .03, .06, .8, .89], [593, 0]]),
}

// ---- figure outlines (drawn) and convex parts (collided), about each figure's anchor; y is down -------------------------
const poly = (g, pts) => { g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath() }
const area = (v) => { let a = 0; for (let i = 0; i < v.length; i++) { const p = v[i], q = v[(i + 1) % v.length]; a += p[0] * q[1] - q[0] * p[1] } return a / 2 }
const ccw = (v) => (area(v) < 0 ? v.slice().reverse() : v)
const arcPts = (cx, cy, r, a0, a1, n) => Array.from({ length: n + 1 }, (_, k) => { const a = a0 + ((a1 - a0) * k) / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)] })
const ringQuads = (cx, cy, r0, r1, a0, a1, n) => { // a thick arc as n convex quads
  const o = arcPts(cx, cy, r1, a0, a1, n), i = arcPts(cx, cy, r0, a0, a1, n)
  return o.slice(0, n).map((_, k) => ccw([o[k], o[k + 1], i[k + 1], i[k]]))
}
const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]
const fill = (g, c) => { g.fillStyle = c }

const shapes = {
  semi: { // a half-ring bowl, opening upward, its lowest point on the anchor
    draw: (g, c) => { fill(g, c.fig); g.beginPath(); g.moveTo(-202.5, -202); g.arc(0, -202, 202.5, Math.PI, 0, true); g.lineTo(111.5, -202); g.arc(0, -202, 111, 0, Math.PI, false); g.closePath(); g.fill() },
    parts: ringQuads(0, -202, 111, 202.5, Math.PI, 0, 14) },
  tree: { // a post with a side arm
    draw: (g, c) => { fill(g, c.fig); poly(g, [[0, -410], [-90, -410], [-90, -336], [-237, -336], [-237, -246], [-90, -246], [-90, 0], [0, 0]]); g.fill() },
    parts: [ccw(rect(-90, -410, 90, 410)), ccw(rect(-237, -336, 147, 90))] },
  pump: { // a cone on the pole; when the swinging block hits the post its wide end squeezes in (m: 0 relaxed, 1 squeezed)
    draw: (g, c, m = 0) => { fill(g, c.fig); poly(g, [[-76, lerp(-76, -32, m)], [76, -15], [76, 19], [-76, lerp(76, 36, m)]]); g.fill() },
    parts: [ccw([[-76, -76], [76, -15], [76, 19], [-76, 76]])] },
  pole: { draw: (g, c) => { fill(g, c.fig); g.fillRect(-22.5, -205, 45, 410) }, parts: [ccw(rect(-22.5, -205, 45, 410))] },
  ramp: { // a rounded hook: stem, quarter-ring, and an arm
    draw: (g, c) => { fill(g, c.fig); g.beginPath(); g.moveTo(-122, 184); g.lineTo(-122, -14); g.arc(48, -14, 170, Math.PI, 1.5 * Math.PI); g.lineTo(122, -184); g.lineTo(122, -92); g.lineTo(48, -92)
      g.arc(48, -14, 78, 1.5 * Math.PI, Math.PI, true); g.lineTo(-30, 184); g.closePath(); g.fill() },
    parts: [...ringQuads(48, -14, 78, 170, Math.PI, 1.5 * Math.PI, 8), ccw(rect(-122, -14, 92, 198)), ccw(rect(48, -184, 74, 92))] },
  tri: { draw: (g, c) => { fill(g, c.fig); poly(g, [[0, -134], [155, 134], [-155, 134]]); g.fill() }, parts: [ccw([[0, -134], [155, 134], [-155, 134]])] },
  fall: { // a half-disc that pivots on its rounded edge
    draw: (g, c) => { fill(g, c.fig); g.beginPath(); g.arc(1.3, 186.6, 186.5, -Math.PI / 2, Math.PI / 2); g.closePath(); g.fill() },
    parts: [ccw(arcPts(1.3, 186.6, 186.5, -Math.PI / 2, Math.PI / 2, 12))] },
  slides: {
    draw: (g, c) => { fill(g, c.fig); for (const q of SLIDES) { poly(g, q); g.fill() } },
    parts: null },
  push: { draw: (g, c) => { fill(g, c.fig); g.fillRect(-46, -21, 92, 21) }, parts: [ccw(rect(-46, -21, 92, 21))] },
  windmill: { // a plus with a round hole, wound the other way so it punches through
    draw: (g, c) => { fill(g, c.fig); g.beginPath()
      ;[[-205, 45], [-205, -45], [-45, -45], [-45, -205], [45, -205], [45, -45], [205, -45], [205, 45], [45, 45], [45, 205], [-45, 205], [-45, 45]].forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)))
      g.closePath(); g.moveTo(45, 0); g.arc(0, 0, 45, 0, Math.PI * 2, true); g.fill() },
    parts: [ccw(rect(-205, -45, 410, 90)), ccw(rect(-45, -205, 90, 410))] },
  arm: { // a tall block pinned through its round hole, with the coral foot hanging below: it swings from the hole like a pendulum
    draw: (g, c) => { fill(g, c.fig); g.beginPath(); g.rect(-46, -47, 92, 310); g.moveTo(28, 2); g.arc(0, 2, 28, 0, Math.PI * 2, true); g.fill(); fill(g, c.page); g.fillRect(-46, 197, 92, 66) },
    parts: [ccw(rect(-46, -47, 92, 310))] },
}
const SLIDES = [[[-102, 15], [-99, 34], [210, -17], [206, -36]], [[101, 174], [98, 193], [-210, 142], [-207, 123]], [[101, -143], [98, -124], [-210, -175], [-207, -194]]]
shapes.slides.parts = SLIDES.map(ccw)

// Every first-copy figure has a twin exactly one period along, which is what makes the loop seamless.
const layers = [
  { s: 'arm', x: 78, y: 138 }, { s: 'pump', x: 381, y: 102 }, { s: 'pole', x: 381, y: 295 }, { s: 'ramp', x: 641, y: 316 },
  { s: 'semi', x: 994, y: 500, py: kf.semiY, r: kf.semiR }, { s: 'tree', x: 1372.5, y: 500, r: kf.treeR }, { s: 'tri', x: 1586.7, y: 366 },
  { s: 'windmill', x: 1967, y: 252, r: kf.windR }, { s: 'push', x: 2300, y: 522, sy: kf.pushY }, { s: 'slides', x: 2640, y: 307 },
  { s: 'fall', x: 3144.68 - P, y: 499, rot: 71, a0: [186.5, 186.5] }, { s: 'fall', p: kf.fallP, a: kf.fallA, r: kf.fallR },
  { s: 'arm', x: 78 + P, y: 138, r: kf.armR }, // both arms carry the coral foot, so it never pops at the loop point
  { s: 'pump', x: 381 + P, y: 102, m: kf.pumpM }, { s: 'pole', x: 381 + P, y: 295 }, { s: 'ramp', x: 641 + P, y: 316 },
  { s: 'semi', x: 994 + P, y: 500 }, { s: 'tree', x: 1372.5 + P, y: 500 }, { s: 'tri', x: 1586.7 + P, y: 366 },
]

export function mountBelt(hero, { animate = true } = {}) {
  const canvas = hero.querySelector('[data-belt]')
  if (!canvas) return () => {}
  const g = canvas.getContext('2d')
  let W = 0, H = 0, dpr = 1, S = 1, baseY = 0, xoff = 0, R = 40
  let sim = 0                                                  // loop clock, seconds
  const col = { fig: '#1d1c1d', page: '#dc1064' }

  const ballEls = balls.map(() => {
    const b = document.createElement('div')
    b.setAttribute('aria-hidden', 'true')
    b.className = 'pointer-events-none absolute left-0 top-0 z-[5] rounded-full bg-[var(--page)] [mix-blend-mode:difference] will-change-transform'
    hero.appendChild(b); return b
  })

  const size = () => {
    W = hero.clientWidth; H = hero.clientHeight; dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
    S = Math.max(W / 1600, (0.5 * H) / 500); xoff = (W - 1600 * S) / 2; baseY = H - 500 * S; R = 45 * S
    col.fig = getComputedStyle(document.documentElement).getPropertyValue('--color-fig').trim() || col.fig
    col.page = getComputedStyle(ballEls[0]).backgroundColor
    ballEls.forEach((b) => { b.style.width = b.style.height = `${90 * S}px` })
  }

  // a figure's place on screen at loop time t (t may be a hair negative, to measure velocity across the loop point)
  const state = (l, t) => {
    const f = (t * FPS) / STRETCH, belt = -P * (t / LOOP)
    const [cx, cy] = l.p ? sample(l.p, f) : [l.x, l.py ? sample(l.py, f) : l.y]
    const [ax, ay] = l.a ? sample(l.a, f) : l.a0 || [0, 0]
    return { x: (belt + cx) * S + xoff, y: baseY + cy * S, rot: rad(l.r ? sample(l.r, f) : l.rot || 0), sy: l.sy ? sample(l.sy, f) / 100 : 1, ax, ay, m: l.m ? sample(l.m, f) : 0 }
  }
  const world = (pt, st) => { // local point -> screen
    const c = Math.cos(st.rot), s = Math.sin(st.rot), lx = (pt[0] - st.ax) * S, ly = (pt[1] - st.ay) * S * st.sy
    return [st.x + lx * c - ly * s, st.y + lx * s + ly * c]
  }

  const draw = (t) => {
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H)
    for (const l of layers) {
      const st = state(l, t)
      if (st.x < -520 * S || st.x > W + 520 * S) continue
      g.save(); g.translate(st.x, st.y); g.rotate(st.rot); g.scale(S, S * st.sy); g.translate(-st.ax, -st.ay); shapes[l.s].draw(g, col, st.m); g.restore()
    }
  }

  // ---- the balls ------------------------------------------------------------------------------------------------------
  // closest-feature test of a circle against a CCW convex polygon: { n (polygon -> circle), pen } or null
  const hitPoly = (V, cx, cy) => {
    let maxSep = -Infinity, ei = 0
    const N = V.length
    for (let i = 0; i < N; i++) {
      const a = V[i], b = V[(i + 1) % N], ex = b[0] - a[0], ey = b[1] - a[1], l = Math.hypot(ex, ey) || 1
      const nx = ey / l, ny = -ex / l, sep = (cx - a[0]) * nx + (cy - a[1]) * ny
      if (sep > maxSep) { maxSep = sep; ei = i }
    }
    if (maxSep > R) return null
    if (maxSep < 0) { const a = V[ei], b = V[(ei + 1) % N], ex = b[0] - a[0], ey = b[1] - a[1], l = Math.hypot(ex, ey) || 1; return { n: [ey / l, -ex / l], pen: R - maxSep } }
    let q = null, dmin = Infinity
    for (let i = 0; i < N; i++) {
      const a = V[i], b = V[(i + 1) % N], abx = b[0] - a[0], aby = b[1] - a[1]
      const t = Math.max(0, Math.min(1, ((cx - a[0]) * abx + (cy - a[1]) * aby) / (abx * abx + aby * aby || 1)))
      const px = a[0] + abx * t, py = a[1] + aby * t, d = Math.hypot(cx - px, cy - py)
      if (d < dmin) { dmin = d; q = [px, py] }
    }
    if (dmin >= R || dmin === 0) return null
    return { n: [(cx - q[0]) / dmin, (cy - q[1]) / dmin], pen: R - dmin }
  }
  // where a ball is at loop time t: the reference's path, then pushed clear of any figure it would overlap
  const ballAt = (b, t, states) => {
    const f = (t * FPS) / STRETCH, belt = -P * (t / LOOP)
    const [cx, cy] = b.p ? sample(b.p, f) : [b.x, b.y]
    let x = (belt + cx) * S + xoff, y = baseY + cy * S
    for (let pass = 0; pass < 2; pass++) {
      for (let li = 0; li < layers.length; li++) {
        const st = states[li]
        if (st.x < x - 520 * S || st.x > x + 520 * S) continue
        for (const part of shapes[layers[li].s].parts) {
          const hit = hitPoly(part.map((pt) => world(pt, st)), x, y)
          if (hit && hit.pen > 0.5) { x += hit.n[0] * hit.pen; y += hit.n[1] * hit.pen }
        }
      }
    }
    return [x, y]
  }
  const frame = (t) => {
    draw(t)
    const states = layers.map((l) => state(l, t))
    balls.forEach((b, i) => { const [x, y] = ballAt(b, t, states); ballEls[i].style.transform = `translate3d(${x - R}px, ${y - R}px, 0)` })
  }

  const onTick = (_t, ms) => {
    if (!animate) return
    if (scrollY > innerHeight * 1.6) return                  // covered by the next sheet: stop spending frames
    sim = (sim + Math.min(ms, 50) / 1000) % LOOP
    frame(sim)
  }
  let rt
  const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { size(); frame(sim) }, 200) }

  size(); frame(0)
  gsap.ticker.add(onTick)
  window.addEventListener('resize', onResize)
  return () => {
    gsap.ticker.remove(onTick); clearTimeout(rt)
    window.removeEventListener('resize', onResize); ballEls.forEach((b) => b.remove())
  }
}
