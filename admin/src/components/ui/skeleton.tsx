import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-primary/10 h-8 w-full animate-pulse rounded-md",
        className,
      )}
      {...props}
    />
  );
}
