// All copy is adapted from the existing compator.com site.
// Four column groups, mirrored in the header and footer (per DESIGN.md "Top Navigation").
export const navGroups = [
  { title: 'Company', items: [{ label: 'Purpose', href: '/company#purpose' }, { label: 'Team', href: '/company#team' }, { label: 'Policies', href: '/company#policies' }] },
  { title: 'Technology', items: [{ label: 'The problem', href: '/technology#problem' }, { label: 'The solution', href: '/technology#solution' }, { label: 'Micro-data centres', href: '/technology' }] },
  { title: 'Partners', items: [{ label: 'PwC', href: '/technology#partners' }, { label: 'xqizit', href: '/technology#partners' }, { label: 'Teledata ICT', href: '/technology#partners' }] },
  { title: 'AI Advisory', items: [{ label: 'Capabilities', href: '/ai-advisory' }, { label: 'Opportunity Sprint', href: '/ai-advisory#sprint' }, { label: 'Contact', href: '/contact' }] },
]

// Manifesto copy for the pinned scroll scene. [[double brackets]] mark keywords that fly into the list.
export const manifesto = 'We are a compact cloud company where technology meets purpose. We believe compute should reach every community, not only those beside a giant data centre. [[Secure]] by design, with data stored in-country and out of reach of foreign law. [[Sustainable]] because it needs no external cooling and sips power. [[Affordable]] because resources are shared and nothing is wasted. [[Sovereign]] and outside the US Cloud Act, so your data stays yours. [[Local]] with micro-data centres in schools, clinics and hospitals. [[Resilient]] even when the internet drops away. [[Shared]] so no capacity sits idle, and every watt does real work.'

export const gateways = [
  { title: 'Technology', text: 'Micro-data centres and the platform behind them', href: '/technology', color: 'var(--color-leaf)' },
  { title: 'AI Advisory', text: 'Measurable value within 90 days', href: '/ai-advisory', color: 'var(--color-orange)' },
  { title: 'Company', text: 'Purpose, team and policies', href: '/company', color: 'var(--color-navy)' },
  { title: 'Contact', text: 'Time or treasure, speak up', href: '/contact', color: 'var(--color-berry)' },
]

export const problems = [
  { title: 'Built like it’s 1980', text: 'Cloud still leans on desktop-era design that was never made for shared, efficient use.' },
  { title: 'You pay for what you don’t use', text: 'Customers buy more than they need, and idle machines sit unavailable to anyone else.' },
  { title: 'Wasteful by default', text: 'Energy and water are consumed around the clock, even when the machines are doing nothing.' },
  { title: 'Not really yours', text: 'Most large US vendors fall under the US Cloud Act, putting your data’s sovereignty in question.' },
]

export const solutions = [
  { title: 'Private by design', text: 'Secure from the ground up, with data stored in-country and outside the US Cloud Act.' },
  { title: 'No external cooling', text: 'Far lower power and water use, so more capacity is delivered at a lower cost.' },
  { title: 'Efficient shared resources', text: 'Resources scale in real time and are shared, so nothing sits idle and nothing is over-bought.' },
  { title: 'Delivered locally', text: 'No lengthy infrastructure projects. Compute is provided where it is actually needed.' },
]

export const stats = [
  { value: 0, suffix: '', label: 'External cooling required' },
  { value: 90, suffix: ' days', label: 'To measurable AI value' },
  { value: 3, suffix: '', label: 'Countries hiring: Ghana, The Gambia, UK' },
  { value: 45000, suffix: '+', label: 'Users served by our connectivity partner' },
]

export const whyCompator = [
  { title: 'The Opportunity', text: 'Energy reduction changes the economics of cloud.' },
  { title: 'The Team', text: 'Deep industry expertise, led by an entrepreneur with three previous start-ups.' },
  { title: 'The Ecosystem', text: 'Commercial, educational, government and UN partners and supporters.' },
  { title: 'The Approach', text: 'Local teams delivering attractively priced, sovereign service.' },
]

export const techBenefits = [
  'Delivered exactly where access is needed',
  'No costly infrastructure build',
  'No cooling required',
  'No permanent internet connection needed',
  'Creates resilient local networks',
]

export const mdcSteps = [
  { title: 'Place a micro-data centre', text: 'MDCs go into places like schools and hospitals.' },
  { title: 'Link the local network', text: 'They join a local Compator Cloud that can connect to the internet when it needs to.' },
  { title: 'Ease the bandwidth', text: 'Less pressure on limited bandwidth, with educational materials and medical equipment data held on site.' },
  { title: 'Grow local talent', text: 'Software engineers are trained on the new programming language to build a library of apps.' },
]

export const partners = [
  { name: 'PwC', role: 'Strategic advisory', text: 'A pivotal partner, opening doors for field rollout across the Global South.', url: 'https://www.pwc.com' },
  { name: 'xqizit', role: 'Low-energy computing', text: 'Our key technology partner. Its cloud scales resources in real time and is tied to a revolutionary programming language.', url: 'https://xqizit.com' },
  { name: 'Teledata ICT Ghana', role: 'Internet service provider', text: 'Serves 2,000+ business clients and 45,000 users, and supports wireless connectivity to our mini data centre network.', url: 'https://teledataict.com' },
]

export const team = [
  { name: 'Philip Miller', role: 'CEO and Founder' },
  { name: 'Elizabeth Squire', role: 'Chief Operating Officer' },
  { name: 'Matt Poulter', role: 'Chief Product Officer' },
  { name: 'Stephen Stringer', role: 'Chief Technology Officer' },
  { name: 'Michael Raasch', role: 'Head of Engineering' },
  { name: 'Cameron Purdy', role: 'Associate' },
]

export const aiCapabilities = [
  { title: 'Advisory', items: ['AI strategy', 'Use-case identification', 'ROI modelling'] },
  { title: 'Delivery', items: ['Programme execution', 'Process redesign', 'Change management'] },
  { title: 'Data & Engineering', items: ['Data platforms', 'Cloud enablement', 'Integrations and APIs'] },
  { title: 'GenAI & Product', items: ['Copilots', 'Automation tools', 'AI platforms'] },
  { title: 'Governance', items: ['Risk management', 'Compliance', 'Security controls'] },
]

export const aiUseAreas = ['Process automation', 'Data and insights', 'Customer experience', 'Predictive operations', 'AI-driven products', 'Risk and compliance']

export const sprint = ['Identify use cases', 'Define quick wins', 'Quantify ROI', 'Build a roadmap']

export const policies = [
  { title: 'Anti-bribery and corruption', href: 'https://www.compator.com/wp-content/uploads/2025/06/Anti-Bribery-policy.pdf' },
  { title: 'Anti-slavery statement', href: 'https://www.compator.com/wp-content/uploads/2025/06/Statement-for-anti-slavery.pdf' },
]

export const contactReasons = [
  'Learn about the AI Advisory offering',
  'Keen to learn more',
  'Technology partner',
  'Be part of the team',
  'Time or treasure to give',
  'Other',
]


// One signature colour per page (from the logo). `on` is the text colour that stays legible on it.
export const routeTheme = {
  home: { color: 'var(--color-magenta)', on: '#fff' },
  technology: { color: 'var(--color-leaf)', on: '#fff' },
  ai: { color: 'var(--color-orange)', on: 'var(--color-ink)' },
  company: { color: 'var(--color-navy)', on: '#fff' },
  contact: { color: 'var(--color-berry)', on: '#fff' },
}
