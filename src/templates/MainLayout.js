import { Header } from '../organisms/Header.js'
import { Footer } from '../organisms/Footer.js'
import { Dot } from '../atoms/Dot.js'

// Template: persistent shell. Header, footer, cursor and the transition curtain stay mounted;
// only #page is swapped by the router.
export const MainLayout = () => `
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">Skip to content</a>
  ${Header()}
  <main id="main"><div id="page"></div></main>
  ${Footer()}
  <div id="curtain" class="fixed inset-0 z-[80] overflow-hidden" style="pointer-events:all" aria-hidden="true">
    <div id="curtain-panel" class="absolute inset-0 flex flex-col items-center justify-center rounded-t-xl" style="background:var(--color-magenta);color:#fff">
      <p class="t-caption mb-6">Compator Cloud</p>
      <p id="curtain-title" class="t-display-xl px-6 text-center"></p>
      <span class="mt-10">${Dot('!bg-current')}</span>
    </div>
  </div>
  <div id="cursor" class="dot pointer-events-none fixed left-0 top-0 z-[90] hidden !size-4" aria-hidden="true"></div>`
