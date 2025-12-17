import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { workSlugsQuery } from '@/lib/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://eme-estudio.com' // Update with your production domain

  // Get all project slugs
  const slugs = await client.fetch<string[]>(workSlugsQuery)

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]

  // Project pages
  const projectPages = slugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...projectPages]
}
