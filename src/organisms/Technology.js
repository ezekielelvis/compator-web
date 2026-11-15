import { SectionHeader } from '../molecules/SectionHeader.js'
import { ListRow } from '../molecules/ListRow.js'
import { Label } from '../atoms/Label.js'
import { techBenefits, mdcSteps } from '../data/content.js'

// Organism: Tinted editorial panel.
export const Technology = () => `
  <section id="micro" class="pad-x section bg-panel text-ink">
    ${SectionHeader({ label: 'Technology', title: 'Compute with *far fewer* machines', text: 'An energy-efficient platform for compute, storage and processing that needs no large data centres.', dark: false })}
    <div class="mt-80 grid gap-80 lg:grid-cols-[1fr_1.6fr]">
      <div>
        ${Label('Benefits', { cls: 'text-muted' })}
        <ul class="t-body mt-6">${techBenefits.map((b) => `<li data-reveal class="border-t border-line py-4">${b}</li>`).join('')}</ul>
      </div>
      <div>
        ${Label('Implementation', { cls: 'text-muted' })}
        <ol class="mt-6">${mdcSteps.map((s, i) => ListRow({ index: `0${i + 1}`, title: s.title, text: s.text, step: true })).join('')}</ol>
      </div>
    </div>
  </section>`
