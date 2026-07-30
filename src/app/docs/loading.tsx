import { Skeleton } from "@/components/ui/skeleton";

export default function DocsLoading() {
  return (
    <div className="flex gap-10 py-8 lg:py-10">
      <article className="min-w-0 max-w-3xl flex-1">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-5 h-10 w-2/3" />
        <Skeleton className="mt-4 h-5 w-full max-w-lg" />

        <div className="mt-10 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="mt-8 h-7 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-6 h-32 w-full rounded-xl" />
        </div>
      </article>

      <aside className="hidden w-60 shrink-0 xl:block">
        <Skeleton className="h-4 w-24" />
        <div className="mt-4 space-y-3">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
          <Skeleton className="h-3.5 w-4/6" />
          <Skeleton className="h-3.5 w-full" />
        </div>
      </aside>
    </div>
  );
}
