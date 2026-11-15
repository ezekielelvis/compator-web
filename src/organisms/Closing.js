import { Label } from '../atoms/Label.js'
import { Shape } from '../atoms/Shape.js'
import { Arrow } from '../atoms/Arrow.js'

// Organism: closing call to action. A second hero (SVZ ends the page the way it starts) with figures that slide
// sideways as it passes, and one unmistakable primary action.
const fig = 'var(--color-fig)'
const mv = (html, m) => html.replace('<div ', `<div data-cmove="${m}" `)

export const Closing = () => `
  <section id="closing" class="pad-x relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-paper py-112 text-center">
    ${mv(Shape('triangle', { cls: 'left-[8vw] -top-[6vh] w-[26vw] max-w-[380px] rotate-[8deg]', color: fig, scroll: false }), '26,0,0')}
    ${mv(Shape('bar', { cls: 'right-[8vw] top-[16vh] w-[22vw] max-w-[340px] -rotate-[10deg]', color: fig, scroll: false }), '-30,0,0')}
    ${mv(Shape('ring', { cls: '-right-[5vw] bottom-[4vh] w-[26vw] max-w-[380px]', color: fig, scroll: false }), '-22,0,0')}
    ${mv(Shape('cross', { cls: '-left-[4vw] bottom-[6vh] w-[17vw] max-w-[250px] rotate-[12deg]', color: fig, scroll: false }), '28,0,0')}
    <div class="relative w-full max-w-[1100px]">
      ${Label('Let’s build it together', { cls: 'text-muted' })}
      <h2 class="t-hero mt-6" style="font-size:clamp(2.1rem,5vw,4.5rem)" aria-label="Bringing cloud to the communities that need it">
        <span class="block overflow-hidden pb-[0.1em]"><span data-close-line class="block"><em>bringing</em>cloud<em>to</em></span></span>
        <span class="block overflow-hidden pb-[0.1em]"><span data-close-line class="block">communities that need it</span></span>
      </h2>
      <p data-close-fade class="t-lead mx-auto mt-6 max-w-[520px] text-muted">Tell us where compute is needed. We will show you how little it takes to put it there.</p>
      <div data-close-fade class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a href="/contact" data-cursor="Let's talk" class="btn-solid t-label"><span>Start a conversation</span>${Arrow()}</a>
        <a href="/technology" class="link t-label"><span>See the technology</span>${Arrow()}</a>
      </div>
    </div>
  </section>`
