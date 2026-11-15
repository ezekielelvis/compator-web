import { SectionHeader } from '../molecules/SectionHeader.js'
import { CapabilityCard } from '../molecules/CapabilityCard.js'
import { Label } from '../atoms/Label.js'
import { GhostLink } from '../atoms/GhostLink.js'
import { Dot } from '../atoms/Dot.js'
import { aiCapabilities, aiUseAreas, sprint } from '../data/content.js'

// Organism: AI Advisory. The sprint is the second (and last) red-bordered featured card.
export const AiAdvisory = () => `
  <section id="ai" class="pad-x section bg-panel">
    ${SectionHeader({ label: 'AI Advisory', title: 'AI transformation for *measurable* growth', text: 'Outcome-driven AI that reduces cost, improves productivity and unlocks revenue. Commercial focus, senior-led execution, speed to value, practical implementation.' })}
    <div data-reveal class="mt-80 flex flex-wrap gap-x-48 gap-y-4 border-y border-line py-6">${aiUseAreas.map((a) => Label(a, { cls: 'text-muted' })).join('')}</div>
    <div class="mt-48 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      ${aiCapabilities.map(CapabilityCard).join('')}
      <article id="sprint" data-reveal class="cell-feature flex min-h-[300px] flex-col">
        <div class="flex items-center justify-between">${Label('Where we start', { cls: 'opacity-80' })}<span class="dot !bg-current"></span></div>
        <h3 class="t-subheading mt-48">The AI Opportunity Sprint</h3>
        <ul class="t-body mt-6 opacity-90">${sprint.map((s) => `<li class="border-t border-current/25 py-2">${s}</li>`).join('')}</ul>
        <p class="t-body mt-6">Measurable value within 90 days.</p>
        <div class="-ml-2 mt-auto">${GhostLink({ label: 'Contact Compator', href: '/contact' })}</div>
      </article>
    </div>
  </section>`
