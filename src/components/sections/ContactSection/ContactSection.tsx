import { Mail, MapPin, Phone } from 'lucide-react'
import { type FormEvent, useMemo, useState } from 'react'

import { getSiteConfig, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import type { ContactPayload } from '@/types/site'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const initialForm: ContactPayload = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

export function ContactSection() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)
  const copy = getUiCopy(locale)
  const [form, setForm] = useState<ContactPayload>(initialForm)

  const mailtoLink = useMemo(() => {
    const fallbackClientName = locale === 'fr' ? 'Client ETS PETIT' : 'ETS PETIT Customer'
    const subject = `${copy.mailtoSubjectPrefix} - ${form.name || fallbackClientName}`
    const lines = [
      `${copy.formNameLabel}: ${form.name}`,
      `${copy.formPhoneLabel}: ${form.phone}`,
      `Email: ${form.email}`,
      '',
      `${copy.mailtoMessageLabel}:`,
      form.message,
    ]

    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  }, [copy, form, locale, siteConfig.email])

  const onChange = (field: keyof ContactPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.location.href = mailtoLink
  }

  return (
    <Section
      id="contact"
      title={copy.sectionContactTitle}
      subtitle={copy.sectionContactSubtitle}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{copy.contactDetailsTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{copy.contactPhoneLabel}</p>
                <a href={siteConfig.phoneHref} className="hover:text-foreground">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{copy.contactEmailLabel}</p>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                  {siteConfig.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{copy.contactZoneLabel}</p>
                <p>{siteConfig.interventionZone}</p>
              </div>
            </div>
            <p className="rounded-md bg-muted px-3 py-2 text-xs">
              {copy.contactOpeningHoursLabel}: {siteConfig.openingHours}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{copy.contactQuickTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="name">{copy.formNameLabel}</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(event) => onChange('name', event.target.value)}
                  placeholder={copy.formNamePlaceholder}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">{copy.formPhoneLabel}</Label>
                  <Input
                    id="phone"
                    required
                    value={form.phone}
                    onChange={(event) => onChange('phone', event.target.value)}
                    placeholder={copy.formPhonePlaceholder}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{copy.formEmailLabel}</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => onChange('email', event.target.value)}
                    placeholder={copy.formEmailPlaceholder}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">{copy.formMessageLabel}</Label>
                <Textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={(event) => onChange('message', event.target.value)}
                  placeholder={copy.formMessagePlaceholder}
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                {copy.formSubmitLabel}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
