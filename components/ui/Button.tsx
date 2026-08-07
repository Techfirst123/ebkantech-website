import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "onDark";

const base =
  "inline-flex items-center justify-center px-7 py-3 text-xs font-medium uppercase tracking-widest transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white border border-accent hover:bg-ink hover:border-ink",
  secondary: "bg-white text-ink border border-accent/60 hover:border-accent hover:bg-accent hover:text-white",
  onDark: "bg-transparent text-white border border-white/50 hover:bg-white/10 hover:border-white",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
