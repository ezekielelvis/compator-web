import { ListRow } from '../molecules/ListRow.js'
import { HairlineLink } from '../atoms/HairlineLink.js'
import { Label } from '../atoms/Label.js'
import { policies } from '../data/content.js'

// Organism: policy documents.
export const Policies = () => `
  <section id="policies" class="pad-x pb-80 bg-paper">
    ${Label('Policies', { cls: 'text-muted' })}
    <ul class="mt-6 border-b border-line">${policies.map((p, i) => ListRow({
      index: `0${i + 1}`, title: p.title, trailing: HairlineLink({ label: 'Read PDF', href: p.href, external: true }),
    })).join('')}</ul>
  </section>`
