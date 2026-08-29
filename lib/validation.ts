import { z } from 'zod'

export const PROJECT_TYPES = ['ai-film', 'ai-advertising', 'creative-direction', 'other'] as const

export const projectTypeLabels: Record<(typeof PROJECT_TYPES)[number], string> = {
  'ai-film': 'AI Film',
  'ai-advertising': 'AI Advertising',
  'creative-direction': 'Creative Direction',
  other: 'Other',
}

/** Shared by the client form and the API route, so both agree on the rules. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.email('Please enter a valid email address.').max(200),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  projectType: z.enum(PROJECT_TYPES, { message: 'Please choose a project type.' }),
  budget: z.string().trim().max(80).optional().or(z.literal('')),
  timeline: z.string().trim().max(80).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(20, 'Tell me a little more — 20 characters at least.')
    .max(4000, 'Please keep it under 4000 characters.'),
  /**
   * Honeypot: hidden from people, tempting to bots. Accepted by the schema on
   * purpose — the route inspects it and accepts silently, so a bot never
   * learns that the field is what gave it away.
   */
  website: z.string().max(200).optional(),
})

export type ContactInput = z.infer<typeof contactSchema>
