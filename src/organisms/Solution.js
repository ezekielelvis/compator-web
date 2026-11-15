import { SectionHeader } from '../molecules/SectionHeader.js'
import { NumberedCard } from '../molecules/NumberedCard.js'
import { StatBlock } from '../molecules/StatBlock.js'
import { solutions, stats } from '../data/content.js'

// Organism: the solution. First card is the featured one (the single red border here).
export const Solution = () => `
  <section id="solution" class="pad-x section relative z-10 rounded-t-xl border-t border-line bg-panel">
    <div class="relative">
      ${SectionHeader({ label: 'The solution', title: 'Sovereign, shared and *light*', text: 'An enterprise-standard platform, designed for security and scale, ready for initial clients, with new apps being delivered.' })}
      <div class="mt-80 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${solutions.map((s, i) => NumberedCard(s, i, i === 0 ? 'brand' : 'dark')).join('')}</div>
      <div class="mt-112 grid gap-48 sm:grid-cols-2 lg:grid-cols-4">${stats.map(StatBlock).join('')}</div>
    </div>
  </section>`
