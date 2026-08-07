import Link from "next/link";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReadMore({
  href,
  children,
  onDark = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium tracking-wide transition-colors",
        onDark ? "text-white hover:text-teal" : "text-accent hover:text-accent-2",
        className
      )}
    >
      <MoveRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      {children}
    </Link>
  );
}
