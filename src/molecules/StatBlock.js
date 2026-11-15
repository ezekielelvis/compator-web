import { Label } from '../atoms/Label.js'

// Molecule: oversized numeral. The digits roll like an odometer (built in animations/scenes.js).
export const StatBlock = ({ value, suffix, label }) => {
  const text = value.toLocaleString('en-GB')
  return `
  <div data-reveal class="border-t border-ink pt-6">
    <p class="t-display flex items-end gap-2"><span class="odo" data-odo aria-label="${text}">${text}</span>${suffix ? `<em class="relative -top-[0.08em]">${suffix.trim()}</em>` : ''}</p>
    ${Label(label, { cls: 'mt-4 max-w-[220px] text-muted' })}
  </div>`
}
