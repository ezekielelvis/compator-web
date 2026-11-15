import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

// Motion follows the visitor's own system setting: with "reduce motion" on, the site renders as a calm static page.
export const motionOn = () => !(typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches)

// SVZ's signature curve (read from svz.io's source: CustomEase "main", 0.65,0.01,0.05,0.99 at 0.7s).
// Registered once and made the GSAP default so every tween shares the same feel.
export const EASE = 'main'
export function initEase() {
  gsap.registerPlugin(CustomEase)
  CustomEase.create(EASE, '0.65, 0.01, 0.05, 0.99')
  gsap.defaults({ ease: EASE, duration: 0.7 })
}
