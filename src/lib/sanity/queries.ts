// Get all works/projects for homepage
export const worksQuery = `
  *[_type == "work"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    thumbnail,
    categories[]-> {
      _id,
      name,
      slug
    }
  }
`

// Get single work by slug
export const workBySlugQuery = `
  *[_type == "work" && slug.current == $slug][0] {
    name,
    description,
    thumbnail,
    gallery,
    categories[]-> {
      _id,
      name,
      slug
    }
  }
`

// Get all slugs for static generation
export const workSlugsQuery = `
  *[_type == "work"].slug.current
`

// Get page by pageId
export const pageQuery = `
  *[_type == "page" && pageId == $pageId][0] {
    title,
    heroImage,
    content,
    galleryImages
  }
`

// Get site settings
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    logo,
    homeHeroImage,
    contactInfo,
    footerCTA
  }
`

// Get all categories
export const categoriesQuery = `
  *[_type == "category"] {
    _id,
    name,
    slug
  }
`
