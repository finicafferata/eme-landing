'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SiteSettings } from '@/types/sanity'

interface HorizontalScrollProps {
  settings: SiteSettings
}

export default function HorizontalScroll({ settings }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrolled = window.scrollY
      const containerTop = container.offsetTop
      const containerHeight = container.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate scroll progress within this section
      const start = containerTop - windowHeight
      const end = containerTop + containerHeight
      const totalDistance = end - start

      // Add delays: horizontal scroll only starts after 30% and stops at 70% (leaving 30% at end for viewing)
      const startDelayThreshold = 0.3
      const endDelayThreshold = 0.7
      const scrollProgress = (scrolled - start) / totalDistance

      // Adjusted progress with delays at both start and end
      let progress = 0
      if (scrollProgress <= startDelayThreshold) {
        // Before start threshold: stay at 0
        progress = 0
      } else if (scrollProgress >= endDelayThreshold) {
        // After end threshold: stay at 1
        progress = 1
      } else {
        // Between thresholds: animate from 0 to 1
        progress = (scrollProgress - startDelayThreshold) / (endDelayThreshold - startDelayThreshold)
      }

      // Clamp between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, progress))

      // Apply horizontal transform to inner content
      const inner = container.querySelector('.horizontal-inner') as HTMLElement
      if (inner) {
        const maxScroll = inner.scrollWidth - window.innerWidth
        inner.style.transform = `translateX(-${clampedProgress * maxScroll}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative" style={{ height: '800vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="horizontal-inner flex h-full transition-transform duration-100 ease-out will-change-transform pl-[15vw]">
          {/* Section 1: Studio Image */}
          <section className="min-w-full h-full flex items-center bg-light">
            <div className="ml-[10%] mr-[10%] relative w-full max-w-4xl h-[70vh]">
              {settings.homeHeroImage && (
                <Image
                  src={urlFor(settings.homeHeroImage).width(1600).height(900).url()}
                  alt="EME Estudio"
                  fill
                  className="object-contain"
                />
              )}
              <div className="absolute bottom-8 left-8">
                <h2 className="text-4xl md:text-6xl font-bold text-white">
                  Turfting, hand-made products
                </h2>
              </div>
              <div className="absolute bottom-8 right-8">
                <p className="text-white text-lg">Photography, Backstage</p>
              </div>
            </div>
          </section>

          {/* Section 2: About */}
          <section className="min-w-full h-full flex items-center bg-dark pr-[15vw]">
            <div className="ml-[10%] mr-[10%] relative w-full max-w-4xl">
              {settings.homeHeroImage && (
                <div className="relative h-[50vh] mb-8">
                  <Image
                    src={urlFor(settings.homeHeroImage).width(1600).height(900).url()}
                    alt="Male & Meri"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-8 left-8">
                    <h2 className="text-4xl md:text-6xl font-bold text-white">
                      Male & Meri
                    </h2>
                  </div>
                  <div className="absolute bottom-8 right-8">
                    <p className="text-white text-lg">Las artistas</p>
                  </div>
                </div>
              )}
              <div className="bg-white p-12 max-w-2xl">
                <p className="text-dark text-lg leading-relaxed">
                  EME Estudio es un espacio de creación y experimentación textil.
                  Trabajamos con técnicas de tufting para crear alfombras y piezas
                  únicas hechas a mano con amor y dedicación.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
