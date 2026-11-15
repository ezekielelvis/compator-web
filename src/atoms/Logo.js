import logo from '../assets/compator-logo.png'

// Atom: the official Compator wordmark, used as supplied. With `collapse`, the header can clip it
// down to just the colour-wheel "C" on scroll (SVZ's wordmark-to-mark move).
export const Logo = ({ cls = 'h-7', collapse = false } = {}) => {
  const img = `<img src="${logo}" alt="Compator" width="815" height="173" class="${cls} w-auto" />`
  return collapse ? `<span data-logo class="inline-block" style="clip-path:inset(0 0 0 0)">${img}</span>` : img
}
