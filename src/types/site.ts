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

export type TestimonialItem = {
  name: string
  date: string
  category: string
  quote: string
  highlight?: string
  reply?: string
}
