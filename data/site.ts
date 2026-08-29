/**
 * Verified identity facts only — nothing inferred or embellished.
 *
 * ── CONFIRM BEFORE LAUNCH ────────────────────────────────────────────────
 * `email`, `linkedinUrl` and `NEXT_PUBLIC_SITE_URL` are unset: they were not
 * established by the source material, and the UI omits any that stays null
 * rather than shipping a guess that dead-ends a visitor.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const site = {
  firstName: 'DEVASISH',
  lastName: 'SAIKIA',
  name: 'Devasish Saikia',
  role: 'Founder / Director',
  company: 'Orglife Industries Private Limited',
  companyShort: 'Orglife Industries',
  companyUrl: 'https://orglife.vercel.app',

  /** TODO: set the public enquiry address. */
  email: null as string | null,
  /** TODO: set the full LinkedIn profile URL. */
  linkedinUrl: null as string | null,

  location: 'AHMEDABAD, INDIA',
  /** Ahmedabad — a fixed value, so the header needs no third-party weather API. */
  coordinates: '23° 1\' 21.6" N',
  timeZone: 'Asia/Kolkata',
  yearsExperience: '13+',

  /** TODO: set NEXT_PUBLIC_SITE_URL to the production domain before deploying. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  availability: 'AVAILABLE FOR COMMISSIONS',
  disciplinePrimary: 'AI FILMMAKER',
  disciplineSecondary: '+ CREATIVE DIRECTOR',
} as const

export const externalLinks = (): ReadonlyArray<{ label: string; href: string }> =>
  [
    site.linkedinUrl ? { label: 'LinkedIn', href: site.linkedinUrl } : null,
    { label: 'Orglife', href: site.companyUrl },
  ].filter((l): l is { label: string; href: string } => l !== null)
