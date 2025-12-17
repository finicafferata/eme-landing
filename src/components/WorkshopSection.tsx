'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types.js'
import { PortableText, type PortableTextBlock } from 'next-sanity'
import { useState, useEffect } from 'react'

interface Course {
  title: string
  duration: string
  sessions: string
  description: string
  highlights: string[]
  price?: string
}

interface WorkshopSectionProps {
  title?: string
  content?: PortableTextBlock[]
  heroImage?: SanityImageSource
  galleryImages?: SanityImageSource[]
}

const courses: Course[] = [
  {
    title: 'Curso Intensivo',
    duration: '2.5 horas por sesión',
    sessions: '3 clases',
    description: 'Aprendé la técnica de tufting en un formato acelerado. Perfecto para quienes quieren dominar los fundamentos rápidamente.',
    highlights: [
      'Técnicas básicas y avanzadas',
      'Proyecto personal guiado',
      'Todos los materiales incluidos',
      'Grupos reducidos'
    ]
  },
  {
    title: 'Curso Regular',
    duration: '2.5 horas por sesión',
    sessions: '4 clases',
    description: 'Un recorrido completo por el mundo del tufting con tiempo para perfeccionar cada técnica y desarrollar tu estilo personal.',
    highlights: [
      'Aprendizaje paso a paso',
      'Múltiples proyectos',
      'Asesoramiento personalizado',
      'Materiales premium incluidos'
    ]
  }
]

export default function WorkshopSection({
  title,
  content,
  heroImage,
  galleryImages
}: WorkshopSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {heroImage && (
        <div
          className={`relative w-full h-[60vh] md:h-[80vh] overflow-hidden transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 z-10" />
          <Image
            src={urlFor(heroImage).width(2000).height(1500).url()}
            alt={title || 'Taller de Tufting'}
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
          />
          {title && (
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-16 lg:p-24">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                {title}
              </h1>
            </div>
          )}
        </div>
      )}

      {/* Introduction Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        {content && (
          <div
            className={`max-w-4xl mx-auto mb-24 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="prose prose-lg md:prose-xl prose-invert max-w-none text-center">
              <PortableText
                value={content}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed mb-8 text-foreground/80">
                        {children}
                      </p>
                    ),
                  },
                }}
              />
            </div>
          </div>
        )}

        {/* Courses Section */}
        <div
          className={`mb-24 md:mb-32 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 md:mb-16 text-center">
            Nuestros Cursos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {courses.map((course, index) => (
              <div
                key={course.title}
                className={`group bg-zinc-900/50 border-2 border-foreground/10 hover:border-brand-violet p-8 md:p-10 transition-all duration-500 ${
                  selectedCourse === index ? 'border-brand-violet' : ''
                }`}
                style={{
                  transitionDelay: `${700 + index * 200}ms`
                }}
                onMouseEnter={() => setSelectedCourse(index)}
              >
                <div className="mb-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-brand-violet transition-colors duration-300">
                    {course.title}
                  </h3>
                  <div className="flex flex-col gap-2 text-brand-violet text-lg">
                    <p className="flex items-center gap-2">
                      <span className="text-2xl">⏱</span>
                      <span>{course.duration}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-2xl">📅</span>
                      <span>{course.sessions}</span>
                    </p>
                  </div>
                </div>

                <p className="text-foreground/70 text-lg leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="space-y-3 mb-8">
                  {course.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-3 text-foreground/80"
                    >
                      <span className="text-brand-violet text-xl mt-1">✓</span>
                      <span className="text-base">{highlight}</span>
                    </div>
                  ))}
                </div>

                {course.price && (
                  <div className="text-3xl font-bold text-brand-violet">
                    {course.price}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What You'll Learn Section */}
        <div
          className={`mb-24 md:mb-32 transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 md:mb-16 text-center">
            ¿Qué vas a aprender?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {[
              {
                number: '01',
                title: 'Técnica de Tufting',
                description: 'Dominá el uso de la pistola de tufting y las técnicas esenciales para crear texturas únicas'
              },
              {
                number: '02',
                title: 'Diseño y Composición',
                description: 'Aprendé a diseñar tus propios patrones y transferirlos al lienzo de manera profesional'
              },
              {
                number: '03',
                title: 'Acabado Final',
                description: 'Técnicas de terminación y presentación para que tus proyectos luzcan impecables'
              }
            ].map((item, index) => (
              <div
                key={item.number}
                className="text-center"
                style={{
                  transitionDelay: `${1100 + index * 150}ms`
                }}
              >
                <div className="text-6xl md:text-7xl font-bold text-brand-violet/20 mb-4">
                  {item.number}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        {galleryImages && galleryImages.length > 0 && (
          <div
            className={`mb-24 md:mb-32 transition-all duration-1000 delay-1200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 md:mb-16 text-center">
              Galería del Taller
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden group"
                  style={{
                    transitionDelay: `${1400 + index * 100}ms`
                  }}
                >
                  <Image
                    src={urlFor(image).width(800).height(800).url()}
                    alt={`Taller imagen ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-violet/0 group-hover:bg-brand-violet/20 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div
          className={`text-center transition-all duration-1000 delay-1500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-brand-violet/10 to-transparent border-2 border-brand-violet/30 p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Lista para empezar?
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 leading-relaxed">
              Reservá tu lugar en nuestro próximo curso y descubrí el arte del tufting
            </p>
            <a
              href="/contact"
              className="inline-block bg-brand-violet hover:bg-brand-violet/90 text-white font-bold text-lg px-12 py-4 transition-all duration-300 hover:scale-105 uppercase tracking-wider"
            >
              Inscribite Ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
