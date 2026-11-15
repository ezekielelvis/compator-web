// Molecule: tracked label + hairline input / select / textarea.
export const FormField = ({ id, label, type = 'text', required = false, options, rows, span = '' }) => {
  const control = options
    ? `<select id="${id}" name="${id}" ${required ? 'required' : ''} class="field"><option value="">Choose one…</option>${options.map((o) => `<option>${o}</option>`).join('')}</select>`
    : rows
      ? `<textarea id="${id}" name="${id}" rows="${rows}" class="field"></textarea>`
      : `<input id="${id}" name="${id}" type="${type}" ${required ? 'required' : ''} class="field" />`
  return `<div class="${span}"><label for="${id}" class="t-caption mb-2 block text-muted">${label}${required ? ' *' : ''}</label>${control}</div>`
}
