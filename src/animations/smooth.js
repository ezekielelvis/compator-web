import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { motionOn } from './motion.js'

let lenis = null

// Locomotive-style inertial scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
export function initSmooth() {
  gsap.registerPlugin(ScrollTrigger)
  if (!motionOn()) return
  lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.85, touchMultiplier: 1.2 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}

export const pauseScroll = () => lenis?.stop()
export const resumeScroll = () => lenis?.start()

export function scrollToTarget(target, { immediate = false } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (lenis) lenis.scrollTo(el ?? 0, { immediate, duration: 1.3, easing: (t) => 1 - Math.pow(1 - t, 5) })
  else window.scrollTo({ top: el && el !== 0 ? el.getBoundingClientRect().top + window.scrollY : 0, behavior: immediate ? 'auto' : 'smooth' })
}
