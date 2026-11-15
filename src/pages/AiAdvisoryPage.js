import { routeTheme } from '../data/content.js'
import { PageHero, Rise } from '../organisms/PageHero.js'
import { AiAdvisory } from '../organisms/AiAdvisory.js'

export const AiAdvisoryPage = {
  path: '/ai-advisory', theme: routeTheme.ai, title: 'AI Advisory | Compator Cloud', curtain: 'AI Advisory',
  render: () => PageHero({ label: 'AI Advisory', title: 'AI advisory', text: 'Outcome-driven AI that reduces cost, improves productivity and unlocks revenue.' }) + Rise(AiAdvisory()),
}
