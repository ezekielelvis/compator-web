import { Label } from '../atoms/Label.js'
import { Arrow } from '../atoms/Arrow.js'
import pwc from '../assets/partners/pwc.png'
import xqizit from '../assets/partners/xqizit.png'
import teledata from '../assets/partners/teledata.png'
import un from '../assets/partners/un.png'

// Organism: partners. Two layouts for the same four cards (the partners' own marks, from their own sites):
//  - Wide screens (1024px and up): the pinned card fan, matched to the SVZ "clients funded" cards. Near-black glass plates
//    with a very large radius and a soft edge, overlapping at staggered heights, the right-hand two tilted. The headline
//    sits above them and nothing covers it.
//  - Phones and tablets: a swipeable rail of the same plates (scroll-snap, a card peeking in from the right, position dots).
//    No pinning, no overlap: it scrolls with the page and swipes sideways.
const cards = [
  { name: 'PwC', logo: pwc, figure: 'Advisory', caption: 'Opens doors across the Global South' },
  { name: 'xqizit', logo: xqizit, figure: 'Technology', caption: 'Scales resources in real time' },
  { name: 'Teledata ICT', logo: teledata, figure: '45,000+ users', caption: '2,000+ business clients served' },
  { name: 'UN & government', logo: un, figure: 'Supporters', caption: 'Partners backing local delivery' },
]
const mark = (c) => `<img src="${c.logo}" alt="${c.name}" class="fan-logo" width="96" height="96" loading="lazy" />`
const body = (c) => `<p class="fan-serif fan-figure">${c.figure}</p><div class="fan-brand">${mark(c)}</div><p class="fan-serif fan-caption">${c.caption}</p>`

export const PartnerFan = () => `
  <section id="fan" class="pad-x relative z-10 flex flex-col items-center justify-start overflow-hidden bg-paper py-20 text-center lg:h-screen lg:min-h-screen lg:py-0 lg:pt-[14vh]">
    <div data-fan-head class="relative z-0 will-change-[filter]">
      ${Label('Partners · across the Global South', { cls: 'text-muted' })}
      <h2 class="t-hero mt-6" aria-label="Backed by partners across the global south">
        <span class="block"><em>backed</em> by partners <em>across</em></span><span class="block">the global south</span>
      </h2>
    </div>

    <div class="pointer-events-none absolute inset-0 hidden lg:block">
      ${cards.map((c, i) => `
        <article data-fan-card style="--i:${i}" class="fan-card">${body(c)}</article>`).join('')}
    </div>
    <a href="/technology#partners" data-fan-cta class="cta t-label absolute bottom-[4vh] left-1/2 hidden -translate-x-1/2 lg:inline-flex"><span>See all partners</span>${Arrow()}</a>

    <div data-rail class="partner-rail mt-10 w-full lg:hidden">
      <ul class="rail-track" tabindex="0" aria-label="Partners. Swipe sideways to see them all.">
        ${cards.map((c) => `<li class="fan-card fan-card--rail">${body(c)}</li>`).join('')}
      </ul>
      <div class="rail-dots" aria-hidden="true">${cards.map((_, i) => `<span class="${i === 0 ? 'on' : ''}"></span>`).join('')}</div>
      <a href="/technology#partners" class="link t-label mt-4"><span>See all partners</span>${Arrow()}</a>
    </div>
  </section>`
