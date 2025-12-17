import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface Category {
  _id: string
  name: string
  slug: {
    current: string
  }
}

export interface Work {
  _id: string
  name: string
  slug: {
    current: string
  }
  thumbnail: SanityImageSource
  categories: Category[]
  description?: string
  gallery?: SanityImageSource[]
}

export interface Page {
  title: string
  heroImage?: SanityImageSource
  content?: any[] // Portable text blocks
  galleryImages?: SanityImageSource[]
}

export interface ContactInfo {
  address: string
  email: string
  phone: string
}

export interface SiteSettings {
  logo?: SanityImageSource
  homeHeroImage?: SanityImageSource
  contactInfo: ContactInfo
  footerCTA: string
}
