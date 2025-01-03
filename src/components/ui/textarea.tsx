import { cn } from "@/lib/utils";
import type { RefObject, TextareaHTMLAttributes } from "react";

export function Textarea({
  ref,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: RefObject<HTMLTextAreaElement>;
}) {
  return (
    <textarea
      className={cn(
        "border-input shadow-xs focus-visible:outline-hidden focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}
