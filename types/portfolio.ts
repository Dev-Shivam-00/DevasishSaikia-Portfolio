import type { MediaKey } from '@/data/media'

export type { MediaKey }

export type ProjectCategory = 'AI Film' | 'AI Advertising' | 'Creative Direction'

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  description?: string
  year?: string
  client?: string
  /** Resolved through the media manifest — never a raw URL. */
  media: MediaKey
  featured?: boolean
}

/** An expertise entry, expandable into the template's experience popup. */
export interface Expertise {
  id: string
  title: string
  summary: string
  detail: string
  points: readonly string[]
}

export interface CareerEntry {
  organisation: string
  role: string
  period: string
  description: string
}

export interface ProcessStep {
  index: string
  title: string
  discipline: string
  description: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface NavItem {
  label: string
  href: string
  external?: boolean
}

/** The template's data-animation vocabulary, defined in assets/js/main.js. */
export type ScrollAnimation =
  | 'slide_up'
  | 'slide_down'
  | 'slide_up2'
  | 'slide_down2'
  | 'fade_from_bottom'
  | 'fade_from_top'
  | 'fade_from_left'
  | 'fade_from_right'
  | 'fade_in'
  | 'rotate_up'
  | 'bronx_zoom_out'
  | 'slide_and_scale'
