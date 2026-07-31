import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-8 lg:px-12 xl:px-16">
      <Skeleton className="h-9 w-48" />
      <Skeleton className="mt-4 h-5 w-full max-w-xl" />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-11 w-full sm:max-w-xs" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-24 rounded-full" />
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border">
            <Skeleton className="aspect-[16/9] w-full rounded-t-2xl" />
            <div className="p-5 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border">
            <Skeleton className="aspect-[16/10] w-full rounded-t-2xl" />
            <div className="p-5 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
