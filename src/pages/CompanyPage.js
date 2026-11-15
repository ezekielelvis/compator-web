import { routeTheme } from '../data/content.js'
import { PageHero, Rise } from '../organisms/PageHero.js'
import { Purpose } from '../organisms/Purpose.js'
import { Team } from '../organisms/Team.js'
import { Policies } from '../organisms/Policies.js'

export const CompanyPage = {
  path: '/company', theme: routeTheme.company, title: 'Company | Compator Cloud', curtain: 'Company',
  render: () => PageHero({ label: 'Company', title: 'Company', text: 'Built on philanthropic foundations, with London cloud expertise and in-country teams.' }) + Rise(Purpose() + Team() + Policies()),
}
