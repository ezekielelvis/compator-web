import { Label } from '../atoms/Label.js'
import { Heading } from '../atoms/Heading.js'

// Molecule: label + heading (words brighten on scroll via data-scrub) + optional serif lede.
export const SectionHeader = ({ label, title, text, size = 'heading-lg' }) => `
  <div data-reveal class="max-w-[1100px]">
    ${Label(label, { cls: 'text-muted' })}
    ${Heading(title, { size, cls: 'mt-6', attrs: 'data-scrub' })}
    ${text ? `<p class="t-lead mt-32 max-w-[640px] text-muted">${text}</p>` : ''}
  </div>`
