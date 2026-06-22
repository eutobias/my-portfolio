import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { contactFormValidation } from '@/validations/contactFormValidation'
import type { PayloadRequest } from 'payload'

export const contactHandler = async (req: PayloadRequest) => {
  if (req.method !== 'POST' || !req.json) {
    return Response.json({ message: 'Method not allowed' }, { status: 405 })
  }

  const data = (req.data ?? (await req.json())) as Record<string, string>
  const schema = await contactFormValidation(data)

  if (!schema.isValid) {
    return Response.json({ errors: schema.validationErrors }, { status: 400 })
  }

  const apiKey = process.env.MAIL_GUN_API_KEY || ''
  const sandboxDomain = process.env.MAIL_GUN_SANDBOX_DOMAIN || ''
  const mailTo = process.env.MAIL_TO || ''

  const mailSubject = 'Contact form of portfolio'
  const mailText = `
    Contact received from portfolio website

    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone}
    Message: ${data.message}
  `
  const mailHtml = `
  <html>
  <body>
  <h3>Portfolio Contact Form</h3>
  <p>Contact received from portfolio website</p>

  <ul>
    <li><strong>Name:</strong> ${data.name}</li>
    <li><strong>Email:</strong> ${data.email}</li>
    <li><strong>Phone:</strong> ${data.phone}</li>
    <li><strong>Message:</strong> ${data.message}</li>
  </ul>
  </body>
  </html>`

  const mailgun = new Mailgun(FormData)
  const mg = mailgun.client({
    username: 'api',
    key: apiKey,
  })
  try {
    await mg.messages.create(sandboxDomain, {
      from: `Portfolio <postmaster@${sandboxDomain}>`,
      to: [mailTo],
      subject: mailSubject,
      text: mailText,
      html: mailHtml,
    })

    return Response.json({ status: 200, message: 'Email sent successfully' })
  } catch {
    return Response.json({ status: 500, message: 'Email not sent' }, { status: 500 })
  }
}
