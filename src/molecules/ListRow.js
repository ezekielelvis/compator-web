import { Label } from '../atoms/Label.js'

// Molecule: hairline-divided row. The hairline draws in from the left (data-line).
// `step` rows brighten as they pass the middle of the screen instead of fading in.
export const ListRow = ({ index, title, text = '', trailing = '', step = false }) => `
  <li ${step ? 'data-step' : 'data-reveal'} class="relative grid items-baseline gap-4 py-32 md:grid-cols-[80px_1.1fr_1.4fr_auto] md:gap-32">
    <span data-line class="absolute inset-x-0 top-0 h-px origin-left bg-ink/25"></span>
    ${Label(index, { cls: 'text-muted' })}
    <h3 class="${text ? 't-subheading' : 't-heading'}">${title}</h3>
    <p class="t-body text-muted">${text}</p>
    <div>${trailing}</div>
  </li>`
