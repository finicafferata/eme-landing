import { client, urlFor } from '@/lib/sanity/client'
import { workBySlugQuery, workSlugsQuery } from '@/lib/sanity/queries'
import type { Work } from '@/types/sanity'
import { notFound } from 'next/navigation'
import ProjectGallery from '@/components/projects/ProjectGallery'

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(workSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const work = await client.fetch<Work>(workBySlugQuery, { slug })

  if (!work) {
    return {
      title: 'Proyecto no encontrado'
    }
  }

  const ogImage = work.thumbnail
    ? urlFor(work.thumbnail).width(1200).height(630).url()
    : undefined

  return {
    title: work.name,
    description: work.description || `${work.name} - EME Estudio`,
    openGraph: {
      title: work.name,
      description: work.description || `${work.name} - EME Estudio`,
      type: 'website',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: work.name,
      description: work.description || `${work.name} - EME Estudio`,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const work = await client.fetch<Work>(workBySlugQuery, { slug })

  if (!work) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{work.name}</h1>

        {work.categories && work.categories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {work.categories.map((category) => (
              <span
                key={category._id}
                className="px-4 py-2 bg-light rounded-full text-sm"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {work.description && (
          <p className="text-lg text-foreground/80 leading-relaxed">
            {work.description}
          </p>
        )}
      </div>

      {/* Gallery */}
      {work.gallery && work.gallery.length > 0 && (
        <ProjectGallery images={work.gallery} projectName={work.name} />
      )}
    </article>
  )
}
