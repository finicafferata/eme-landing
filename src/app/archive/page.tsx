import { client } from '@/lib/sanity/client'
import { pageQuery } from '@/lib/sanity/queries'
import type { Page } from '@/types/sanity'
import WorkshopSection from '@/components/WorkshopSection'

export const metadata = {
  title: 'Taller | EME Estudio',
  description: 'Talleres y workshops de EME Estudio - Aprendé tufting',
}

export const revalidate = 60

export default async function ArchivePage() {
  const page = await client.fetch<Page>(pageQuery, { pageId: 'archive' })

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Taller</h1>
          <p className="text-foreground/60 text-lg">
            Contenido en construcción. Por favor, agregá contenido desde Sanity Studio.
          </p>
        </div>
      </div>
    )
  }

  return (
    <WorkshopSection
      title={page.title}
      content={page.content}
      heroImage={page.heroImage}
      galleryImages={page.galleryImages}
    />
  )
}
