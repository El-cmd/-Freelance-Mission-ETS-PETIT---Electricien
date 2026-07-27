import { ExternalLink, LoaderCircle, LockKeyhole, LogOut, Save, ShieldCheck } from 'lucide-react'
import { type FormEvent, useEffect, useState } from 'react'

import logo from '@/assets/logo.webp'
import {
  defaultPricingValues,
  formatPricingValue,
  isPricingValues,
  pricingGroups,
  type PricingValues,
} from '@/data/pricing'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type AdminState = 'checking' | 'signed-out' | 'signed-in'
type Feedback = { tone: 'success' | 'error'; message: string } | null

function clonePricingValues(values: PricingValues): PricingValues {
  return Object.fromEntries(
    Object.entries(values).map(([offerId, fields]) => [offerId, { ...fields }]),
  )
}

async function readJson(response: Response) {
  const payload: unknown = await response.json().catch(() => null)
  return payload && typeof payload === 'object' ? payload : {}
}

export function AdminPage() {
  const [adminState, setAdminState] = useState<AdminState>('checking')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pricingValues, setPricingValues] = useState<PricingValues>(
    clonePricingValues(defaultPricingValues),
  )
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<Feedback>(null)

  async function loadPricing() {
    const response = await fetch('/api/pricing', {
      cache: 'no-store',
      credentials: 'same-origin',
    })
    const payload = await readJson(response)

    if (
      response.ok &&
      'values' in payload &&
      isPricingValues(payload.values)
    ) {
      setPricingValues(clonePricingValues(payload.values))
      setUpdatedAt(
        'updatedAt' in payload && typeof payload.updatedAt === 'string'
          ? payload.updatedAt
          : null,
      )
    }
  }

  useEffect(() => {
    document.title = 'Administration des tarifs | ETS PETIT'
    let robotsMeta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta')
      robotsMeta.name = 'robots'
      document.head.append(robotsMeta)
    }
    robotsMeta.content = 'noindex, nofollow, noarchive'

    const controller = new AbortController()

    async function checkSession() {
      try {
        const response = await fetch('/api/admin/session', {
          cache: 'no-store',
          credentials: 'same-origin',
          signal: controller.signal,
        })
        setAdminState(response.ok ? 'signed-in' : 'signed-out')
        await loadPricing()
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setAdminState('signed-out')
          setFeedback({
            tone: 'error',
            message: 'Le service d’administration est momentanément indisponible.',
          })
        }
      }
    }

    void checkSession()
    return () => controller.abort()
  }, [])

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const payload = await readJson(response)

      if (!response.ok) {
        setFeedback({
          tone: 'error',
          message:
            'message' in payload && typeof payload.message === 'string'
              ? payload.message
              : 'Identifiants incorrects.',
        })
        return
      }

      setPassword('')
      setAdminState('signed-in')
      await loadPricing()
    } catch {
      setFeedback({
        tone: 'error',
        message: 'Connexion impossible. Merci de réessayer.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function updateField(offerId: string, fieldKey: string, value: number) {
    setPricingValues((currentValues) => ({
      ...currentValues,
      [offerId]: {
        ...currentValues[offerId],
        [fieldKey]: value,
      },
    }))
    setFeedback(null)
  }

  async function handleSave() {
    if (!isPricingValues(pricingValues)) {
      setFeedback({
        tone: 'error',
        message: 'Chaque tarif doit être un nombre compris entre 0 et 100 000 €.',
      })
      return
    }

    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch('/api/admin/pricing', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: pricingValues }),
      })
      const payload = await readJson(response)

      if (!response.ok) {
        if (response.status === 401) {
          setAdminState('signed-out')
        }
        setFeedback({
          tone: 'error',
          message:
            'message' in payload && typeof payload.message === 'string'
              ? payload.message
              : 'Les tarifs n’ont pas pu être enregistrés.',
        })
        return
      }

      if ('values' in payload && isPricingValues(payload.values)) {
        setPricingValues(clonePricingValues(payload.values))
      }
      setUpdatedAt(
        'updatedAt' in payload && typeof payload.updatedAt === 'string'
          ? payload.updatedAt
          : new Date().toISOString(),
      )
      setFeedback({ tone: 'success', message: 'Les tarifs ont bien été mis à jour.' })
    } catch {
      setFeedback({
        tone: 'error',
        message: 'Enregistrement impossible. Merci de réessayer.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleLogout() {
    setIsSubmitting(true)
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      })
    } finally {
      setPassword('')
      setFeedback(null)
      setAdminState('signed-out')
      setIsSubmitting(false)
    }
  }

  if (adminState === 'checking') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#081a42] px-5 text-white">
        <div className="flex items-center gap-3 text-sm font-semibold">
          <LoaderCircle className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
          Vérification de la session…
        </div>
      </main>
    )
  }

  if (adminState === 'signed-out') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#17366f_0%,#081a42_48%,#050f28_100%)] px-5 py-12">
        <Card className="w-full max-w-md overflow-hidden border-white/15 bg-white shadow-2xl">
          <div className="bg-[#081a42] px-6 py-7 text-center">
            <img
              src={logo}
              alt="ETS PETIT"
              width={371}
              height={122}
              className="mx-auto h-12 w-auto object-contain"
            />
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white">
              <LockKeyhole className="h-4 w-4 text-primary" aria-hidden="true" />
              Administration des tarifs
            </div>
          </div>

          <CardContent className="p-6 sm:p-8">
            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Adresse e-mail</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Mot de passe</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  minLength={12}
                  required
                />
              </div>

              {feedback ? (
                <p
                  role="alert"
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${
                    feedback.tone === 'error'
                      ? 'bg-red-50 text-red-800'
                      : 'bg-emerald-50 text-emerald-800'
                  }`}
                >
                  {feedback.message}
                </p>
              ) : null}

              <Button type="submit" className="h-12 w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <LockKeyhole className="mr-2 h-4 w-4" aria-hidden="true" />
                )}
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 text-[#081a42]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#081a42] text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <img
              src={logo}
              alt="ETS PETIT"
              width={371}
              height={122}
              className="h-9 w-auto shrink-0 object-contain sm:h-11"
            />
            <div className="hidden sm:block">
              <p className="font-heading text-lg font-semibold">Gestion des tarifs</p>
              <p className="text-xs text-white/70">Les changements sont publiés immédiatement.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              <a href="/projects" target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Voir les tarifs</span>
                <span className="sm:hidden">Voir</span>
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isSubmitting}
              className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Déconnexion</span>
              <span className="sm:hidden">Quitter</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Session sécurisée
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              Modifier les tarifs
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              Saisissez uniquement les montants. La mise en forme française et anglaise est
              générée automatiquement.
            </p>
          </div>
          {updatedAt ? (
            <p className="text-xs font-medium text-slate-500">
              Dernière modification :{' '}
              {new Intl.DateTimeFormat('fr-FR', {
                dateStyle: 'short',
                timeStyle: 'short',
              }).format(new Date(updatedAt))}
            </p>
          ) : null}
        </div>

        <div className="space-y-6">
          {pricingGroups.map((group) => (
            <section key={group.id} aria-labelledby={`pricing-group-${group.id}`}>
              <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-[#081a42] px-5 py-4 text-white">
                  <h2
                    id={`pricing-group-${group.id}`}
                    className="font-heading text-xl font-semibold"
                  >
                    {group.label}
                  </h2>
                </div>

                <CardContent className="divide-y divide-slate-200 p-0">
                  {group.offers.map((offer) => (
                    <div
                      key={offer.id}
                      className="grid gap-5 px-5 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,1.35fr)] lg:items-center"
                    >
                      <div>
                        <h3 className="font-heading text-lg font-semibold">{offer.label}</h3>
                        <p className="mt-1 text-sm font-medium text-slate-500">
                          Aperçu :{' '}
                          <span className="text-[#081a42]">
                            {formatPricingValue(offer.id, offer.kind, pricingValues, 'fr')}
                          </span>
                        </p>
                      </div>

                      <div
                        className={`grid gap-4 ${
                          offer.fields.length > 1 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'
                        }`}
                      >
                        {offer.fields.map((field) => (
                          <div key={field.key} className="space-y-2">
                            <Label htmlFor={`${offer.id}-${field.key}`}>{field.label}</Label>
                            <div className="relative">
                              <Input
                                id={`${offer.id}-${field.key}`}
                                type="number"
                                min="0"
                                max="100000"
                                step="0.01"
                                inputMode="decimal"
                                value={pricingValues[offer.id]?.[field.key] ?? ''}
                                onChange={(event) =>
                                  updateField(offer.id, field.key, event.currentTarget.valueAsNumber)
                                }
                                className="pr-10 text-base font-semibold"
                                required
                              />
                              <span
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500"
                                aria-hidden="true"
                              >
                                €
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          ))}
        </div>

        {feedback ? (
          <p
            role="status"
            className={`mt-6 rounded-xl border px-4 py-3 text-sm font-semibold ${
              feedback.tone === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >
            {feedback.message}
          </p>
        ) : null}

        <div className="sticky bottom-4 mt-8 flex justify-end">
          <Button
            type="button"
            size="lg"
            onClick={handleSave}
            disabled={isSubmitting}
            className="h-12 w-full shadow-xl sm:w-auto"
          >
            {isSubmitting ? (
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <Save className="mr-2 h-5 w-5" aria-hidden="true" />
            )}
            Enregistrer les tarifs
          </Button>
        </div>
      </main>
    </div>
  )
}
