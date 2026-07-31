import { Skeleton } from "@/components/ui/skeleton";

export default function TutorialsLoading() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-8 lg:px-12 xl:px-16">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="mt-4 h-5 w-full max-w-xl" />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border p-3">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <div className="p-2 pt-4 space-y-2">
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
