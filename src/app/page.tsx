import { client } from '@/lib/sanity/client'
import { worksQuery, siteSettingsQuery } from '@/lib/sanity/queries'
import type { Work, SiteSettings } from '@/types/sanity'
import Hero from '@/components/Hero'
import HorizontalScroll from '@/components/HorizontalScroll'
import ProjectGrid from '@/components/projects/ProjectGrid'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const [works, settings] = await Promise.all([
    client.fetch<Work[]>(worksQuery),
    client.fetch<SiteSettings>(siteSettingsQuery)
  ])

  return (
    <>
      <Hero image={settings?.homeHeroImage} />
      <HorizontalScroll settings={settings} />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-32 md:pt-48 pb-24 md:pb-32">
        <ProjectGrid works={works} />
      </div>
    </>
  )
}
