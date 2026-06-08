import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import config from '@/payload.config'

export default async function ContactPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const contact = await payload.findGlobal({ slug: 'contact', depth: 1 }).catch(() => null)
  if (!contact) return notFound()

  const { title, intro, contactInfo, contactForm, modalConfirmation, modalError } = contact

  return (
    <main>
      {/* Intro */}
      <section>
        <h1>{title}</h1>
        <RichText data={intro} />
      </section>

      {/* Contact Info */}
      <section>
        <h2>{contactInfo.title}</h2>
        <ul>
          <li>
            <span>{contactInfo.email.icon}</span>
            {contactInfo.email.href ? (
              <a href={contactInfo.email.href}>{contactInfo.email.value}</a>
            ) : (
              <span>{contactInfo.email.value}</span>
            )}
          </li>
          <li>
            <span>{contactInfo.phone.icon}</span>
            {contactInfo.phone.href ? (
              <a href={contactInfo.phone.href}>{contactInfo.phone.value}</a>
            ) : (
              <span>{contactInfo.phone.value}</span>
            )}
          </li>
          <li>
            <span>{contactInfo.whatsapp.icon}</span>
            {contactInfo.whatsapp.href ? (
              <a href={contactInfo.whatsapp.href}>{contactInfo.whatsapp.value}</a>
            ) : (
              <span>{contactInfo.whatsapp.value}</span>
            )}
          </li>
        </ul>
        <p>
          <strong>{contactInfo.answerTime.title}</strong> {contactInfo.answerTime.text}
        </p>
      </section>

      {/* Contact Form */}
      <section>
        <form>
          <div>
            <label>{contactForm.name.label}</label>
            <input name="name" type="text" placeholder={contactForm.name.placeholder} />
          </div>
          <div>
            <label>{contactForm.email.label}</label>
            <input name="email" type="email" placeholder={contactForm.email.placeholder} />
          </div>
          <div>
            <label>{contactForm.phone.label}</label>
            <input name="phone" type="tel" placeholder={contactForm.phone.placeholder} />
          </div>
          <div>
            <label>{contactForm.message.label}</label>
            <textarea name="message" placeholder={contactForm.message.placeholder} />
          </div>
          <button type="submit">{modalConfirmation.label}</button>
        </form>

        {/* Modal data available for client-side use */}
        <script
          type="application/json"
          id="modal-confirmation"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(modalConfirmation),
          }}
        />
        <script
          type="application/json"
          id="modal-error"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(modalError),
          }}
        />
      </section>
    </main>
  )
}
