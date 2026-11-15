import { routeTheme } from '../data/content.js'
import { PageHero, Rise } from '../organisms/PageHero.js'
import { Technology } from '../organisms/Technology.js'
import { Partners } from '../organisms/Partners.js'
import { Problem } from '../organisms/Problem.js'
import { Solution } from '../organisms/Solution.js'

export const TechnologyPage = {
  path: '/technology', theme: routeTheme.technology, title: 'Technology | Compator Cloud', curtain: 'Technology',
  render: () => PageHero({ label: 'Technology', title: 'Technology', text: 'Micro-data centres that bring secure, sovereign compute to the places that need it, with no cooling and no giant data centres.' }) + Rise(Technology() + Problem() + Solution() + Partners()),
}
