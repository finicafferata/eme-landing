'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface ProjectGalleryProps {
  images: SanityImageSource[]
  projectName: string
}

export default function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const lightboxSlides = images.map((image: any, index) => ({
    src: urlFor(image).width(1920).url(),
    alt: projectName,
    key: image._key || image.asset?._ref || `slide-${index}`
  }))

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {images.map((image: any, index) => {
          const imageKey = image._key || image.asset?._ref || `image-${index}`
          return (
            <button
              key={imageKey}
              onClick={() => openLightbox(index)}
              className="relative aspect-[4/3] bg-light cursor-pointer group"
            >
              <Image
                src={urlFor(image).width(1200).url()}
                alt={`${projectName} - Image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
              </div>
            </button>
          )
        })}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={currentIndex}
        on={{
          view: ({ index }) => setCurrentIndex(index)
        }}
      />
    </>
  )
}
