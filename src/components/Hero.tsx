import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface HeroProps {
  image?: SanityImageSource
}

export default function Hero({ image }: HeroProps) {
  if (!image) {
    return null
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-20 md:py-32">
      <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl aspect-[3/4]">
        <Image
          src={urlFor(image).width(800).height(1067).url()}
          alt="EME Estudio"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
          className="object-contain"
        />
      </div>
    </div>
  )
}
