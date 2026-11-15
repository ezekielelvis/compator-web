import { Label } from '../atoms/Label.js'
import { Dot } from '../atoms/Dot.js'
import { Shape } from '../atoms/Shape.js'

const sticky = '[@media(min-width:1024px)_and_(min-height:780px)]:sticky [@media(min-width:1024px)_and_(min-height:780px)]:top-0'

// Organism: inner-page opener. Sticky, so the page body rises over it (see Rise) and it recedes.
export const PageHero = ({ label, title, text }) => `
  <section id="top" class="pad-x relative z-0 flex min-h-[86vh] flex-col justify-end overflow-hidden bg-paper pb-80 pt-[200px] ${sticky}">
    ${Shape('crossHole', { cls: '-right-[5vw] top-[14vh] w-[30vw] max-w-[460px] rotate-[8deg]', color: 'var(--color-fig)', scroll: false, move: '10,-14,40' })}
    ${Shape('bar', { cls: 'right-[26vw] bottom-[16vh] w-[22vw] max-w-[340px] -rotate-[8deg]', color: 'var(--color-fig)', scroll: false, move: '-18,-8,22' })}
    <div data-move="0,-26,0" class="fig pointer-events-none absolute right-0 top-[56vh] h-[9vh] w-[3.6vw] bg-[var(--page)]" aria-hidden="true"></div>
    <div>
      <div data-hero-in>${Label(label, { cls: 'text-muted' })}</div>
      <h1 class="t-display-xl mt-6"><span class="block overflow-hidden pb-[0.06em]"><span data-hero-line class="block">${title}<span class="ml-[0.08em] inline-block align-baseline">${Dot('!size-[clamp(14px,2vw,24px)]')}</span></span></span></h1>
      ${text ? `<p data-hero-in class="t-lead mt-32 max-w-[560px] text-muted">${text}</p>` : ''}
    </div>
  </section>`

// Wrapper for everything under a PageHero: rounded top edge, slides up over the hero.
export const Rise = (html) => `<div data-rise class="relative z-10 overflow-clip rounded-t-xl border-t border-line bg-paper">${html}</div>`
