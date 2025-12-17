import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { Work } from '@/types/sanity'

interface ProjectCardProps {
  work: Work
}

export default function ProjectCard({ work }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${work.slug.current}`}
      className="group block"
    >
      <div className="relative overflow-hidden bg-zinc-900 mb-4 aspect-[4/5]">
        <Image
          src={urlFor(work.thumbnail).width(1600).height(1200).url()}
          alt={work.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-brand-violet transition-colors duration-300">
          {work.name}
        </h3>
        {work.categories && work.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {work.categories.map((category) => (
              <span
                key={category._id}
                className="text-sm md:text-base text-white/50"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
