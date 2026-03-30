import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { testimonials } from '@/data/testimonials'
import { useLocale } from '@/i18n/locale'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const avatarTones = [
  'from-amber-100 via-yellow-50 to-white text-amber-900',
  'from-rose-100 via-pink-50 to-white text-rose-900',
  'from-sky-100 via-cyan-50 to-white text-sky-900',
  'from-emerald-100 via-lime-50 to-white text-emerald-900',
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
  const shouldReduceMotion = useReducedMotion()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [expandedTestimonials, setExpandedTestimonials] = useState<Record<string, boolean>>({})
  const replyLabel = locale === 'fr' ? 'Reponse de Quentin' : "Quentin's reply"
  const previousLabel = locale === 'fr' ? 'Voir les avis precedents' : 'Show previous reviews'
  const nextLabel = locale === 'fr' ? 'Voir les avis suivants' : 'Show next reviews'
  const showMoreLabel = locale === 'fr' ? 'Afficher plus' : 'Show more'
  const showLessLabel = locale === 'fr' ? 'Afficher moins' : 'Show less'

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) {
      return
    }

    const syncControls = () => {
      const maxScrollLeft = Math.max(container.scrollWidth - container.clientWidth - 4, 0)
      setCanScrollPrev(container.scrollLeft > 4)
      setCanScrollNext(container.scrollLeft < maxScrollLeft)
    }

    syncControls()
    container.addEventListener('scroll', syncControls, { passive: true })
    const resizeObserver = new ResizeObserver(syncControls)
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener('scroll', syncControls)
      resizeObserver.disconnect()
    }
  }, [])

  const scrollByCard = (direction: 'prev' | 'next') => {
    const container = scrollContainerRef.current
    if (!container) {
      return
    }

    const firstCard = container.querySelector<HTMLElement>('[data-testimonial-card]')
    const cardWidth = firstCard?.offsetWidth ?? Math.max(container.clientWidth * 0.88, 320)
    const gap = 16
    const offset = cardWidth + gap

    container.scrollBy({
      left: direction === 'next' ? offset : -offset,
      behavior: 'smooth',
    })
  }

  const toggleExpanded = (key: string) => {
    setExpandedTestimonials((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  return (
    <div className="relative mt-4">
      <Button
        type="button"
        size="icon"
        aria-label={previousLabel}
        onClick={() => scrollByCard('prev')}
        disabled={!canScrollPrev}
        className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#081a42]/12 bg-[#081a42] text-primary shadow-[0_14px_30px_rgba(8,26,66,0.18)] hover:bg-[#10275f] lg:inline-flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        type="button"
        size="icon"
        aria-label={nextLabel}
        onClick={() => scrollByCard('next')}
        disabled={!canScrollNext}
        className="absolute right-0 top-1/2 z-20 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 rounded-full border border-[#081a42]/12 bg-[#081a42] text-primary shadow-[0_14px_30px_rgba(8,26,66,0.18)] hover:bg-[#10275f] lg:inline-flex"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div
        ref={scrollContainerRef}
        className="no-scrollbar -mx-3 flex snap-x gap-4 overflow-x-auto px-3 pb-3 sm:-mx-5 sm:px-5 lg:mx-0 lg:px-1"
      >
        {testimonials.map((testimonial, index) => {
          const avatarTone = avatarTones[index % avatarTones.length]
          const itemKey = `${testimonial.name}-${testimonial.date}`
          const isExpanded = expandedTestimonials[itemKey] ?? false
          const isLongQuote = testimonial.quote.length > 320

          return (
            <motion.div
              key={itemKey}
              data-testimonial-card
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.24, delay: index * 0.03 }}
              className="w-[86vw] max-w-[22rem] shrink-0 snap-start sm:w-[26rem] lg:w-[calc((100%-2rem)/3)] lg:max-w-none"
            >
              <Card className="h-full min-h-[28.5rem] border-[#081a42]/8 bg-white/88 backdrop-blur-sm lg:min-h-[31rem]">
                <CardContent className="flex h-full flex-col p-4 sm:p-5 lg:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold shadow-[inset_0_0_0_1px_rgba(8,26,66,0.08)] ${avatarTone}`}
                      >
                        {getInitials(testimonial.name)}
                      </div>
                      <div>
                        <p className="font-heading text-[1.05rem] font-semibold text-[#081a42]">
                          {testimonial.name}
                        </p>
                        <p className="text-[0.92rem] text-slate-500">{testimonial.date}</p>
                      </div>
                    </div>
                    <Stars />
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex rounded-full border border-[#081a42]/8 bg-slate-50 px-3 py-1 text-xs font-semibold text-[#081a42]">
                      {testimonial.category}
                    </span>
                  </div>

                  <blockquote
                    className={`mt-4 text-pretty text-[0.98rem] leading-8 text-slate-700 ${!isExpanded && isLongQuote ? 'line-clamp-7' : ''}`}
                  >
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="mt-auto pt-5">
                    {isLongQuote ? (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(itemKey)}
                        className="text-sm font-semibold text-[#081a42] underline underline-offset-4 hover:text-[#10275f]"
                      >
                        {isExpanded ? showLessLabel : showMoreLabel}
                      </button>
                    ) : null}

                    {testimonial.reply ? (
                      <div className={`${isLongQuote ? 'mt-4' : ''} rounded-2xl border border-[#081a42]/8 bg-slate-50 px-4 py-3`}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                          {replyLabel}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">
                          {testimonial.reply}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
