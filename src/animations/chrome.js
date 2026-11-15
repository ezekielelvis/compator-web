import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pauseScroll, resumeScroll } from './smooth.js'
import { motionOn } from './motion.js'

// Persistent UI: mobile menu and the motion toggle. Bound once, they survive page swaps.
export function initChrome() {
  const menu = document.getElementById('mobile-menu'), btn = document.getElementById('menu-btn')
  const set = (open) => {
    menu.setAttribute('aria-hidden', !open)
    open ? pauseScroll() : resumeScroll()
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      gsap.timeline()
        .set(menu, { visibility: 'visible' })
        .fromTo('#menu-panel', { xPercent: 101 }, { xPercent: 0, duration: 0.7 })
        .fromTo(menu, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0)
        .fromTo('#mobile-menu nav > *', { yPercent: 40, rotate: 6, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.05 }, '<+=0.15')
    } else {
      gsap.timeline()
        .to('#menu-panel', { xPercent: 101, duration: 0.6 })
        .to(menu, { autoAlpha: 0, duration: 0.2 }, '<+=0.4')
    }
  }
  btn?.addEventListener('click', () => set(true))
  document.getElementById('menu-close')?.addEventListener('click', () => set(false))
  menu.addEventListener('click', (e) => e.target.closest('[data-nav-close]') && set(false))
  document.addEventListener('keydown', (e) => e.key === 'Escape' && set(false))

  // Footer wordmark: rises from below the crop line as the footer scrolls into view
  if (motionOn()) {
    gsap.fromTo('[data-footer-word]', { yPercent: 38 }, { yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '#site-footer', start: 'top 85%', end: 'bottom bottom', scrub: true } })
  }

  // Header (fixed): past 60px the wordmark clips down to the colour-wheel "C" and the nav columns tuck away, so the
  // navigation never lies over the page. The state is worked out from the real scroll position every time (on scroll,
  // after every refresh, and once now), so it is right even if the page opens already scrolled.
  const logo = document.querySelector('[data-logo]'), cols = document.querySelector('[data-nav-cols]')
  if (logo) {
    let tucked = null
    const sync = () => {
      const now = window.scrollY > 60
      if (now === tucked) return
      const first = tucked === null
      tucked = now
      const dur = motionOn() && !first ? 1 : 0 // no animation on first paint or with reduced motion: it just is the right state
      gsap.to(logo, { clipPath: now ? 'inset(0 86% 0 0)' : 'inset(0 0% 0 0)', duration: 0.6 * dur, ease: 'power3.out', overwrite: true })
      if (cols) {
        gsap.to(cols, { opacity: now ? 0 : 1, y: now ? -10 : 0, duration: 0.4 * dur, ease: 'power3.out', overwrite: true })
        cols.style.pointerEvents = now ? 'none' : ''
      }
    }
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: sync, onRefresh: sync })
    window.addEventListener('scroll', sync, { passive: true })
    sync()
  }
}
