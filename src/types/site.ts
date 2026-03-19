import type { LucideIcon } from 'lucide-react'

export type SiteConfig = {
  name: string
  legalName: string
  city: string
  phoneDisplay: string
  phoneHref: string
  email: string
  addressLine: string
  interventionZone: string
  openingHours: string
  websiteUrl: string
  ctaChannel: 'call'
}

export type NavItem = {
  label: string
  path: string
}

export type ServiceItem = {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export type ProjectItem = {
  id: string
  title: string
  image: string
  alt: string
  category: string
}

export type AboutStat = {
  label: string
  value: string
}

export type ContactPayload = {
  name: string
  phone: string
  email: string
  message: string
}
