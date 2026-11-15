// Organism: the "WE aRE" sheet. Frosted grey (translucent + heavy backdrop blur) so the hero smears through it,
// rounded top, rises over the static hero. The three type pieces converge as it rises, then the whole wordmark zooms
// into the R (scenes.js). The letters stay near-black, so as the sheet darkens to the manifesto's ground they merge with it.
export const WeAre = () => `
  <section id="weare" data-rise class="pad-x relative flex min-h-screen flex-col items-center justify-center overflow-hidden rounded-t-xl bg-[rgba(92,90,86,0.46)] text-[#080808] backdrop-blur-[26px] backdrop-saturate-150">
    <div data-weare class="w-full text-center">
      <h2 data-invert class="t-mega flex items-baseline justify-center" aria-label="We are">
        <span data-weare-piece="left">WE</span>
        <span data-weare-piece="accent" class="font-dirtyline-36-daysoftype-2022 mx-[0.04em] inline-block text-[1.6em] font-normal normal-case italic leading-[0.5] tracking-[-0.03em]">a</span>
        <span data-weare-piece="right">RE</span>
      </h2>
    </div>
  </section>`
