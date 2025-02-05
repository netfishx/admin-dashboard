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
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow-sm focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
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
