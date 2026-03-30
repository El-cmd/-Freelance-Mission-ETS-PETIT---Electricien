import { motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'

import { testimonials } from '@/data/testimonials'
import { useLocale } from '@/i18n/locale'
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
  const replyLabel = locale === 'fr' ? 'Reponse de Quentin' : "Quentin's reply"

  return (
    <div className="no-scrollbar -mx-3 flex snap-x gap-4 overflow-x-auto px-3 pb-3 sm:-mx-5 sm:px-5 lg:-mx-0 lg:px-0">
      {testimonials.map((testimonial, index) => {
        const avatarTone = avatarTones[index % avatarTones.length]

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
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold shadow-[inset_0_0_0_1px_rgba(8,26,66,0.08)] ${avatarTone}`}
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

                {testimonial.reply ? (
                  <div className="mt-5 rounded-2xl border border-[#081a42]/8 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                      {replyLabel}
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
  )
}
