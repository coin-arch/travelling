import { Skeleton } from "@/components/Skeleton";

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs Skeleton */}
        <div className="flex items-center space-x-2 mb-8">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters Skeleton */}
          <aside className="lg:w-72 flex-shrink-0 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton className="h-5 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-6 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton className="h-5 w-1/2 rounded-md" />
                    <Skeleton className="h-4 w-6 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Area Skeleton */}
          <main className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-48" />
              </div>

              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-24 rounded-xl" />
                <Skeleton className="h-10 w-40 rounded-xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100">
                  <Skeleton className="h-60 w-full" />
                  <div className="p-8 space-y-6">
                    <Skeleton className="h-8 w-full" />
                    <div className="flex space-x-6">
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <Skeleton className="h-10 w-28 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
