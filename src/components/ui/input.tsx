import type { InputHTMLAttributes, RefObject } from "react";

import { cn } from "@/lib/utils";

export function Input({
  className,
  type,
  ref,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  ref?: RefObject<HTMLInputElement>;
}) {
  return (
    <input
      type={type}
      className={cn(
        "border-input shadow-xs focus-visible:outline-hidden focus-visible:ring-ring disabled:bg-muted flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}
