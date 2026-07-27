import { getSiteConfig } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'

export function PrivacyPolicyPage() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)

  const sections =
    locale === 'fr'
      ? [
          {
            title: 'Responsable du traitement',
            content:
              'ETS PETIT est responsable du traitement des informations transmises depuis ce site.',
          },
          {
            title: 'Données collectées',
            content:
              'Le formulaire de contact collecte votre nom, votre numéro de téléphone, votre adresse email et le message décrivant votre demande. Les champs sont obligatoires afin de permettre le traitement et le suivi de votre demande.',
          },
          {
            title: 'Finalité et base du traitement',
            content:
              'Ces informations sont utilisées uniquement pour répondre à votre demande, préparer un devis et organiser une éventuelle intervention. Le formulaire est envoyé après votre consentement explicite.',
          },
          {
            title: 'Destinataires et transmission',
            content:
              'Les informations sont transmises de manière sécurisée à la messagerie professionnelle d’ETS PETIT par son serveur SMTP. Elles ne sont ni vendues ni utilisées pour une prospection automatisée.',
          },
          {
            title: 'Durée de conservation',
            content:
              'Les demandes sont conservées dans la messagerie professionnelle pendant le temps nécessaire à leur traitement, puis au maximum trois ans après le dernier contact émanant du demandeur, sauf obligation légale imposant une autre durée.',
          },
          {
            title: 'Cookies et services externes',
            content:
              'Le site n’utilise aucun cookie publicitaire ou outil de suivi d’audience. Seule la préférence de langue est enregistrée localement dans votre navigateur. La carte Google n’est pas chargée automatiquement : Google Maps est contacté uniquement si vous choisissez d’ouvrir le lien correspondant.',
          },
          {
            title: 'Vos droits',
            content:
              'Vous pouvez demander l’accès, la rectification, l’effacement ou la limitation du traitement de vos données, ainsi que retirer votre consentement, en contactant ETS PETIT à l’adresse ci-dessous.',
          },
        ]
      : [
          {
            title: 'Data controller',
            content:
              'ETS PETIT is responsible for processing information submitted through this website.',
          },
          {
            title: 'Data collected',
            content:
              'The contact form collects your name, phone number, email address and the message describing your request. These fields are required to process and follow up your request.',
          },
          {
            title: 'Purpose and legal basis',
            content:
              'This information is used only to answer your request, prepare a quote and organize potential work. The form is submitted after your explicit consent.',
          },
          {
            title: 'Recipients and transmission',
            content:
              'The information is securely transmitted to the ETS PETIT professional mailbox through its SMTP server. It is not sold or used for automated marketing.',
          },
          {
            title: 'Retention period',
            content:
              'Requests are kept in the professional mailbox for the time required to process them, then for no longer than three years after the requester’s last contact, unless a legal obligation requires a different period.',
          },
          {
            title: 'Cookies and external services',
            content:
              'The website uses no advertising cookies or audience tracking. Only the language preference is stored locally in your browser. Google Maps is not loaded automatically and is contacted only if you choose to open its link.',
          },
          {
            title: 'Your rights',
            content:
              'You may request access, rectification, erasure or restriction of your personal data and withdraw your consent by contacting ETS PETIT at the address below.',
          },
        ]

  return (
    <section className="py-10 sm:py-14">
      <div className="container max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="title-kicker">{locale === 'fr' ? 'RGPD' : 'GDPR'}</p>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {locale === 'fr' ? 'Politique de confidentialité' : 'Privacy policy'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {locale === 'fr' ? 'Dernière mise à jour : 27 juillet 2026' : 'Last updated: July 27, 2026'}
          </p>
        </header>

        <div className="space-y-6 text-sm leading-7 text-muted-foreground sm:text-base">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-heading text-xl font-semibold text-foreground">{section.title}</h2>
              <p className="mt-2">{section.content}</p>
            </section>
          ))}

          <p className="rounded-xl border border-border bg-card px-4 py-3 text-foreground/85">
            {locale === 'fr' ? 'Contact pour exercer vos droits :' : 'Contact to exercise your rights:'}{' '}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold underline hover:text-primary">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
