"use client";

import { Root } from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Separator({
  ref,
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: ComponentProps<typeof Root>) {
  return (
    <Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  );
}
