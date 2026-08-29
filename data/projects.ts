import type { Project } from '@/types/portfolio'

/**
 * PORTFOLIO SLOTS.
 *
 * The media is real — these are Orglife's own AI Film, AI Ad Campaign and
 * brand-film assets, consumed from their live URLs. Titles are marked
 * placeholders because no confirmed project names were supplied; replace the
 * `title`, `year` and `client` fields and nothing else has to change.
 */
export const projects: readonly Project[] = [
  {
    slug: 'ai-film-01',
    title: 'AI FILM — PROJECT 01',
    category: 'AI Film',
    description: 'Cinematic sequence directed and produced through AI-enabled workflows.',
    media: 'aiFilms',
    featured: true,
  },
  {
    slug: 'ai-advertising-01',
    title: 'AI ADVERTISEMENT — PROJECT 02',
    category: 'AI Advertising',
    description: 'Brand campaign built as a multi-format AI storytelling concept.',
    media: 'aiAdCampaigns',
    featured: true,
  },
  {
    slug: 'ai-brand-platform-01',
    title: 'AI BRAND PLATFORM — PROJECT 03',
    category: 'Creative Direction',
    description: 'Brand world developed as an AI-native visual system.',
    media: 'aigio',
    featured: true,
  },
  {
    slug: 'brand-film-01',
    title: 'BRAND FILM — PROJECT 04',
    category: 'AI Film',
    description: 'Long-form brand narrative shaped for screen.',
    media: 'reelPrimary',
    featured: true,
  },
  {
    slug: 'brand-film-02',
    title: 'BRAND FILM — PROJECT 05',
    category: 'Creative Direction',
    description: 'Concept, visual language and direction across a campaign cycle.',
    media: 'reelSecondary',
    featured: true,
  },
  {
    slug: 'campaign-01',
    title: 'CAMPAIGN — PROJECT 06',
    category: 'AI Advertising',
    description: 'Future-facing brand story told across formats.',
    media: 'investInTomorrow',
    featured: true,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
