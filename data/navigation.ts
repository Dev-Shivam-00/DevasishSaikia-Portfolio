import type { NavItem } from '@/types/portfolio'
import { site } from './site'

/** Single-page site: the popup menu scrolls to sections. */
export const navigation: readonly NavItem[] = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
  { label: 'Orglife', href: site.companyUrl, external: true },
]
