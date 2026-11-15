// Atom: Decorative Background Shape (oversized geometric forms bleeding off canvas).
// Outer wrapper takes position/size + scroll/pointer parallax; inner SVG drifts on its own.
const shapes = {
  cross: { vb: '0 0 200 200', d: '<path d="M80 0h40v80h80v40h-80v80H80v-80H0V80h80z"/>' },
  crossHole: { vb: '0 0 200 200', d: '<path fill-rule="evenodd" d="M80 0h40v80h80v40h-80v80H80v-80H0V80h80zM100 80a20 20 0 1 0 0 40 20 20 0 0 0 0-40z"/>' },
  arrow: { vb: '0 0 200 200', d: '<path d="M20 160 150 30v70h30V0H80v30h70L0 140z"/>' },
  ring: { vb: '0 0 200 200', d: '<path fill-rule="evenodd" d="M100 0a100 100 0 1 0 0 200 100 100 0 0 0 0-200zm0 40a60 60 0 1 1 0 120 60 60 0 0 1 0-120z"/>' },
  triangle: { vb: '0 0 200 200', d: '<path d="M0 200 100 20l100 180z"/>' },
  bar: { vb: '0 0 200 24', d: '<rect width="200" height="24"/>' },
  block: { vb: '0 0 80 240', d: '<rect width="80" height="240"/>' },
  half: { vb: '0 0 100 200', d: '<path d="M0 0a100 100 0 0 1 0 200z"/>' },
}

export const Shape = (kind, { cls = '', color = 'var(--color-magenta)', opacity = 1, depth = 0, scroll = true, drift = false, move = '' } = {}) => {
  const { vb, d } = shapes[kind]
  return `<div ${scroll ? 'data-parallax' : ''} ${depth ? `data-depth="${depth}"` : ''} ${move ? `data-move="${move}"` : ''} class="fig pointer-events-none absolute select-none ${cls}">
    <svg ${drift ? 'data-drift' : ''} aria-hidden="true" viewBox="${vb}" fill="${color}" fill-opacity="${opacity}" class="block size-full">${d}</svg></div>`
}

