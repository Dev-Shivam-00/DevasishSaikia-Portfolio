import type { CareerEntry, Expertise, FaqItem, ProcessStep } from '@/types/portfolio'

/**
 * WHAT I CREATE — the three commercial offerings. Everything else in the
 * career is supporting credibility, not a service card.
 */
export const expertise: readonly Expertise[] = [
  {
    id: 'ai-films',
    title: 'AI FILMS',
    summary: 'Cinematic stories imagined through human direction and expanded through artificial intelligence.',
    detail:
      'A film still begins the way it always did — with an idea worth the screen time. What changes is what happens after: AI-enabled production makes worlds, scale and shots reachable that a schedule and a location scout would once have ruled out. The direction leads. The technology carries it.',
    points: ['Concept & narrative', 'Visual language', 'AI-enabled production', 'Edit & finish'],
  },
  {
    id: 'ai-advertising',
    title: 'AI ADVERTISING',
    summary: 'Brand films and advertising concepts for a world where production possibilities are no longer the limit.',
    detail:
      'Most advertising ideas are not rejected for being weak. They are rejected for being unaffordable — the build, the location, the impossible shot. AI moves that line, and the work becomes about the idea again rather than the budget around it.',
    points: ['Campaign concept', 'Cinematic product narrative', 'Multi-format delivery', 'Variation without re-shooting'],
  },
  {
    id: 'creative-direction',
    title: 'CREATIVE DIRECTION',
    summary: 'Concept development, narrative thinking and visual direction across films and advertising.',
    detail:
      'Thirteen years across brand strategy, communication and content sit underneath this — the part that decides what a story is for before deciding what it looks like.',
    points: ['Brand narrative', 'Art direction', 'Creative strategy', 'Production oversight'],
  },
]

/** Career history exactly as stated in the supplied LinkedIn source material. */
export const career: readonly CareerEntry[] = [
  {
    organisation: 'ORGLIFE INDUSTRIES',
    role: 'FOUNDER / DIRECTOR',
    period: '2017 - PRESENT',
    description:
      'Founded and directs a creative and technology-led brand studio, working across brand storytelling, content and AI-driven production.',
  },
  {
    organisation: 'GROUP LANDMARK',
    role: 'BRAND STRATEGIST',
    period: '2015 - 2017',
    description: 'Brand strategy and positioning work across the group’s automotive retail portfolio.',
  },
  {
    organisation: 'MAXPOSURE LIMITED',
    role: 'REGIONAL MANAGER',
    period: '2013 - 2015',
    description: 'Regional responsibility across media, content and client partnerships.',
  },
  {
    organisation: 'MEDIA TRANSAASIA INDIA',
    role: 'MARKETING MANAGER',
    period: '2011 - 2013',
    description: 'Marketing and communication for a publishing and media business.',
  },
]

/**
 * Current consultancy engagements. This fills the template's "Awards" block —
 * the layout is kept, the content is factual, and no award is invented.
 */
export const engagements: readonly CareerEntry[] = [
  {
    organisation: 'INDIAN ARMY',
    role: 'CONTENT MANAGEMENT CONSULTANT',
    period: '2022 - PRESENT',
    description: 'Content management consulting.',
  },
  {
    organisation: 'KARNAVATI UNIVERSITY',
    role: 'CONTENT CONSULTANT & BRAND GROWTH SPECIALIST',
    period: '2021 - PRESENT',
    description: 'Content consulting and brand growth.',
  },
  {
    organisation: 'ORGLIFE INDUSTRIES',
    role: 'FOUNDER / DIRECTOR',
    period: '2017 - PRESENT',
    description: 'Creative and technology-led brand studio.',
  },
]

export const processSteps: readonly ProcessStep[] = [
  {
    index: '01',
    title: 'IDEA',
    discipline: 'CONCEPT & NARRATIVE',
    description: 'What the story is, and why it deserves to exist before anything is made.',
  },
  {
    index: '02',
    title: 'WORLD',
    discipline: 'VISUAL LANGUAGE',
    description: 'Atmosphere, palette and cinematic direction — the rules the film will live by.',
  },
  {
    index: '03',
    title: 'GENERATE',
    discipline: 'AI-ASSISTED PRODUCTION',
    description: 'Visual exploration run against the direction rather than in place of it.',
  },
  {
    index: '04',
    title: 'DIRECT',
    discipline: 'HUMAN JUDGEMENT',
    description: 'Selection, correction, refinement. The part that makes it a film and not output.',
  },
  {
    index: '05',
    title: 'FINISH',
    discipline: 'EDIT, SOUND & GRADE',
    description: 'Story, motion, sound and finishing brought to a single cut.',
  },
]

export const faqs: readonly FaqItem[] = [
  {
    id: 'what-is-an-ai-film',
    question: 'WHAT IS AN AI FILM, EXACTLY?',
    answer:
      'A film where AI is part of the production pipeline rather than the point of the work. The concept, direction, edit and sound are made the way they always were. What changes is how the imagery gets there — which mostly means ideas that were previously out of budget become reachable.',
  },
  {
    id: 'does-ai-replace-direction',
    question: 'DOES AI REPLACE THE CREATIVE DIRECTION?',
    answer:
      'No. AI widens what direction can reach for; it does not decide what is worth reaching for. The human judgement in the middle — selecting, correcting, cutting — is what separates a film from a sequence of generated frames.',
  },
  {
    id: 'what-do-you-work-on',
    question: 'WHAT KIND OF WORK DO YOU TAKE ON?',
    answer:
      'AI films, AI advertising films, and creative direction for brands that want a distinctive visual world. Concept-led work rather than volume content.',
  },
  {
    id: 'how-does-a-project-start',
    question: 'HOW DOES A PROJECT USUALLY START?',
    answer:
      'With a conversation about the idea and what it has to do — not with a tool list. From there the process runs idea, world, generate, direct, finish.',
  },
  {
    id: 'background',
    question: 'WHAT IS YOUR BACKGROUND?',
    answer:
      'Thirteen-plus years across brand strategy, communication, content, marketing and visual media — including brand strategy at Group Landmark and regional work at Maxposure — before founding Orglife Industries, where the practice moved toward AI and emerging technology as creative media.',
  },
]
