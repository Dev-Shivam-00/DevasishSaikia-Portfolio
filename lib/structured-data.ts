import { site } from '@/data/site'

/**
 * JSON-LD limited to facts the source material supports. No awards, no
 * credentials, no invented affiliations.
 */
export function buildStructuredData(): string {
  const person = {
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.name,
    jobTitle: site.role,
    description:
      'AI filmmaker and creative director working across AI films, AI advertising and cinematic storytelling.',
    url: site.url,
    worksFor: { '@id': `${site.url}/#organization` },
    sameAs: [site.linkedinUrl, site.companyUrl].filter((u): u is string => Boolean(u)),
    knowsAbout: [
      'AI films',
      'AI advertising',
      'Creative direction',
      'Visual storytelling',
      'Brand strategy',
      'Cinematography',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressCountry: 'IN',
    },
  }

  const organization = {
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.company,
    url: site.companyUrl,
    founder: { '@id': `${site.url}/#person` },
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: `${site.name} — AI Films, AI Advertising & Creative Direction`,
    inLanguage: 'en',
    publisher: { '@id': `${site.url}/#person` },
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [person, organization, website] })
}
