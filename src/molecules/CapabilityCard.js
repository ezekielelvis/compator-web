// Molecule: AI Advisory capability cell with a hairline list.
export const CapabilityCard = ({ title, items }, i) => `
  <article data-reveal class="cell flex min-h-[300px] flex-col">
    <span class="cell-index">${String(i + 1).padStart(2, '0')}</span>
    <h3 class="t-subheading mt-48">${title}</h3>
    <ul class="t-body mt-6 text-muted">${items.map((t) => `<li class="border-t border-line py-2">${t}</li>`).join('')}</ul>
  </article>`
