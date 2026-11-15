import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// The browser's own scrolling, untouched: the page never takes over the wheel or touch. ScrollTrigger just reads the scroll
// position. (The menu locks the page itself by setting overflow on the body.)
export function initSmooth() {
  gsap.registerPlugin(ScrollTrigger)
}

export const pauseScroll = () => {}
export const resumeScroll = () => {}

export function scrollToTarget(target, { immediate = false } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  window.scrollTo({ top: el && el !== 0 ? el.getBoundingClientRect().top + window.scrollY : 0, behavior: immediate ? 'auto' : 'smooth' })
}
