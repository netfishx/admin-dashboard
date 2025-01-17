import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "h-8 w-full animate-pulse rounded-md bg-primary/10",
        className,
      )}
      {...props}
    />
  );
}
