'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SiteSettings } from '@/types/sanity'

interface HorizontalScrollProps {
  settings: SiteSettings
}

export default function HorizontalScroll({ settings }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

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

      // Add delays: horizontal scroll only starts after 15% and stops at 85% for quicker, more responsive feel
      const startDelayThreshold = 0.15
      const endDelayThreshold = 0.85
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

      // Update progress state for visual indicator
      setScrollProgress(clampedProgress)

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
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Visual Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          {/* Scroll hint text - fades out as user scrolls */}
          <div
            className="text-text-gold text-sm font-light transition-opacity duration-500 md:hidden"
            style={{ opacity: 1 - scrollProgress }}
          >
            Scroll to explore →
          </div>

          {/* Progress dots */}
          <div className="flex gap-2">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                scrollProgress < 0.5 ? 'bg-text-gold w-6' : 'bg-text-gold/40'
              }`}
            />
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                scrollProgress >= 0.5 ? 'bg-text-gold w-6' : 'bg-text-gold/40'
              }`}
            />
          </div>
        </div>

        <div className="horizontal-inner flex h-full transition-transform duration-150 ease-out will-change-transform pl-[15vw]">
          {/* Section 1: Studio Image */}
          <section className="min-w-full h-full flex items-center bg-light">
            <div className="ml-[10%] mr-[10%] relative w-full max-w-4xl h-[70vh]">
              {settings.horizontalScrollImage1 && (
                <Image
                  src={urlFor(settings.horizontalScrollImage1).width(1600).height(900).url()}
                  alt="Tufting, hand-made products"
                  fill
                  className="object-contain"
                />
              )}
              <div className="absolute bottom-8 left-8">
                <h2 className="text-4xl md:text-6xl font-bold text-text-gold">
                  Tufting, hand-made products
                </h2>
              </div>
              <div className="absolute bottom-8 right-8">
                <p className="text-text-gold text-lg">Photography, Backstage</p>
              </div>
            </div>
          </section>

          {/* Section 2: About */}
          <section className="min-w-full h-full flex items-center bg-dark pr-[15vw]">
            <div className="ml-[10%] mr-[10%] relative w-full max-w-4xl">
              {settings.horizontalScrollImage2 && (
                <div className="relative h-[50vh] mb-8">
                  <Image
                    src={urlFor(settings.horizontalScrollImage2).width(1600).height(900).url()}
                    alt="Male & Meri"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-8 left-8">
                    <h2 className="text-4xl md:text-6xl font-bold text-text-gold">
                      Male & Meri
                    </h2>
                  </div>
                  <div className="absolute bottom-8 right-8">
                    <p className="text-text-gold text-lg">Las artistas</p>
                  </div>
                </div>
              )}
              <div className="bg-background p-12 max-w-2xl">
                <p className="text-text-gold text-lg leading-relaxed">
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
