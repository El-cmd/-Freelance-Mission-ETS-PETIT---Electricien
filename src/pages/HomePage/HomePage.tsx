import { HeroSection } from '@/components/sections/HeroSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

export function HomePage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <HeroSection />
      <TestimonialsSection />
    </div>
  )
}
