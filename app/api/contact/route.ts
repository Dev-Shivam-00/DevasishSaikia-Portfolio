import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'
import { contactSchema } from '@/lib/validation'
import { clientKey, rateLimit } from '@/lib/rate-limit'
import type { ContactResponse } from '@/types/contact'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const GENERIC_ERROR = 'Something went wrong. Please try again.'

const json = (body: ContactResponse, status: number, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers })

export async function POST(request: Request): Promise<NextResponse<ContactResponse>> {
  const limit = rateLimit(clientKey(request.headers))
  if (!limit.allowed) {
    return json(
      { ok: false, message: 'Too many messages just now. Please try again shortly.' },
      429,
      { 'Retry-After': String(limit.retryAfter) },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, message: GENERIC_ERROR }, 400)
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return json({ ok: false, message: first?.message ?? GENERIC_ERROR }, 400)
  }

  // Honeypot tripped — accept silently so the bot learns nothing.
  if (parsed.data.website) {
    return json({ ok: true, message: 'Message sent. Thank you.' }, 200)
  }

  const sent = await sendContactEmail(parsed.data)
  if (!sent) {
    // Deliberately identical to any other failure: never reveal whether SMTP
    // is configured on this deployment.
    return json({ ok: false, message: GENERIC_ERROR }, 502)
  }

  return json({ ok: true, message: 'Message sent. Thank you.' }, 200)
}
