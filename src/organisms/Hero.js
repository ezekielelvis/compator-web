import { Dot } from '../atoms/Dot.js'
import { Label } from '../atoms/Label.js'

const down = '<svg class="arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" aria-hidden="true"><path d="M6 1.5v9M2.5 7 6 10.5 9.5 7"/></svg>'

// Organism: Hero. Centred headline with small serif connectives; neutral figures that travel and spin as you scroll
// (data-move = "x vw, y vh, rotation"), one accent block, and a ball that hops. Sticky and static: the "WE aRE" sheet
// rises over it, and its top edge already peeks at the fold on load, like SVZ.
export const Hero = () => `
  <section id="top" class="pad-x relative z-0 flex min-h-[calc(100vh-16px)] flex-col items-center justify-center overflow-hidden bg-paper text-center [@media(min-width:1024px)_and_(min-height:780px)]:sticky [@media(min-width:1024px)_and_(min-height:780px)]:top-0">
    <canvas data-belt class="pointer-events-none absolute inset-0 size-full" aria-hidden="true"></canvas>
    <div class="relative">
      <div data-hero-in>${Label('Compator Cloud · compact hyperscale compute', { cls: 'text-muted' })}</div>
      <h1 data-invert class="t-hero mt-6" aria-label="Delivering efficient cloud for the communities that need it">
        <span class="block overflow-hidden pb-[0.1em]"><span data-hero-line class="block"><em>delivering</em>efficient cloud<em>for the</em></span></span>
        <span class="block overflow-hidden pb-[0.1em]"><span data-hero-line class="block">communities that need it</span></span>
      </h1>
    </div>
    <a href="#weare" data-hero-in class="cta t-label absolute bottom-[4vh] left-1/2 -translate-x-1/2"><span data-bob class="mr-2">${Dot()}</span><span>Enter our world</span>${down}</a>
  </section>`
