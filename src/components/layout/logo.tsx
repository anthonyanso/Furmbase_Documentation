import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 shrink-0 transition-opacity hover:opacity-80",
        className
      )}
    >
      <Image
        src="/furmbase-logo.png"
        alt="Furmbase"
        width={26}
        height={26}
        className="rounded-md"
        priority
      />
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        Furmbase
      </span>
      <span className="hidden sm:inline rounded-md border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
        Docs
      </span>
    </Link>
  );
}
