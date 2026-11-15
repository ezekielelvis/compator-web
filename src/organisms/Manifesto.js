import { KeywordWords } from '../molecules/KeywordWords.js'
import { OutlineButton } from '../atoms/OutlineButton.js'
import { Dot } from '../atoms/Dot.js'
import { manifesto } from '../data/content.js'

// Organism: pinned manifesto on near-black. It is what "WE aRE" zooms into (scenes.js): the R fills the screen, the sheet
// goes dark, and this paragraph rises out of the black. It overlaps the end of the zoom (-75vh) so it starts rising the
// moment the screen goes black. The plain words fade in a wave and the keywords themselves zoom into a big centred stack;
// the button waits below it.
export const Manifesto = () => `
  <section id="manifesto" class="pad-x relative z-10 -mt-[75vh] flex min-h-screen items-center justify-center overflow-hidden bg-paper py-80 text-ink">
    <p data-manifesto class="t-subheading relative z-10 max-w-[min(1180px,88vw)] text-justify font-light uppercase [text-wrap:pretty] md:!text-[clamp(28px,2.8vw,46px)] md:!leading-[1.1] [&_.kw]:font-normal [&_.kw]:text-[var(--page)]">${KeywordWords(manifesto)}</p>
    <div data-kw-cta class="absolute inset-x-0 top-[82%] z-10 flex items-center justify-center gap-4"><span class="text-ink">${OutlineButton({ label: 'Explore the technology', href: '/technology' })}</span>${Dot()}</div>
  </section>`
