export type ProjectType = 'ai-film' | 'ai-advertising' | 'creative-direction' | 'other'

export interface ContactPayload {
  name: string
  email: string
  company?: string
  projectType: ProjectType
  budget?: string
  timeline?: string
  message: string
  /** Honeypot — must stay empty. */
  website?: string
}

export type ContactStatus = 'idle' | 'sending' | 'success' | 'error'

export interface ContactResponse {
  ok: boolean
  message: string
}
