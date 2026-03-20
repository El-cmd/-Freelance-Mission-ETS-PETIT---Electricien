import { motion, useReducedMotion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { getProjects, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import type { ProjectItem } from '@/types/site'
import { Section } from '@/components/layout/Section'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function ProjectsSection() {
  const { locale } = useLocale()
  const projects = getProjects(locale)
  const copy = getUiCopy(locale)
  const [selected, setSelected] = useState<ProjectItem | null>(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <Section
      id="projects"
      title={copy.sectionProjectsTitle}
      subtitle={copy.sectionProjectsSubtitle}
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {projects.map((project, index) => (
          <Dialog key={project.id}>
            <DialogTrigger asChild>
              <motion.button
                type="button"
                className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_10px_24px_rgba(17,20,24,0.06),0_2px_8px_rgba(17,20,24,0.04)]"
                onClick={() => setSelected(project)}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.24, delay: index * 0.035 }}
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  className="aspect-[3/4] h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-black/10 to-transparent p-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/80">{project.category}</p>
                    <p className="text-sm font-semibold text-white">{project.title}</p>
                  </div>
                  <Search className="ml-auto h-4 w-4 text-white/90" />
                </div>
              </motion.button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selected?.title}</DialogTitle>
                <DialogDescription>{selected?.category}</DialogDescription>
              </DialogHeader>
              {selected ? (
                <img
                  src={selected.image}
                  alt={selected.alt}
                  className="max-h-[72vh] w-full rounded-lg object-contain"
                />
              ) : null}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </Section>
  )
}
