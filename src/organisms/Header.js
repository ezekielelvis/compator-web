import { Logo } from '../atoms/Logo.js'
import { OutlineButton } from '../atoms/OutlineButton.js'
import { Arrow } from '../atoms/Arrow.js'
import { NavGroup } from '../molecules/NavGroup.js'
import { navGroups } from '../data/content.js'

// Organism: Top Navigation. Fixed like SVZ: the wordmark collapses to the "C" and the nav columns tuck away once you scroll.
// Logo left, four tracked column groups centre, outlined button right.
export const Header = () => `
  <header id="site-header" class="pad-x fixed inset-x-0 top-0 z-40 grid grid-cols-[1fr_auto] items-start gap-8 py-3 max-lg:bg-[linear-gradient(to_bottom,var(--color-paper)_62%,transparent)] lg:grid-cols-[1fr_auto_1fr] lg:py-6">
    <a href="/" aria-label="Compator home" class="justify-self-start">${Logo({ collapse: true })}</a>
    <nav data-nav-cols class="hidden grid-cols-4 gap-48 lg:grid" aria-label="Primary">${navGroups.map((g) => NavGroup(g)).join('')}</nav>
    <div class="justify-self-end">
      <span class="hidden lg:inline-block">${OutlineButton({ label: 'Contact us', href: '/contact' })}</span>
      <span class="lg:hidden">${OutlineButton({ label: 'Menu', id: 'menu-btn' })}</span>
    </div>
  </header>
  <div id="mobile-menu" class="invisible fixed inset-0 z-50 overflow-hidden opacity-0 lg:hidden" aria-hidden="true">
  <div id="menu-panel" class="pad-x h-full overflow-y-auto bg-paper py-6">
    <div class="flex items-start justify-between">${Logo()}<button id="menu-close" class="btn-outline t-label">Close</button></div>
    <nav class="mt-48 grid gap-48" aria-label="Mobile">${navGroups.map((g) => NavGroup(g, { mobile: true })).join('')}
      <a data-nav-close href="/contact" class="btn-outline t-label w-fit"><span>Contact us</span>${Arrow()}</a>
    </nav>
  </div>
  </div>`
