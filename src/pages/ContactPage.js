import { routeTheme } from '../data/content.js'
import { Contact } from '../organisms/Contact.js'

export const ContactPage = {
  path: '/contact', theme: routeTheme.contact, title: 'Contact | Compator Cloud', curtain: 'Contact',
  render: () => Contact(),
}
