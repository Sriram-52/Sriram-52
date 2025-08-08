import type { NextRequest } from "next/server"
import { z } from "zod"
import FormData from "form-data"
import Mailgun from "mailgun.js"

export const runtime = "nodejs"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
})

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function requiredEnv(name: string): string {
  const v = process.env[name]
  if (!v) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return v
}

export async function POST(req: NextRequest) {
  try {
    const body = contactSchema.safeParse(await req.json())
    if (!body.success) {
      return Response.json({ error: body.error.message }, { status: 400 })
    }

    const mailgunApiKey = requiredEnv("MAILGUN_API_KEY")
    const mailgunDomain = requiredEnv("MAILGUN_DOMAIN")
    const to = "Sriram Nyshadham <nyshadhamramu@gmail.com>"

    const subject = `Portfolio contact from ${escapeHtml(body.data.name)}`
    const html = `
      <div style="margin:0;padding:24px;background-color:#f6f9fc;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #eaeaea;border-radius:10px;overflow:hidden;">
          <div style="background:#0f172a;padding:16px 20px;">
            <h1 style="margin:0;font-size:18px;line-height:1.4;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif">New message from your portfolio</h1>
            <p style="margin:6px 0 0;color:#cbd5e1;font-size:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif">${escapeHtml(body.data.name)} &lt;${escapeHtml(body.data.email)}&gt;</p>
          </div>
          <div style="padding:20px;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif">
            <p style="margin:0 0 8px;font-size:16px;font-weight:600;">Message</p>
            <div style="white-space:pre-wrap;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:15px;line-height:1.6;color:#0f172a;">${escapeHtml(body.data.message)}</div>
            <hr style="border:none;border-top:1px solid #eaeaea;margin:20px 0;" />
            <p style="margin:0;color:#475569;font-size:14px;">
              <strong>From:</strong> ${escapeHtml(body.data.name)} &lt;${escapeHtml(body.data.email)}&gt;
            </p>
          </div>
          <div style="padding:12px 20px;background:#fafafa;border-top:1px solid #eaeaea;color:#64748b;font-size:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif">
            You can reply directly to this email to contact ${escapeHtml(body.data.name)}.
          </div>
        </div>
      </div>
    `

    const mailgun = new Mailgun(FormData)
    const mg = mailgun.client({
      username: "api",
      key: mailgunApiKey,
    })

    const data = await mg.messages.create(mailgunDomain, {
      from: `No-Reply <no-reply@mgsend.net>`,
      to: to,
      subject: subject,
      html: html,
    })
    console.log(data)

    return Response.json({ ok: true })
  } catch (error) {
    console.error("/api/contact POST error", error)
    return Response.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    )
  }
}
