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
        src="https://ik.imagekit.io/zzqgwdyat/Furmbase%20Logo/Furmbase_logo?updatedAt=1778245548231"
        alt="Furmbase"
        width={26}
        height={26}
        priority
      />
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        Furmbase
      </span>
    </Link>
  );
}
