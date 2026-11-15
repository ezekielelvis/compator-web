// Molecule: tracked-caps column header with stacked 12px sub-items (8px row gap).
export const NavGroup = ({ title, items }, { mobile = false } = {}) =>
  mobile
    ? `<div><p class="t-caption text-muted">${title}</p><ul class="mt-4 flex flex-col gap-2">${items.map((i) => `<li><a data-nav-close href="${i.href}" class="t-subheading text-ink">${i.label}</a></li>`).join('')}</ul></div>`
    : `<div><p class="t-caption text-muted">${title}</p><ul class="mt-2 flex flex-col gap-2">${items.map((i) => `<li><a href="${i.href}" data-cursor="Go" class="t-label text-muted transition-transform duration-300 hover:translate-x-1 inline-block">${i.label}</a></li>`).join('')}</ul></div>`
