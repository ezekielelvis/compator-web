import { routeTheme } from '../data/content.js'
import { Hero } from '../organisms/Hero.js'
import { WeAre } from '../organisms/WeAre.js'
import { Manifesto } from '../organisms/Manifesto.js'
// Problem now lives on the Technology page (see TechnologyPage.js). Kept out of the home flow on purpose.
// import { Problem } from '../organisms/Problem.js'
// Solution lives on the Technology page too (see TechnologyPage.js).
// import { Solution } from '../organisms/Solution.js'
import { Gateway } from '../organisms/Gateway.js'
import { PartnerFan } from '../organisms/PartnerFan.js'
import { Marquee } from '../organisms/Marquee.js'
import { Closing } from '../organisms/Closing.js'

// Page: organisms composed in order. Everything after the hero sits above it (z-10) so panels rise over it.
export const HomePage = {
  path: '/', theme: routeTheme.home, title: 'Compator Cloud | Efficient cloud computing', curtain: 'Home',
  render: () => `${Hero()}<div class="relative z-10">${WeAre()}${Manifesto()}<div aria-hidden="true" class="bg-paper" style="height:200vh"></div>${PartnerFan()}${Marquee()}${Gateway()}${Closing()}</div>`,
}
