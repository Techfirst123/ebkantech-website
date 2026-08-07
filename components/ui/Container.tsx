import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}
