// Atom: display / heading. Wrap words in *asterisks* for the serif-italic connective.
const fmt = (t) => t.replace(/\*(.+?)\*/g, '<em>$1</em>')

export const Heading = (text, { size = 'heading', level = 2, cls = '', attrs = '' } = {}) =>
  `<h${level} ${attrs} class="t-${size} ${cls}">${fmt(text)}</h${level}>`
