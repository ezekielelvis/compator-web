import { Label } from '../atoms/Label.js'
import { Arrow } from '../atoms/Arrow.js'
import pwc from '../assets/partners/pwc.png'
import xqizit from '../assets/partners/xqizit.png'
import teledata from '../assets/partners/teledata.png'
import un from '../assets/partners/un.png'

// Organism: partner card fan, matched to the SVZ "clients funded" cards. Near-black glass plates with a very large
// radius and a soft edge. Logo + name centred, a serif figure top-right, a serif caption bottom-left. They overlap
// at staggered heights, the right-hand two tilted. Logos come from the partners' own sites.
const cards = [
  { name: 'PwC', logo: pwc, figure: 'Advisory', caption: 'Opens doors across the Global South' },
  { name: 'xqizit', logo: xqizit, figure: 'Technology', caption: 'Scales resources in real time' },
  { name: 'Teledata ICT', logo: teledata, figure: '45,000+ users', caption: '2,000+ business clients served' },
  { name: 'UN & government', logo: un, figure: 'Supporters', caption: 'Partners backing local delivery' },
]
const mark = (c) => c.logo
  ? `<img src="${c.logo}" alt="${c.name}" class="fan-logo" width="96" height="96" loading="lazy" />`
  : `<span class="fan-logo fan-logo--text">${c.badge}</span>`

export const PartnerFan = () => `
  <section id="fan" class="pad-x relative z-10 flex h-screen items-center justify-center overflow-hidden bg-paper text-center">
    <div data-fan-head class="relative z-0 will-change-[filter]">
      ${Label('Partners · across the Global South', { cls: 'text-muted' })}
      <h2 class="t-hero mt-6" aria-label="Backed by partners across the global south">
        <span class="block"><em>backed</em>by partners<em>across</em></span><span class="block">the global south</span>
      </h2>
    </div>
    <div class="pointer-events-none absolute inset-0 hidden md:block">
      ${cards.map((c, i) => `
        <article data-fan-card style="--i:${i}" class="fan-card">
          <p class="fan-serif fan-figure">${c.figure}</p>
          <div class="fan-brand">${mark(c)}</div>
          <p class="fan-serif fan-caption">${c.caption}</p>
        </article>`).join('')}
    </div>
    <ul class="mt-16 grid w-full gap-4 md:hidden">${cards.map((c) => `<li class="fan-card fan-card--flat"><p class="fan-serif fan-figure">${c.figure}</p><div class="fan-brand">${mark(c)}</div><p class="fan-serif fan-caption">${c.caption}</p></li>`).join('')}</ul>
    <a href="/technology#partners" data-fan-cta class="cta t-label absolute bottom-[4vh] left-1/2 hidden -translate-x-1/2 md:inline-flex"><span>See all partners</span>${Arrow()}</a>
  </section>`
