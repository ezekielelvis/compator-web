import { Label } from '../atoms/Label.js'
import { HairlineLink } from '../atoms/HairlineLink.js'

// Molecule: partner cell.
export const PartnerCard = ({ name, role, text, url }) => `
  <article data-reveal class="cell flex min-h-[340px] flex-col">
    ${Label(role, { cls: 'text-muted' })}
    <h3 class="t-heading mt-48">${name}</h3>
    <p class="t-body mt-6 flex-1 text-muted">${text}</p>
    <div class="mt-32">${HairlineLink({ label: `Visit ${name}`, href: url, external: true })}</div>
  </article>`
