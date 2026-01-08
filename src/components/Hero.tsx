import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

interface HeroProps {
  image?: any
}

export default function Hero({ image }: HeroProps) {
  if (!image) {
    return null
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full viewport hero image */}
      <Image
        src={urlFor(image).width(2400).height(1600).url()}
        alt="EME Estudio"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={90}
      />

      {/* Subtle gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Optional: Brand/Title overlay - positioned bottom-left (editorial style) */}
      <div className="absolute bottom-12 left-8 md:bottom-16 md:left-12 z-10">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          EME Estudio
        </h1>
        <p className="text-white/90 text-lg md:text-xl mt-2 font-light">
          Tufting · Hand-made products
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  )
}
