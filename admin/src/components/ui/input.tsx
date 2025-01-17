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
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}
