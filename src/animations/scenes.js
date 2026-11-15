import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motionOn, EASE } from './motion.js'
import { mountBelt } from './belt.js'

gsap.registerPlugin(ScrollTrigger)
if (import.meta.env.DEV) window.__st = ScrollTrigger // dev-only: lets us scrub scenes deterministically
const OUT = EASE

// Builds every motion for one page. Returns enter() (play the hero entrance) and destroy().
export function mountPage(root) {
  const on = motionOn()
  const $ = (s) => [...root.querySelectorAll(s)]
  let entered = false
  let stopPhysics = null

  const ctx = gsap.context(() => {
    initForm(root)
    stopPhysics = mountBelt(root.querySelector('#top') ?? root, { animate: on })
    if (!on) return

    // Initial hidden states (revealed by enter() / scroll)
    // Hidden means fully below the mask. The mask is a little taller than the text (padding under it), so 105% left the tops of the
    // letters showing as a row of dashes; 140% clears it with room to spare.
    gsap.set($('[data-hero-line]'), { yPercent: 140 })
    gsap.set($('[data-hero-in]'), { y: 24, opacity: 0 })
    gsap.set($('[data-reveal]'), { opacity: 0, y: 24 })
    gsap.set($('[data-line]'), { scaleX: 0 })

    // Reveals: one batched trigger, short stagger
    ScrollTrigger.batch($('[data-reveal]'), {
      start: 'top 90%', once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: EASE, stagger: 0.06, overwrite: true }),
    })

    // Hairlines draw in from the left
    $('[data-line]').forEach((line) =>
      ScrollTrigger.create({ trigger: line.parentElement, start: 'top 92%', once: true,
        onEnter: () => gsap.to(line, { scaleX: 1, duration: 1.4, ease: 'power3.out' }) }))

    // Headings: words brighten as they cross the screen. Scrubbed on opacity only (cheap).
    $('[data-scrub]').forEach((h) => {
      const words = splitWords(h)
      gsap.fromTo(words, { opacity: 0.14 }, { opacity: 1, ease: 'none', stagger: 0.12,
        scrollTrigger: { trigger: h, start: 'top 88%', end: 'top 50%', scrub: true } })
    })

    // Technology steps: the row at the middle of the screen is the bright one
    $('[data-step]').forEach((row) =>
      gsap.fromTo(row, { opacity: 0.25 }, { opacity: 1, ease: 'none',
        scrollTrigger: { trigger: row, start: 'top 82%', end: 'top 52%', scrub: true } }))

    // Odometer: each digit is a column that rolls to its value; right-most digits roll longest
    $('[data-odo]').forEach((el) => {
      const cols = buildOdometer(el)
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () =>
        cols.forEach(({ strip, d }, i) => gsap.fromTo(strip, { yPercent: 0 },
          { yPercent: -(10 + d) * 5, duration: 1.8 + i * 0.18, ease: 'power4.out' })) })
    })

    // Idle life for the figures on the inner-page heroes: each turns and drifts on its own slow loop (on the inner SVG,
    // so it never fights the scroll travel on the wrapper). The home hero draws its own scene (belt.js).
    const rnd = (a, b) => a + Math.random() * (b - a)
    $('#top .fig:not([data-ball])').forEach((fig, i) => {
      const svg = fig.querySelector('svg'); if (!svg) return
      gsap.to(svg, { rotation: rnd(6, 14) * (i % 2 ? 1 : -1), x: () => `${rnd(-2.5, 2.5)}vw`, y: () => `${rnd(-3.5, 3.5)}vh`,
        duration: rnd(5, 9), ease: 'sine.inOut', repeat: -1, yoyo: true, repeatRefresh: true }).progress(Math.random())
    })
    // Bottom of the home (closing section): the figures travel horizontally. Each slides side to side across a wide
    // span on its own slow loop, alternating direction shape to shape, and rolls a little as it goes.
    $('#closing .fig').forEach((fig, i) => {
      const svg = fig.querySelector('svg'); if (!svg) return
      const dir = i % 2 ? -1 : 1
      gsap.fromTo(svg, { x: `${-dir * rnd(10, 16)}vw`, rotation: -dir * 28 }, { x: `${dir * rnd(10, 16)}vw`, rotation: dir * 28, y: 0,
        duration: rnd(7, 12), ease: 'sine.inOut', repeat: -1, yoyo: true }).progress(Math.random())
    })

    const hero = root.querySelector('#top')
    const rise = root.querySelector('[data-rise]')

    // Home / inner heroes: the figures travel and rotate as the next panel rises (scroll-driven, like SVZ),
    // each in its own direction and at its own pace. No idle loops, so scrolling stays light.
    if (rise)
      $('[data-move]').forEach((el) => {
        const [x, y, r] = el.dataset.move.split(',').map(Number)
        gsap.to(el, { x: () => (innerWidth * x) / 100, y: () => (innerHeight * y) / 100, rotation: r, ease: 'none',
          scrollTrigger: { trigger: rise, start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true } })
      })

    // The ball hops between positions as you scroll (multiply-blended so the headline stays readable over it)
    const ball = root.querySelector('[data-ball]')
    if (ball && rise) {
      const pt = (px, py) => ({ x: () => innerWidth * px, y: () => innerHeight * py })
      gsap.timeline({ defaults: { ease: 'power2.inOut' }, scrollTrigger: { trigger: rise, start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true } })
        .fromTo(ball, { ...pt(0.62, 0.64) }, { ...pt(0.86, 0.38), duration: 1 })
        .to(ball, { ...pt(0.42, 0.42), duration: 1 })
        .to(ball, { ...pt(0.12, 0.7), duration: 1 })
    }

    // Home: "WE aRE". The frosted sheet rises over the hero while the three type pieces converge into place.
    const weare = root.querySelector('#weare')
    if (weare) {
      const mark = weare.querySelector('[data-weare]')
      const pieces = [...weare.querySelectorAll('[data-weare-piece]')]
      const passage = { trigger: weare, start: 'top bottom', end: 'top 10%', scrub: true, invalidateOnRefresh: true }
      gsap.fromTo(mark, { y: () => innerHeight * 0.5, scale: 1.025 }, { y: 0, scale: 1, ease: 'none', scrollTrigger: { ...passage } })
      gsap.fromTo(pieces,
        { x: (i) => (i - 1) * 24, y: (i) => i === 1 ? 34 : 18, scale: (i) => i === 1 ? 0.86 : 1, opacity: 0.55 },
        { x: 0, y: 0, scale: 1, opacity: 1, ease: 'none', stagger: 0.12, scrollTrigger: { ...passage } })
    }

    // Home: the zoom into the R (read from the slow-motion recording of svz.io).
    //  1. "WE aRE" has risen and is centred. The section pins.
    //  2. The wordmark scales up hard, pivoting on the R's stem: the "a" is thrown off to the left, the R swells
    //     until its stem swallows the screen.
    //  3. While it zooms the frosted sheet darkens to the manifesto's near-black, so letter and ground become one.
    //  4. The pin releases onto the manifesto, whose paragraph then rises out of the black.
    // The header flips to light (html[data-dark]) while the page is dark.
    const setDark = (on) => document.documentElement.toggleAttribute('data-dark', on)
    const zoomMark = weare?.querySelector('[data-weare] h2')
    const right = weare?.querySelector('[data-weare-piece="right"]')
    if (weare && zoomMark && right) {
      const geometry = () => { // layout-based (offset*), so it is unaffected by the transforms mid-animation
        const fs = parseFloat(getComputedStyle(right).fontSize)
        const x = right.offsetLeft - zoomMark.offsetLeft + fs * 0.145         // centre of the R's stem
        const y = right.offsetTop - zoomMark.offsetTop + right.offsetHeight * 0.52
        const farthest = Math.max(x + zoomMark.offsetLeft, innerWidth - x - zoomMark.offsetLeft)
        return { x, y, scale: Math.min(110, (farthest / (fs * 0.075)) * 0.85) }
      }
      gsap.set(zoomMark, { willChange: 'transform' })
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: weare, start: 'top top', end: '+=140%', pin: true, scrub: true, invalidateOnRefresh: true,
        onRefresh: () => { const g = geometry(); gsap.set(zoomMark, { transformOrigin: `${g.x}px ${g.y}px` }) },
        onUpdate: (self) => setDark(self.progress > 0.62) } })
      tl.to(zoomMark, { scale: () => geometry().scale, duration: 1, ease: 'power3.in' }, 0)
        .to(weare, { backgroundColor: '#080808', duration: 0.5, ease: 'power1.in' }, 0.45)
        .to({}, { duration: 0.12 })
    }

    // Home: pinned manifesto, rebuilt from how SVZ does it.
    //  1. The paragraph is fully legible. As you scroll, a wave sweeps top to bottom and fades ONLY the plain words;
    //     the keywords never move while it passes.
    //  2. The keywords themselves (no clones) then glide into a centred stack, then the button appears.
    //  3. The pin holds for one more screen while the next panel rises over it.
    // Scrub is `true` and the browser's own scrolling drives it; only opacity/transform animate.
    const sec = root.querySelector('#manifesto')
    if (sec) {
      const words = $('#manifesto .w'), plain = words.filter((w) => !w.hasAttribute('data-kw'))
      const kws = $('#manifesto [data-kw]'), cta = sec.querySelector('[data-kw-cta]')
      // Entrance (from the recording): the paragraph is already fully formed. It rises out of the black from the bottom
      // of the screen the moment the R fills it, brightening from dim to full as it travels up. Tied to scroll, not time.
      gsap.fromTo(sec.querySelector('[data-manifesto]'), { opacity: 0.3 }, { opacity: 1, ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top 72%', end: 'top 12%', scrub: true } })

      // Where each keyword must travel to land in the centred stack (measured relative to the section, so it
      // is correct whatever the scroll position is when ScrollTrigger refreshes)
      const centre = (i, axis) => () => {
        const k = kws[i].getBoundingClientRect(), s = sec.getBoundingClientRect()
        const cur = Number(gsap.getProperty(kws[i], axis))
        return axis === 'x'
          ? s.width / 2 - (k.left - s.left + k.width / 2) + cur
          : s.height * 0.44 + (i - (kws.length - 1) / 2) * 76 - (k.top - s.top + k.height / 2) + cur
      }
      const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=170%', pin: true, pinSpacing: false, scrub: true, invalidateOnRefresh: true,
        onEnter: () => setDark(true), onLeave: () => setDark(false), onEnterBack: () => setDark(true) } })
      tl.fromTo(plain, { opacity: 1 }, { opacity: 0, ease: 'none', duration: 0.5, stagger: 0.02, immediateRender: false })
        // Zoom in (from the recording): the keywords leave the paragraph and swell into a big centred stack, the top
        // word first, each following a beat behind, so the stack is still growing at the bottom while the top is done.
        .to(kws, { x: (i) => centre(i, 'x')(), y: (i) => centre(i, 'y')(), scale: 1.3, duration: 1.2, ease: 'power3.inOut', stagger: 0.12 }, '+=0.1')
        .fromTo(cta, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '>-0.3')
        .to({}, { duration: 0.45 }) // the stack holds, full size
        // Zoom out: as the next sheet rises over it, the stack settles back, drifts up and dissolves.
        .to(kws, { scale: 1.0, y: '-=70', autoAlpha: 0, duration: 0.9, ease: 'power2.in', stagger: { each: 0.05, from: 'start' } })
        .to(cta, { scale: 0.9, y: -30, autoAlpha: 0, duration: 0.6, ease: 'power2.in' }, '<')
      tl.to({}, { duration: 0.2 })
    }

    // Home: partner card fan (SVZ "clients funded"). Pinned. Cards rise one after another from below with 3D tilts,
    // overlap and blur the headline, hold in a fan, then leave up and to the right as the CTA fades.
    const fan = root.querySelector('#fan')
    const fanCards = fan ? [...fan.querySelectorAll('[data-fan-card]')] : []
    if (fan && fanCards.length && matchMedia('(min-width:1024px)').matches) {
      const rest = [[0, 0, 0], [0, 0, 0], [0, -5, 6], [0, -8, 7]] // rotateX, rotateY, rotateZ once fanned (the right two tilt, as in the reference)
      const restY = [-0.05, 0.05, 0.03, -0.03] // staggered heights, as a fraction of the viewport
      const head = fan.querySelector('[data-fan-head]'), fanCta = fan.querySelector('[data-fan-cta]')
      // Arrival: the section is the same black as the manifesto, so there is no edge to see. The headline simply
      // fades up out of the dark as it scrolls in (children only, the pin timeline below owns the head's own blur).
      gsap.fromTo([...head.children], { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: fan, start: 'top 90%', end: 'top 15%', scrub: true } })
      gsap.fromTo(fanCta, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: fan, start: 'top 40%', end: 'top 0%', scrub: true } })
      gsap.set(fanCards, { xPercent: -50, yPercent: -50, transformPerspective: 1400 })
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: fan, start: 'top top', end: '+=170%', pin: true, scrub: true, invalidateOnRefresh: true } })
      tl.fromTo(fanCards,
        { y: () => innerHeight * 1.15, rotationX: 48, rotationY: (i) => rest[i][1] * 2.5, rotation: (i) => rest[i][2] * 2 },
        { y: (i) => innerHeight * restY[i], rotationX: (i) => rest[i][0], rotationY: (i) => rest[i][1], rotation: (i) => rest[i][2], duration: 1.2, ease: 'power2.out', stagger: 0.28 }, 0)
        .to({}, { duration: 0.6 }) // hold: the headline above, the cards below, nothing overlapping
        .to(head, { opacity: 0, y: -30, duration: 0.4 }) // the headline leaves first...
        .to(fanCta, { autoAlpha: 0, duration: 0.3 }, '<')
        .to(fanCards, { y: () => -innerHeight * 1.3, x: (i) => innerWidth * (0.05 + i * 0.035), rotationX: -18, rotation: (i) => rest[i][2] + 6, duration: 1.1, ease: 'power2.in', stagger: 0.14 }, '>-0.1') // ...then the cards rise out
    }

    // Partners rail (phones and tablets): the dots follow the swipe.
    $('[data-rail]').forEach((rail) => {
      const track = rail.querySelector('.rail-track'), dots = [...rail.querySelectorAll('.rail-dots span')]
      const update = () => {
        const first = track.children[0], step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 14)
        const i = Math.max(0, Math.min(dots.length - 1, Math.round(track.scrollLeft / step)))
        dots.forEach((d, k) => d.classList.toggle('on', k === i))
      }
      track.addEventListener('scroll', update, { passive: true })
    })

    // Home: giant marquee. Two rows of type slide against each other with scroll (skewing with scroll speed), then dim
    // behind a short statement. No card: the type is the scene.
    const marq = root.querySelector('#marquee')
    if (marq) {
      const r1 = marq.querySelector('[data-marq-row="1"]'), r2 = marq.querySelector('[data-marq-row="2"]'), out = marq.querySelector('[data-marq-out]')
      const rows = [r1, r2]
      const skewTo = gsap.quickTo(rows, 'skewX', { duration: 0.5, ease: 'power3' })
      let idle
      const skew = (v) => { skewTo(v); clearTimeout(idle); idle = setTimeout(() => skewTo(0), 90) } // settle when scrolling stops
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: marq, start: 'top top', end: '+=160%', pin: true, scrub: true, invalidateOnRefresh: true,
        onUpdate: (self) => skew(gsap.utils.clamp(-8, 8, self.getVelocity() / -250)) } })
      tl.fromTo(r1, { xPercent: 0 }, { xPercent: -50, duration: 3 }, 0)
        .fromTo(r2, { xPercent: -50 }, { xPercent: 0, duration: 3 }, 0)
        .to(rows, { opacity: 0.12, duration: 0.6 }, 1.9)
        .fromTo(out, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 2.1)
      tl.to({}, { duration: 0.4 })
    }

    // Home: closing hero. Headline lines rise in as it arrives; the figures travel while it passes.
    const closing = root.querySelector('#closing')
    if (closing) {
      const lines = [...closing.querySelectorAll('[data-close-line]')], fades = [...closing.querySelectorAll('[data-close-fade]')]
      gsap.set(lines, { yPercent: 140 }); gsap.set(fades, { opacity: 0, y: 28 })
      ScrollTrigger.create({ trigger: closing, start: 'top 60%', once: true, onEnter: () =>
        gsap.timeline({ defaults: { ease: EASE } }).to(lines, { yPercent: 0, duration: 1.2, stagger: 0.1 })
          .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, '-=0.7') })
      $('#closing [data-cmove]').forEach((el) => {
        const [x, y, r] = el.dataset.cmove.split(',').map(Number)
        gsap.to(el, { x: () => (innerWidth * x) / 100, y: () => (innerHeight * y) / 100, rotation: r, ease: 'none',
          scrollTrigger: { trigger: closing, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } })
      })
    }

  }, root)

  return {
    enter() {
      if (entered) return
      entered = true
      if (!on) return
      ctx.add(() => {
        gsap.timeline({ defaults: { ease: OUT } })
          .to($('[data-hero-line]'), { yPercent: 0, duration: 1.2, stagger: 0.1 })
          .to($('[data-hero-in]'), { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, '-=0.8')
      })
    },
    destroy() { stopPhysics?.(); ctx.revert() },
  }
}

// Split a heading's text nodes into word spans (keeps <em>), exposing the full text to screen readers.
function splitWords(el) {
  el.setAttribute('aria-label', el.textContent.trim())
  const walk = (node) => [...node.childNodes].forEach((n) => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment()
      n.textContent.split(/(\s+)/).forEach((t) => {
        if (!t) return
        if (/^\s+$/.test(t)) return frag.append(' ')
        const s = document.createElement('span'); s.className = 'sw'; s.setAttribute('aria-hidden', 'true'); s.textContent = t; frag.append(s)
      })
      n.replaceWith(frag)
    } else if (n.nodeType === 1) walk(n)
  })
  walk(el)
  return [...el.querySelectorAll('.sw')]
}

// Replace "45,000" with rolling digit columns (0-9 twice, so every digit can spin a full turn).
function buildOdometer(el) {
  const text = el.textContent
  el.innerHTML = ''
  const cols = []
  for (const ch of text) {
    if (/\d/.test(ch)) {
      const col = document.createElement('span'); col.className = 'odo-col'; col.setAttribute('aria-hidden', 'true')
      const strip = document.createElement('span'); strip.className = 'odo-strip'
      strip.innerHTML = Array.from({ length: 20 }, (_, i) => `<span>${i % 10}</span>`).join('')
      col.append(strip); el.append(col); cols.push({ strip, d: Number(ch) })
    } else {
      const s = document.createElement('span'); s.textContent = ch; s.setAttribute('aria-hidden', 'true'); el.append(s)
    }
  }
  return cols
}

// Front-end only: validates and confirms. Connect an endpoint to send for real.
function initForm(root) {
  const form = root.querySelector('#contact-form'), status = root.querySelector('#form-status')
  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const ok = form.email.value.includes('@') && form.reason.value
    status.textContent = ok ? 'Thank you. Your message is ready to send once the form endpoint is connected.' : 'Please add a valid email and choose a reason.'
    if (ok) form.reset()
  })
}
