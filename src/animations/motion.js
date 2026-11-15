import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

// Motion preference. Full motion is the default; the footer toggle turns it off (and is remembered).
export const motionOn = () => {
  try { return localStorage.getItem('compator-motion') !== 'off' } catch { return true }
}
export const setMotion = (on) => {
  try { localStorage.setItem('compator-motion', on ? 'on' : 'off') } catch { /* private mode */ }
}

// SVZ's signature curve (read from svz.io's source: CustomEase "main", 0.65,0.01,0.05,0.99 at 0.7s).
// Registered once and made the GSAP default so every tween shares the same feel.
export const EASE = 'main'
export function initEase() {
  gsap.registerPlugin(CustomEase)
  CustomEase.create(EASE, '0.65, 0.01, 0.05, 0.99')
  gsap.defaults({ ease: EASE, duration: 0.7 })
}
