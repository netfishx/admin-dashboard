"use client";

import { Indicator, Root } from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import type { ComponentProps } from "react";

export function Checkbox({
  className,
  checked,
  ...props
}: ComponentProps<typeof Root>) {
  return (
    <Root
      className={cn(
        "peer size-4 shrink-0 rounded-sm border border-input shadow-xs outline-none transition-shadow focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=indeterminate]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground dark:aria-invalid:ring-destructive/40",
        className,
      )}
      checked={checked}
      {...props}
    >
      <Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        {checked === "indeterminate" ? (
          <Minus className="h-4 w-4" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </Indicator>
    </Root>
  );
}
