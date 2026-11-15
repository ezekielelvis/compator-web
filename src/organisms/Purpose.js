import { Label } from '../atoms/Label.js'
import { NumberedCard } from '../molecules/NumberedCard.js'
import { whyCompator } from '../data/content.js'

// Organism: "WE aRE" Section Transition Headline (ornamental glyph between geometric caps) + Why Compator.
export const Purpose = () => `
  <section id="purpose" class="pad-x section relative overflow-hidden bg-paper">
    <div class="relative">
      ${Label('Our purpose', { cls: 'text-muted' })}
      <h2 data-reveal class="t-display mt-6 flex items-baseline" aria-label="We are">
        <span>WE</span><span class="font-dirtyline-36-daysoftype-2022 mx-[0.1em] text-[1.7em] font-bold normal-case italic leading-[0.5] tracking-[-0.03em]">a</span><span>RE</span>
      </h2>
      <div class="mt-80 grid gap-48 lg:grid-cols-2">
        <p data-reveal class="t-heading-sm !normal-case !tracking-[-0.04em]">Compator provides high-quality compute to remote and under-connected regions: SMEs, schools, healthcare and whole communities.</p>
        <div data-reveal class="t-body-light max-w-[520px] space-y-6 text-muted">
          <p>The aim is simple: digital self-sufficiency, inclusive growth and local job creation.</p>
          <p>We combine London cloud expertise with in-country commercial teams, starting in Ghana with local partners, because Africa is a massively underserved market.</p>
        </div>
      </div>
      <div class="mt-80 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${whyCompator.map((w, i) => NumberedCard(w, i)).join('')}</div>
    </div>
  </section>`
