import { Skeleton } from "@/components/Skeleton";

export default function ActivityDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-20">
        {/* Breadcrumbs Skeleton */}
        <div className="flex space-x-2 mb-8">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Title and Badge Skeleton */}
        <div className="mb-10">
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-48" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-12">
            {/* Image Slider Skeleton */}
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden">
              <Skeleton className="h-full w-full" />
              <div className="absolute bottom-6 left-6 right-6 flex space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-20 w-32 rounded-2xl flex-shrink-0" />
                ))}
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-48 mb-6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Amenities Skeleton */}
            <div>
              <Skeleton className="h-8 w-48 mb-8" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-2xl" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 rounded-[3rem] border border-slate-100 bg-white shadow-sm space-y-6">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-14 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
