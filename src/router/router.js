import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HomePage } from '../pages/HomePage.js'
import { TechnologyPage } from '../pages/TechnologyPage.js'
import { AiAdvisoryPage } from '../pages/AiAdvisoryPage.js'
import { CompanyPage } from '../pages/CompanyPage.js'
import { ContactPage } from '../pages/ContactPage.js'
import { mountPage } from '../animations/scenes.js'
import { intro, leave, reveal } from '../animations/transition.js'
import { scrollToTarget } from '../animations/smooth.js'
import { motionOn } from '../animations/motion.js'

// Tiny History-API router. Internal links swap #page behind the curtain transition.
// The site may be served under a sub-path (GitHub Pages): routes are matched on the path with that base removed,
// and history entries are written with it put back.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const appPath = (p) => (BASE && p.startsWith(BASE) ? p.slice(BASE.length) : p) || '/'
const routes = [HomePage, TechnologyPage, AiAdvisoryPage, CompanyPage, ContactPage]
const match = (path) => routes.find((r) => r.path === (path.replace(/\/+$/, '') || '/')) ?? HomePage
const pageEl = () => document.getElementById('page')

let current = null, mounted = null, busy = false

// The page's signature colour drives the dot, cursor, hover bars, featured cell, link/field states
function applyTheme(route) {
  const r = document.documentElement.style
  r.setProperty('--page', route.theme.color)
  r.setProperty('--on-page', route.theme.on)
}

function swap(route) {
  mounted?.destroy()
  current = route
  applyTheme(route)
  pageEl().innerHTML = route.render()
  document.title = route.title
  mounted = mountPage(pageEl())
}

const settle = (hash) => {
  ScrollTrigger.refresh()
  hash ? scrollToTarget(hash, { immediate: true }) : scrollToTarget(0, { immediate: true })
}

async function go(href, push = true) {
  if (busy) return
  const url = new URL(href, location.origin), route = match(url.pathname)
  if (route === current) {
    if (push) history.pushState({}, '', BASE + url.pathname + url.hash)
    scrollToTarget(url.hash || 0)
    return
  }
  busy = true
  const animate = motionOn()
  if (animate) await leave(route.curtain, pageEl(), route.theme)
  swap(route)
  if (push) history.pushState({}, '', BASE + url.pathname + url.hash)
  settle(url.hash)
  if (animate) await reveal(pageEl(), () => { mounted.enter(); ScrollTrigger.refresh() })
  else mounted.enter()
  ScrollTrigger.refresh()
  busy = false
}

export async function startRouter() {
  swap(match(appPath(location.pathname)))
  const hash = location.hash
  const lift = () => { mounted.enter(); settle(hash) }
  if (motionOn()) await intro(lift, current.theme)
  else { document.getElementById('curtain').style.display = 'none'; lift() }
  document.fonts?.ready.then(() => ScrollTrigger.refresh())

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]')
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return
    const href = a.getAttribute('href')
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = href.length > 1 && href !== '#top' ? document.querySelector(href) : null
      scrollToTarget(el ?? 0)
    } else if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault()
      go(href)
    }
  })
  window.addEventListener('popstate', () => go(appPath(location.pathname) + location.hash, false))
}
