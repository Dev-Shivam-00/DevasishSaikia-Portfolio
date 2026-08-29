import 'server-only'
import nodemailer, { type Transporter } from 'nodemailer'
import type { ContactInput } from './validation'
import { projectTypeLabels } from './validation'

/** Reads only at call time so a missing var never breaks the build. */
interface SmtpConfig {
  host: string
  port: number
  user: string
  password: string
  to: string
  from: string
}

function readConfig(): SmtpConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } =
    process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return null
  }

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    user: SMTP_USER,
    password: SMTP_PASSWORD,
    to: CONTACT_TO_EMAIL,
    from: CONTACT_FROM_EMAIL,
  }
}

let cached: Transporter | null = null

function getTransport(config: SmtpConfig): Transporter {
  if (cached) return cached
  cached = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    // 465 is implicit TLS; anything else negotiates STARTTLS.
    secure: config.port === 465,
    auth: { user: config.user, pass: config.password },
  })
  return cached
}

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (c) =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;',
  )

function render(input: ContactInput): { text: string; html: string } {
  const rows: Array<[string, string]> = [
    ['Name', input.name],
    ['Email', input.email],
    ['Company', input.company || '—'],
    ['Project type', projectTypeLabels[input.projectType]],
    ['Budget', input.budget || '—'],
    ['Timeline', input.timeline || '—'],
  ]

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    input.message,
  ].join('\n')

  const html = `<div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;line-height:1.6;color:#111">
  <h2 style="font-size:16px;margin:0 0 16px">New enquiry — devasishsaikia.com</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
      )
      .join('')}
  </table>
  <p style="margin:20px 0 4px;color:#666">Message</p>
  <div style="white-space:pre-wrap;border-left:2px solid #ddd;padding-left:12px">${escapeHtml(input.message)}</div>
</div>`

  return { text, html }
}

/**
 * Returns false on any delivery failure. The caller must not leak which part
 * failed — or whether SMTP is configured at all — to the client.
 */
export async function sendContactEmail(input: ContactInput): Promise<boolean> {
  const config = readConfig()
  if (!config) {
    console.error('[contact] SMTP configuration incomplete; email not sent.')
    return false
  }

  const { text, html } = render(input)

  try {
    await getTransport(config).sendMail({
      from: `"${input.name.replace(/"/g, '')} via devasishsaikia.com" <${config.from}>`,
      to: config.to,
      replyTo: `${input.name.replace(/[<>"]/g, '')} <${input.email}>`,
      subject: `${projectTypeLabels[input.projectType]} — enquiry from ${input.name}`,
      text,
      html,
    })
    return true
  } catch (error) {
    console.error('[contact] SMTP delivery failed:', error)
    cached = null // force a fresh transport on the next attempt
    return false
  }
}
