import { SectionHeader } from '../molecules/SectionHeader.js'
import { ListRow } from '../molecules/ListRow.js'
import { HairlineLink } from '../atoms/HairlineLink.js'
import { Label } from '../atoms/Label.js'
import { team } from '../data/content.js'

// Organism: leadership as an editorial index (no portraits supplied, so type carries it).
export const Team = () => `
  <section id="team" class="pad-x section bg-paper">
    ${SectionHeader({ label: 'The team', title: 'Industry expertise, *entrepreneurial* drive' })}
    <ul class="mt-80 border-b border-line">${team.map((m, i) => ListRow({
      index: `0${i + 1}`, title: m.name, text: m.role,
      trailing: HairlineLink({ label: 'LinkedIn', href: `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(m.name + ' Compator')}`, external: true }),
    })).join('')}</ul>
    ${Label('Now hiring in Ghana, The Gambia and the UK', { cls: 'mt-12 text-muted' })}
  </section>`
