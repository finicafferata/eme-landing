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
  thumbnail: any
  categories: Category[]
  description?: string
  gallery?: any[]
}

export interface Page {
  title: string
  heroImage?: any
  content?: any[] // Portable text blocks
  galleryImages?: any[]
}

export interface ContactInfo {
  address: string
  email: string
  phone: string
}

export interface SiteSettings {
  logo?: any
  homeHeroImage?: any
  contactInfo: ContactInfo
  footerCTA: string
}
