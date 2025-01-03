"use client";

import { Indicator, Root } from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import type { ComponentProps } from "react";

export function Checkbox({
  ref,
  className,
  checked,
  ...props
}: ComponentProps<typeof Root>) {
  return (
    <Root
      ref={ref}
      className={cn(
        "border-primary focus-visible:outline-hidden focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground peer h-4 w-4 shrink-0 rounded-sm border shadow-sm focus-visible:ring disabled:cursor-not-allowed disabled:opacity-50",
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
