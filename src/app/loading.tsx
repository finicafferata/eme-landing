export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Skeleton */}
      <div className="w-full h-[60vh] bg-light animate-pulse mb-12" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-[4/5] bg-light animate-pulse" />
            <div className="h-6 bg-light animate-pulse rounded w-3/4" />
            <div className="h-4 bg-light animate-pulse rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}
