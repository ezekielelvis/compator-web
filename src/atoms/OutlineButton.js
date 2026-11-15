import { Arrow } from './Arrow.js'

// Atom: Discovery-Call outlined button (1px #d4d2d2, 8px radius, 12px 24px padding).
export const OutlineButton = ({ label, href = '#', id = '' }) =>
  id
    ? `<button id="${id}" class="btn-outline t-label"><span>${label}</span></button>`
    : `<a href="${href}" data-cursor="Let's talk" class="btn-outline t-label"><span>${label}</span>${Arrow()}</a>`
