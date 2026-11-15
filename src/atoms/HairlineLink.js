import { Arrow } from './Arrow.js'

// Atom: Hairline Link, uppercase tracked text with an iron underline.
export const HairlineLink = ({ label, href = '#', external = false, arrow = true }) =>
  `<a href="${href}" class="link t-label" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}><span>${label}</span>${arrow ? Arrow(10) : ''}</a>`
