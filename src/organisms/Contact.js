import { Label } from '../atoms/Label.js'
import { Heading } from '../atoms/Heading.js'
import { GhostLink } from '../atoms/GhostLink.js'
import { Dot } from '../atoms/Dot.js'
import { FormField } from '../molecules/FormField.js'
import { contactReasons } from '../data/content.js'

// Organism: contact. Front-end only; see animations/index.js initForm.
export const Contact = () => `
  <section id="contact" class="pad-x relative overflow-hidden bg-paper pb-112 pt-[200px]">
    <div class="relative">
      ${Label('Contact us', { cls: 'text-muted' })}
      <div data-reveal class="mt-6">${Heading('Time or treasure *speak up*', { size: 'display' })}</div>
      <div class="mt-80 grid gap-80 lg:grid-cols-[1fr_1.2fr]">
        <p data-reveal class="t-lead max-w-[480px] text-muted">Compator is built on philanthropic foundations. Explore AI Advisory, partner with us, join the team, or give your time or money. We’d love to hear from you.</p>
        <form id="contact-form" data-reveal novalidate>
          <div class="grid gap-6 sm:grid-cols-2">
            ${FormField({ id: 'first', label: 'First name' })}
            ${FormField({ id: 'last', label: 'Last name' })}
            ${FormField({ id: 'org', label: 'Organisation', span: 'sm:col-span-2' })}
            ${FormField({ id: 'email', label: 'Email', type: 'email', required: true, span: 'sm:col-span-2' })}
            ${FormField({ id: 'reason', label: 'Reason for contacting', required: true, options: contactReasons, span: 'sm:col-span-2' })}
            ${FormField({ id: 'comment', label: 'Comment', rows: 4, span: 'sm:col-span-2' })}
          </div>
          <p id="form-status" role="status" class="t-label mt-6 min-h-6 text-muted"></p>
          <div class="-ml-2 flex items-center gap-4">${GhostLink({ label: 'Send message', type: 'submit' })}${Dot()}</div>
        </form>
      </div>
    </div>
  </section>`
