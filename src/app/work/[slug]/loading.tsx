export default function Loading() {
  return (
    <article className="container mx-auto px-4 py-12">
      {/* Header Skeleton */}
      <div className="max-w-4xl mx-auto mb-12 space-y-4">
        <div className="h-12 bg-light animate-pulse rounded w-2/3" />
        <div className="flex gap-3">
          <div className="h-8 w-24 bg-light animate-pulse rounded-full" />
          <div className="h-8 w-24 bg-light animate-pulse rounded-full" />
        </div>
        <div className="h-20 bg-light animate-pulse rounded" />
      </div>

      {/* Gallery Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-[4/3] bg-light animate-pulse" />
        ))}
      </div>
    </article>
  )
}
