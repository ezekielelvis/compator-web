import { SectionHeader } from '../molecules/SectionHeader.js'
import { PartnerCard } from '../molecules/PartnerCard.js'
import { partners } from '../data/content.js'

// Organism: partner cards.
export const Partners = () => `
  <section id="partners" class="pad-x section bg-paper">
    ${SectionHeader({ label: 'Partners', title: 'Built with partners who *open doors*' })}
    <div class="mt-80 grid gap-6 lg:grid-cols-3">${partners.map((p, i) => PartnerCard(p, i)).join('')}</div>
  </section>`
