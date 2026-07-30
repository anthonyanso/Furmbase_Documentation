import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-28 text-center sm:px-6">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <FileQuestion className="size-6" />
      </span>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-2 text-muted-foreground">
        The documentation page you&apos;re looking for doesn&apos;t exist or
        may have moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" asChild>
          <Link href="/docs/getting-started">Browse Docs</Link>
        </Button>
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
