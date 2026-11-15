// Molecule: manifesto paragraph split into word spans; [[keywords]] are marked for the scroll scene.
export const KeywordWords = (text) => {
  const out = []
  text.split(/(\[\[.+?\]\])/).forEach((chunk) => {
    const kw = chunk.match(/^\[\[(.+)\]\]$/)
    if (kw) out.push(`<span class="w kw" data-kw>${kw[1]}</span>`)
    else chunk.split(/\s+/).filter(Boolean).forEach((w) => out.push(`<span class="w">${w}</span>`))
  })
  return out.join(' ')
}
