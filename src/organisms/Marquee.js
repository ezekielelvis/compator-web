import { Label } from '../atoms/Label.js'
import { OutlineButton } from '../atoms/OutlineButton.js'

// Organism: giant marquee. Two rows of oversized type slide against each other as you scroll (the second is outlined),
// then dim behind a short statement. It overlaps the end of the partner cards so it is already arriving as they leave.
const row = (text) => `<span class="pr-[0.3em]">${text}</span><span class="pr-[0.3em]">${text}</span>`

export const Marquee = () => `
  <section id="marquee" class="relative z-10 h-[88svh] min-h-[520px] overflow-hidden bg-paper text-ink lg:-mt-[40vh] lg:h-screen">
    <div data-marq-row="1" class="absolute left-0 top-[27%] flex -translate-y-1/2 whitespace-nowrap font-bold uppercase leading-none will-change-transform" style="font-size:17vw;letter-spacing:-0.05em" aria-hidden="true">${row('Sovereign — Sustainable — Secure — ')}</div>
    <div data-marq-row="2" class="marq-outline absolute left-0 top-[64%] flex -translate-y-1/2 whitespace-nowrap font-bold uppercase leading-none will-change-transform" style="font-size:17vw;letter-spacing:-0.05em" aria-hidden="true">${row('Affordable — Local — Resilient — ')}</div>
    <p class="sr-only">Sovereign, sustainable, secure, affordable, local, resilient.</p>
    <div data-marq-out class="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center px-6 text-center opacity-0">
      ${Label('Case in point', { cls: 'text-[var(--page)]' })}
      <h3 class="t-hero mt-4 text-ink" style="font-size:clamp(2rem,5vw,4.5rem)">Compute that needs <em>no</em> cooling</h3>
      <span class="pointer-events-auto mt-6 text-ink">${OutlineButton({ label: 'See the technology', href: '/technology' })}</span>
    </div>
  </section>`
