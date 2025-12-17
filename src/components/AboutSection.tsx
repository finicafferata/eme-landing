'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { PortableText, type PortableTextBlock } from 'next-sanity'
import { useState, useEffect } from 'react'

interface AboutSectionProps {
  title?: string
  content?: PortableTextBlock[]
  heroImage?: any
  teamMembers?: Array<{
    name: string
    role: string
    image?: any
    bio?: string
  }>
}

export default function AboutSection({
  title,
  content,
  heroImage,
  teamMembers
}: AboutSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Effect */}
      {heroImage && (
        <div
          className={`relative w-full h-[60vh] md:h-[80vh] overflow-hidden transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 z-10" />
          <Image
            src={urlFor(heroImage).width(2000).height(1500).url()}
            alt={title || 'Sobre Nosotras'}
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

      {/* Main Content Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Intro Text - Takes More Space */}
          <div
            className={`lg:col-span-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {content && (
              <div className="prose prose-lg md:prose-xl prose-invert max-w-none">
                <div className="text-foreground/90 leading-relaxed space-y-6">
                  <PortableText
                    value={content}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 text-foreground/80">
                            {children}
                          </p>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                            {children}
                          </h3>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="text-brand-violet font-bold">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="text-foreground/60 italic">
                            {children}
                          </em>
                        ),
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Side Accent - Visual Element */}
          <div
            className={`lg:col-span-4 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="sticky top-32">
              <div className="border-l-4 border-brand-violet pl-6 py-4">
                <blockquote className="text-xl md:text-2xl font-bold text-white/90 italic leading-tight">
                  &ldquo;Creamos experiencias visuales que conectan y transforman&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy/Values Section */}
        <div
          className={`mt-24 md:mt-32 lg:mt-40 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: 'Creatividad',
                description: 'Innovación constante en cada proyecto que emprendemos'
              },
              {
                title: 'Colaboración',
                description: 'Trabajamos junto a nuestros clientes para materializar su visión'
              },
              {
                title: 'Excelencia',
                description: 'Atención meticulosa al detalle en cada aspecto del proceso'
              }
            ].map((value, index) => (
              <div
                key={value.title}
                className="group"
                style={{
                  transitionDelay: `${900 + index * 200}ms`
                }}
              >
                <div className="border-t-2 border-brand-violet pt-6 pb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-brand-violet transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section (Optional) */}
        {teamMembers && teamMembers.length > 0 && (
          <div className="mt-24 md:mt-32 lg:mt-40">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 md:mb-16">
              Nuestro Equipo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className={`group transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${1200 + index * 150}ms`
                  }}
                >
                  {member.image && (
                    <div className="relative aspect-[3/4] mb-6 overflow-hidden">
                      <Image
                        src={urlFor(member.image).width(600).height(800).url()}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-brand-violet/0 group-hover:bg-brand-violet/10 transition-colors duration-500" />
                    </div>
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-brand-violet transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-lg text-brand-violet mb-4 uppercase tracking-wider">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-base text-foreground/70 leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div
          className={`mt-24 md:mt-32 lg:mt-40 text-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              ¿Tenés un proyecto en mente?
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 mb-10">
              Nos encantaría escuchar tu idea y trabajar juntas para hacerla realidad
            </p>
            <a
              href="/contact"
              className="inline-block bg-brand-violet hover:bg-brand-violet/90 text-white font-bold text-lg px-12 py-4 transition-all duration-300 hover:scale-105 uppercase tracking-wider"
            >
              Trabajemos juntas
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
