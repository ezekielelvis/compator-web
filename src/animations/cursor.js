import { gsap } from 'gsap'

// Accent dot as cursor, plus an SVZ-style label: [data-cursor="Text"] shows a pill that trails the pointer
// and flips to the other side near the right / bottom edges (offsets and flip zones taken from svz.io).
export function initCursor() {
  const dot = document.getElementById('cursor')
  if (!window.matchMedia('(pointer: fine)').matches) return
  dot.classList.remove('hidden')
  const label = document.createElement('span')
  label.className = 'cursor-label'
  dot.append(label)

  gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 })
  const x = gsap.quickTo(dot, 'x', { duration: 0.45, ease: 'power3.out' })
  const y = gsap.quickTo(dot, 'y', { duration: 0.45, ease: 'power3.out' })
  const grow = gsap.quickTo(dot, 'scale', { duration: 0.25, ease: 'power3' })
  const lx = gsap.quickTo(label, 'xPercent', { duration: 0.9, ease: 'power3' })
  const ly = gsap.quickTo(label, 'yPercent', { duration: 0.9, ease: 'power3' })
  let shown = false

  window.addEventListener('pointermove', (e) => {
    x(e.clientX); y(e.clientY)
    lx(e.clientX > innerWidth * 0.81 ? -115 : 15)     // right 19%: label flips to the left of the dot
    ly(e.clientY > innerHeight * 0.9 ? -130 : 30)     // bottom 10%: label flips above
    if (!shown) { shown = true; gsap.to(dot, { opacity: 1, duration: 0.3 }) }
  }, { passive: true })
  document.addEventListener('pointerleave', () => { shown = false; gsap.to(dot, { opacity: 0, duration: 0.3 }) })
  document.addEventListener('pointerover', (e) => {
    const big = e.target.closest('[data-invert]')
    const text = e.target.closest('[data-cursor]')?.dataset.cursor ?? ''
    label.textContent = text
    label.classList.toggle('on', !!text)
    dot.classList.toggle('invert', !!big)
    grow(big ? 5.5 : text ? 1.6 : e.target.closest('a,button') ? 2.4 : 1)
  })
}
