import { contactFormValidation } from "@/validations/contactFormValidations";
import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import Mailgun from "mailgun.js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const apiKey = process.env.MAIL_GUN_API_KEY || "";
  const sandboxDomain = process.env.MAIL_GUN_SANDBOX_DOMAIN || "";
  const mailTo = process.env.MAIL_TO || "";

  const mailSubject = "Contact form of portfolio";
  const mailText = `
    Contact received from portfolio website

    Name: ${req.body.name}
    Email: ${req.body.email}
    Phone: ${req.body.phone}
    Message: ${req.body.message}
  `;
  const mailHtml = `
  <html>
  <body>
  <h3>Portfolio Contact Form</h3>
  <p>Contact received from portfolio website</p>

  <ul>
    <li><strong>Name:</strong> ${req.body.name}</li>
    <li><strong>Email:</strong> ${req.body.email}</li>
    <li><strong>Phone:</strong> ${req.body.phone}</li>
    <li><strong>Message:</strong> ${req.body.message}</li>
  </ul>
  </body>
  </html>`;

  const schema = await contactFormValidation(
    req.body as Record<string, string>
  );

  if (!schema.isValid) {
    return res.status(400).json({ errors: schema.validationErrors });
  }

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: apiKey,
  });
  try {
    await mg.messages.create(sandboxDomain, {
      from: `Sandbox <postmaster@${sandboxDomain}>`,
      to: [mailTo],
      subject: mailSubject,
      text: mailText,
      html: mailHtml,
    });

    return res.status(200).json({status: 200, message: "Email sent successfully"});
  } catch {
    return res.status(500).json({status: 500, message: "Email not sent"});
  }
}
