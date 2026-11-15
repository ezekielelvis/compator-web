import { Arrow } from './Arrow.js'

// Atom: Ghost CTA Link. Uppercase 12px tracked, no fill/border, 45° arrow.
export const GhostLink = ({ label, href = '#', type, external = false }) => {
  const inner = `<span>${label}</span>${Arrow()}`
  return type
    ? `<button type="${type}" class="cta t-label">${inner}</button>`
    : `<a href="${href}" class="cta t-label" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${inner}</a>`
}
