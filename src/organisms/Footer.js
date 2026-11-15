import { Logo } from '../atoms/Logo.js'
import { Label } from '../atoms/Label.js'
import { navGroups } from '../data/content.js'

// Organism: Footer. Pale wash, quiet link columns, and an oversized, barely-there wordmark
// cropped by the bottom edge (it rises into place on scroll, see animations/chrome.js).
export const Footer = () => `
  <footer id="site-footer" class="relative overflow-hidden bg-wash text-ink">
    <div class="pad-x pt-112 pb-48">
      <div class="grid gap-80 lg:grid-cols-[1fr_2.2fr]">
        <div>
          ${Logo({ cls: 'h-9' })}
          <p class="t-lead mt-6 max-w-[320px] text-muted">Compact hyperscale compute. Secure, sustainable and affordable cloud for the world.</p>
        </div>
        <nav class="grid grid-cols-2 gap-x-24 gap-y-48 md:grid-cols-4" aria-label="Footer">
          ${navGroups.map((g) => `
            <div>
              ${Label(g.title, { cls: 'text-muted' })}
              <ul class="mt-6 flex flex-col gap-3">${g.items.map((i) => `<li><a href="${i.href}" class="inline-block text-[16px] font-normal text-muted transition-[color,transform] duration-200 ease-out hover:translate-x-1 hover:text-ink">${i.label}</a></li>`).join('')}</ul>
            </div>`).join('')}
        </nav>
      </div>
      <div class="mt-112 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        ${Label(`© ${new Date().getFullYear()} Compator Cloud · compact hyperscale compute`, { cls: 'text-muted' })}
        <div class="flex items-center gap-48"><a href="#top" class="link t-label w-fit"><span>Back to top</span><svg class="arrow" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" aria-hidden="true"><path d="M2 10 10 2M3.5 2H10v6.5"/></svg></a></div>
      </div>
    </div>
    <div class="relative overflow-hidden" style="height:10.2vw" aria-hidden="true">
      <p data-footer-word class="pointer-events-none select-none whitespace-nowrap text-center font-bold uppercase text-wash-deep" style="font-size:17vw;line-height:0.82;letter-spacing:-0.055em">Compator</p>
    </div>
  </footer>`
