import { Label } from '../atoms/Label.js'

// Molecule: a "cell". Hairline on top, big italic index, title and text pinned to the bottom.
// variant 'brand' is the one featured cell per section (solid accent).
export const NumberedCard = ({ title, text }, i, variant = 'dark') => {
  const feat = variant === 'brand'
  return `
  <article data-reveal class="${feat ? 'cell-feature' : 'cell'} flex min-h-[210px] flex-col sm:min-h-[300px]">
    <span class="cell-index">${String(i + 1).padStart(2, '0')}</span>
    <div class="mt-auto pt-[24px] sm:pt-[48px]"><h3 class="t-subheading">${title}</h3><p class="t-body mt-4 ${feat ? '' : 'text-muted'}">${text}</p></div>
  </article>`
}
