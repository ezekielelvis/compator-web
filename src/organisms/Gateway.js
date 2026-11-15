import { SectionHeader } from '../molecules/SectionHeader.js'
import { Arrow } from '../atoms/Arrow.js'
import { Label } from '../atoms/Label.js'
import { gateways } from '../data/content.js'

// Organism: oversized page links. Hover shifts position and the arrow turns accent.
export const Gateway = () => `
  <section class="pad-x section bg-paper">
    ${SectionHeader({ label: 'Go deeper', title: 'Choose your *way in*' })}
    <ul class="mt-80 border-b border-ink">${gateways.map((g, i) => `
      <li data-reveal style="--c:${g.color}"><a href="${g.href}" class="gate group relative grid items-center gap-4 py-48 md:grid-cols-[80px_1fr_auto_auto] md:gap-32">
        <span data-line class="absolute inset-x-0 top-0 h-px origin-left bg-ink"></span>
        ${Label(`0${i + 1}`, { cls: 'text-muted' })}
        <span class="t-display transition-transform duration-300 ease-out group-hover:translate-x-6">${g.title}</span>
        <span class="t-body hidden max-w-[260px] text-muted md:block">${g.text}</span>
        <span class="transition-[transform,color] duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-[var(--c)]">${Arrow(32)}</span>
      </a></li>`).join('')}
    </ul>
  </section>`
