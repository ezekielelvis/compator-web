import { SectionHeader } from '../molecules/SectionHeader.js'
import { NumberedCard } from '../molecules/NumberedCard.js'
import { problems } from '../data/content.js'

// Organism: "Cloud computing has a problem".
export const Problem = () => `
  <section id="problem" class="pad-x section relative z-10 rounded-t-xl bg-panel">
    ${SectionHeader({ label: 'The problem', title: 'Cloud computing has a *problem*' })}
    <div class="mt-80 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${problems.map((p, i) => NumberedCard(p, i)).join('')}</div>
  </section>`
