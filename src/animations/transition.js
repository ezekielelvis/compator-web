import { gsap } from 'gsap'
import { EASE } from './motion.js'

// The curtain: a frosted panel with huge type that wipes up over the page, SVZ-style.
const q = (s) => document.querySelector(s)

function setTitle(text) {
  q('#curtain-title').innerHTML = text.split(' ')
    .map((w) => `<span class="inline-block overflow-hidden pb-[0.1em] align-bottom"><span data-ct class="inline-block">${w}</span></span>`).join(' ')
}
// Panel takes the destination page's colour (state indication: you can see where you are going)
const paint = (theme) => { const p = q('#curtain-panel'); p.style.background = theme.color; p.style.color = theme.on }
const hide = () => { const c = q('#curtain'); c.style.visibility = 'hidden'; c.style.pointerEvents = 'none' }

// First load: the curtain is already covering the page. Type rises, falls away, panel lifts.
export function intro(onLift, theme) {
  return new Promise((resolve) => {
    paint(theme)
    setTitle('Compator')
    gsap.set('[data-ct]', { yPercent: 140 })
    gsap.set('#curtain-panel', { yPercent: 0 })
    gsap.timeline({ onComplete: () => { hide(); resolve() } })
      .to('[data-ct]', { yPercent: 0, duration: 0.9, ease: EASE, stagger: 0.07 })
      .to('[data-ct]', { yPercent: -115, duration: 0.6, ease: EASE }, '+=0.45')
      .to('#curtain-panel', { yPercent: -100, duration: 1.05, ease: EASE }, '-=0.2')
      .add(onLift, '-=0.75')
  })
}

// Leaving a page: panel rises from below while the old page shrinks, dims and drifts up.
export function leave(title, pageEl, theme) {
  return new Promise((resolve) => {
    paint(theme)
    const c = q('#curtain')
    c.style.visibility = 'visible'; c.style.pointerEvents = 'all'
    setTitle(title)
    gsap.set('#curtain-panel', { yPercent: 100 })
    gsap.set('[data-ct]', { yPercent: 140 })
    gsap.timeline({ onComplete: resolve })
      .to('#curtain-panel', { yPercent: 0, duration: 1, ease: EASE })
      .to(pageEl, { scale: 0.94, opacity: 0.45, y: -80, duration: 1, ease: EASE }, 0)
      .to('[data-ct]', { yPercent: 0, duration: 0.8, ease: EASE, stagger: 0.07 }, '-=0.35')
  })
}

// Arriving: type drops away, panel lifts off the top and the new page settles up into place.
export function reveal(pageEl, onLift) {
  return new Promise((resolve) => {
    gsap.set(pageEl, { clearProps: 'all' })
    gsap.set(pageEl, { y: 140 })
    gsap.timeline({ onComplete: () => { gsap.set(pageEl, { clearProps: 'all' }); hide(); resolve() } })
      .to('[data-ct]', { yPercent: -115, duration: 0.55, ease: EASE, stagger: 0.05 }, '+=0.25')
      .to('#curtain-panel', { yPercent: -100, duration: 1, ease: EASE }, '-=0.15')
      .to(pageEl, { y: 0, duration: 1, ease: EASE }, '<')
      .add(onLift, '-=0.7')
  })
}
