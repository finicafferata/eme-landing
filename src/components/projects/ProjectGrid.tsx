import ProjectCard from './ProjectCard'
import type { Work } from '@/types/sanity'

interface ProjectGridProps {
  works: Work[]
}

export default function ProjectGrid({ works }: ProjectGridProps) {
  if (!works || works.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-foreground/60">No hay proyectos para mostrar</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
      {works.map((work) => (
        <ProjectCard key={work._id} work={work} />
      ))}
    </div>
  )
}
