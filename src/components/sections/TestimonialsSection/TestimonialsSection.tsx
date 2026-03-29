import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Quote, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { testimonials } from '@/data/testimonials'
import { getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { cn } from '@/lib/utils'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const avatarTones = [
  'from-amber-100 via-yellow-50 to-white text-amber-900',
  'from-rose-100 via-pink-50 to-white text-rose-900',
  'from-sky-100 via-cyan-50 to-white text-sky-900',
  'from-emerald-100 via-lime-50 to-white text-emerald-900',
]

const chipTones = [
  'border-amber-200/80 bg-amber-50 text-amber-900',
  'border-rose-200/80 bg-rose-50 text-rose-900',
  'border-sky-200/80 bg-sky-50 text-sky-900',
  'border-emerald-200/80 bg-emerald-50 text-emerald-900',
]

function getInitials(name: string) {
  const parts = name
    .split(' ')
    .map((part) => part.replace(/[^A-Za-z]/g, ''))
    .filter(Boolean)
    .slice(0, 2)

  if (parts.length === 0) {
    return 'QP'
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? '').join('')
}

function Stars() {
  return (
    <div className="flex items-center gap-1 text-primary">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-4 w-4 fill-current sm:h-[18px] sm:w-[18px]" />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const { locale } = useLocale()
  const copy = getUiCopy(locale)
  const shouldReduceMotion = useReducedMotion()
  const featuredTestimonial = testimonials[0]
  const secondaryTestimonials = testimonials.slice(1)
  const sectionCopy =
    locale === 'fr'
      ? {
          title: 'Avis clients',
          subtitle:
            "Des retours concrets qui parlent de reactivite, de pedagogie, de prix justes et d'un vrai soin d'execution.",
          kicker: 'Confiance terrain',
          summaryTitle: 'Ce que les clients retiennent',
          summaryText:
            "Les retours convergent sur la meme promesse : une intervention claire, rapide, propre et rassurante, meme quand le chantier se complique.",
          averageLabel: 'Note mise en avant',
          reviewCountLabel: '15 retours clients',
          themes: [
            'Pedagogie et explications claires',
            "Reactivite sur les depannages et urgences",
            'Soin du travail et prix juges justes',
          ],
          railTitle: 'Extraits de retours',
          railSubtitle: 'Une selection de commentaires clients reformules a partir des avis fournis',
          replyLabel: 'Reponse de Quentin',
        }
      : {
          title: 'Client Reviews',
          subtitle:
            'Selected customer feedback highlighting responsiveness, clarity, fair pricing, and careful workmanship.',
          kicker: 'Trusted locally',
          summaryTitle: 'What clients keep mentioning',
          summaryText:
            'The same strengths come back again and again: clarity, speed, tidy execution, and reassuring communication from start to finish.',
          averageLabel: 'Highlighted rating',
          reviewCountLabel: '15 customer reviews',
          themes: [
            'Clear explanations throughout the job',
            'Fast response on urgent electrical issues',
            'Careful workmanship and fair pricing',
          ],
          railTitle: 'Selected feedback',
          railSubtitle: 'Curated excerpts rewritten from the customer reviews you provided',
          replyLabel: "Quentin's reply",
        }

  return (
    <Section
      id="testimonials"
      title={sectionCopy.title}
      subtitle={sectionCopy.subtitle}
      className="relative overflow-hidden pb-16 pt-10 sm:pb-20"
      bodyClassName="mt-8"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(circle_at_top_left,rgba(247,198,0,0.18),transparent_38%),radial-gradient(circle_at_top_right,rgba(8,26,66,0.08),transparent_32%)]" />

      <div className="grid gap-5">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <Card className="relative overflow-hidden border-[#081a42]/10 bg-[#081a42] text-white shadow-[0_24px_60px_rgba(8,26,66,0.16)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,198,0,0.2),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_60%)]" />
            <CardContent className="relative p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white/78">
                    {sectionCopy.kicker}
                  </span>
                  <h3 className="mt-4 max-w-xl font-heading text-2xl font-semibold leading-tight sm:text-3xl">
                    {sectionCopy.summaryTitle}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/78 sm:text-base">
                    {sectionCopy.summaryText}
                  </p>
                </div>

                <div className="min-w-[10rem] rounded-[1.4rem] border border-white/12 bg-white/8 p-4 text-left backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.08em] text-white/70">
                    {sectionCopy.averageLabel}
                  </p>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="font-heading text-4xl font-bold leading-none">5.0</span>
                    <span className="pb-1 text-sm text-white/72">/ 5</span>
                  </div>
                  <div className="mt-3">
                    <Stars />
                  </div>
                  <p className="mt-3 text-sm text-white/72">{sectionCopy.reviewCountLabel}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {sectionCopy.themes.map((theme) => (
                  <div
                    key={theme}
                    className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-medium text-white/88 backdrop-blur-sm"
                  >
                    {theme}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.7rem] border border-white/12 bg-white px-5 py-5 text-[#081a42] shadow-[0_18px_42px_rgba(5,12,28,0.16)] sm:px-6 sm:py-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary via-yellow-100 to-white text-lg font-bold text-[#081a42] shadow-[inset_0_0_0_1px_rgba(8,26,66,0.08)]">
                      {getInitials(featuredTestimonial.name)}
                    </div>
                    <div>
                      <p className="font-heading text-xl font-semibold">{featuredTestimonial.name}</p>
                      <p className="text-sm text-slate-500">{featuredTestimonial.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <Stars />
                    <span className="rounded-full border border-[#081a42]/10 bg-slate-50 px-3 py-1 text-xs font-semibold text-[#081a42]">
                      {featuredTestimonial.category}
                    </span>
                  </div>
                </div>

                <div className="relative mt-5">
                  <Quote className="absolute -left-1 -top-1 h-8 w-8 text-primary/30" />
                  <blockquote className="pl-8 font-heading text-[1.35rem] leading-[1.45] tracking-[-0.02em] text-[#081a42] sm:text-[1.55rem]">
                    {featuredTestimonial.quote}
                  </blockquote>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/12 px-3 py-1.5 text-sm font-semibold text-[#081a42]">
                    <Sparkles className="h-4 w-4 text-primary" />
                    {featuredTestimonial.highlight}
                  </span>
                  <Button asChild size="sm" className="h-10 rounded-full px-4">
                    <Link to="/contact">
                      {copy.requestQuote}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-heading text-2xl font-semibold text-[#081a42]">
              {sectionCopy.railTitle}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{sectionCopy.railSubtitle}</p>
          </div>
        </div>

        <div className="no-scrollbar -mx-3 flex snap-x gap-4 overflow-x-auto px-3 pb-3 sm:-mx-5 sm:px-5 lg:-mx-0 lg:px-0">
          {secondaryTestimonials.map((testimonial, index) => {
            const avatarTone = avatarTones[index % avatarTones.length]
            const chipTone = chipTones[index % chipTones.length]

            return (
              <motion.div
                key={`${testimonial.name}-${testimonial.date}`}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.24, delay: index * 0.03 }}
                className="w-[88vw] max-w-[24rem] shrink-0 snap-start sm:w-[30rem]"
              >
                <Card className="h-full border-[#081a42]/8 bg-white/88 backdrop-blur-sm">
                  <CardContent className="flex h-full flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold shadow-[inset_0_0_0_1px_rgba(8,26,66,0.08)]',
                            avatarTone,
                          )}
                        >
                          {getInitials(testimonial.name)}
                        </div>
                        <div>
                          <p className="font-heading text-lg font-semibold text-[#081a42]">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-slate-500">{testimonial.date}</p>
                        </div>
                      </div>
                      <Stars />
                    </div>

                    <div className="mt-4">
                      <span className="inline-flex rounded-full border border-[#081a42]/8 bg-slate-50 px-3 py-1 text-xs font-semibold text-[#081a42]">
                        {testimonial.category}
                      </span>
                    </div>

                    <blockquote className="mt-4 text-pretty text-[1.02rem] leading-7 text-slate-700">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {testimonial.highlight ? (
                        <span
                          className={cn(
                            'inline-flex rounded-full border px-3 py-1 text-xs font-semibold',
                            chipTone,
                          )}
                        >
                          {testimonial.highlight}
                        </span>
                      ) : null}
                    </div>

                    {testimonial.reply ? (
                      <div className="mt-5 rounded-2xl border border-[#081a42]/8 bg-slate-50 px-4 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                          {sectionCopy.replyLabel}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">
                          {testimonial.reply}
                        </p>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
