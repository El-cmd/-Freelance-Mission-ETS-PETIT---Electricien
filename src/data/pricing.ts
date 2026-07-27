import type { Locale } from '@/i18n/locale'

export type PricingValues = Record<string, Record<string, number>>

export type PricingField = {
  key: string
  label: string
}

export type PricingOfferDefinition = {
  id: string
  label: string
  kind: 'travel' | 'from' | 'range'
  fields: PricingField[]
}

export type PricingGroupDefinition = {
  id: string
  label: string
  offers: PricingOfferDefinition[]
}

export const pricingGroups: PricingGroupDefinition[] = [
  {
    id: 'depannage',
    label: 'Dépannage / Recherche de panne',
    offers: [
      {
        id: 'depannage-semaine',
        label: 'Forfait 1 heure — semaine',
        kind: 'travel',
        fields: [
          { key: 'amount', label: 'Forfait' },
          { key: 'travelFee', label: 'Déplacement' },
        ],
      },
      {
        id: 'depannage-weekend',
        label: 'Intervention week-end',
        kind: 'travel',
        fields: [
          { key: 'amount', label: 'Forfait' },
          { key: 'travelFee', label: 'Déplacement' },
        ],
      },
    ],
  },
  {
    id: 'borne',
    label: 'Installation borne de recharge',
    offers: [
      {
        id: 'pack-eco',
        label: 'Pack Éco',
        kind: 'from',
        fields: [{ key: 'amount', label: 'À partir de' }],
      },
      {
        id: 'pack-confort',
        label: 'Pack Confort',
        kind: 'from',
        fields: [{ key: 'amount', label: 'À partir de' }],
      },
      {
        id: 'pack-performance',
        label: 'Pack Performance',
        kind: 'from',
        fields: [{ key: 'amount', label: 'À partir de' }],
      },
    ],
  },
  {
    id: 'tableau',
    label: 'Remplacement tableau électrique',
    offers: [
      {
        id: 'panel-basic',
        label: 'Studio / T1',
        kind: 'range',
        fields: [
          { key: 'minimum', label: 'Minimum' },
          { key: 'maximum', label: 'Maximum' },
        ],
      },
      {
        id: 'panel-standard',
        label: 'Appartement / Maison T2-T3',
        kind: 'range',
        fields: [
          { key: 'minimum', label: 'Minimum' },
          { key: 'maximum', label: 'Maximum' },
        ],
      },
      {
        id: 'panel-premium',
        label: 'Maison familiale (T4+)',
        kind: 'range',
        fields: [
          { key: 'minimum', label: 'Minimum' },
          { key: 'maximum', label: 'Maximum' },
        ],
      },
    ],
  },
]

export const defaultPricingValues: PricingValues = {
  'depannage-semaine': { amount: 50, travelFee: 40 },
  'depannage-weekend': { amount: 80, travelFee: 40 },
  'pack-eco': { amount: 450 },
  'pack-confort': { amount: 1290 },
  'pack-performance': { amount: 1650 },
  'panel-basic': { minimum: 700, maximum: 1100 },
  'panel-standard': { minimum: 1100, maximum: 1600 },
  'panel-premium': { minimum: 1600, maximum: 2300 },
}

function formatAmount(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPricingValue(
  offerId: string,
  kind: PricingOfferDefinition['kind'],
  values: PricingValues,
  locale: Locale,
) {
  const offerValues = values[offerId] ?? defaultPricingValues[offerId]

  if (!offerValues) {
    return locale === 'fr' ? 'Sur devis' : 'On request'
  }

  if (kind === 'travel') {
    const amount = formatAmount(offerValues.amount, locale)
    const travelFee = formatAmount(offerValues.travelFee, locale)
    return locale === 'fr'
      ? `${amount} € + ${travelFee} € déplacement`
      : `€${amount} + €${travelFee} travel fee`
  }

  if (kind === 'from') {
    const amount = formatAmount(offerValues.amount, locale)
    return locale === 'fr' ? `À partir de ${amount} € TTC` : `From €${amount} VAT incl.`
  }

  const minimum = formatAmount(offerValues.minimum, locale)
  const maximum = formatAmount(offerValues.maximum, locale)
  const suffix = offerId === 'panel-premium' ? '+' : ''
  return locale === 'fr'
    ? `${minimum} € – ${maximum} €${suffix}`
    : `€${minimum} – €${maximum}${suffix}`
}

export function isPricingValues(value: unknown): value is PricingValues {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  return pricingGroups.every((group) =>
    group.offers.every((offer) => {
      const offerValues = (value as PricingValues)[offer.id]
      if (!offerValues || typeof offerValues !== 'object' || Array.isArray(offerValues)) {
        return false
      }

      return offer.fields.every((field) => {
        const fieldValue = offerValues[field.key]
        return Number.isFinite(fieldValue) && fieldValue >= 0 && fieldValue <= 100_000
      })
    }),
  )
}
