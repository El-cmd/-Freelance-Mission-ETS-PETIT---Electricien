import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { type FormEvent, useState } from 'react'

import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getSiteConfig, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import type { ContactPayload } from '@/types/site'

const initialForm: ContactPayload = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactSection() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)
  const copy = getUiCopy(locale)
  const [form, setForm] = useState<ContactPayload>(initialForm)
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('')
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now())
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const labels =
    locale === 'fr'
      ? {
          mapLink: 'Voir Hem sur Google Maps',
          consentPrefix: 'J’accepte que mes informations soient utilisées pour répondre à ma demande, conformément à la',
          privacyLink: 'politique de confidentialité',
          submitting: 'Envoi en cours…',
          success: 'Votre demande a bien été envoyée. ETS PETIT vous répondra rapidement.',
          error: 'La demande n’a pas pu être envoyée. Réessayez ou contactez-nous directement par téléphone.',
        }
      : {
          mapLink: 'View Hem on Google Maps',
          consentPrefix: 'I agree that my information may be used to respond to my request, in accordance with the',
          privacyLink: 'privacy policy',
          submitting: 'Sending…',
          success: 'Your request has been sent. ETS PETIT will get back to you shortly.',
          error: 'Your request could not be sent. Please try again or contact us directly by phone.',
        }

  const onChange = (field: keyof ContactPayload, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          consent,
          website,
          formStartedAt,
          locale,
        }),
        signal: AbortSignal.timeout(12_000),
      })

      if (!response.ok) {
        throw new Error(labels.error)
      }

      setForm(initialForm)
      setConsent(false)
      setWebsite('')
      setFormStartedAt(Date.now())
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : labels.error)
    }
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
            <a
              href="https://www.google.com/maps/search/?api=1&query=Hem%2C+France"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <MapPin className="h-4 w-4" />
              {labels.mapLink}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
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
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
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
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    minLength={6}
                    maxLength={30}
                    value={form.phone}
                    onChange={(event) => onChange('phone', event.target.value)}
                    placeholder={copy.formPhonePlaceholder}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{copy.formEmailLabel}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
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
                  name="message"
                  required
                  minLength={10}
                  maxLength={3000}
                  value={form.message}
                  onChange={(event) => onChange('message', event.target.value)}
                  placeholder={copy.formMessagePlaceholder}
                />
              </div>

              <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="privacy-consent"
                  name="privacy-consent"
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-input accent-primary"
                />
                <Label htmlFor="privacy-consent" className="text-sm font-normal leading-6 text-muted-foreground">
                  {labels.consentPrefix}{' '}
                  <a href="/politique-confidentialite" className="font-semibold text-foreground underline hover:text-primary">
                    {labels.privacyLink}
                  </a>
                  .
                </Label>
              </div>

              {status === 'success' ? (
                <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  {labels.success}
                </p>
              ) : null}
              {status === 'error' ? (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                  {errorMessage || labels.error}
                </p>
              ) : null}

              <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
                {status === 'submitting' ? labels.submitting : copy.formSubmitLabel}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
