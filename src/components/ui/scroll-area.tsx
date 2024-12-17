"use client";

import {
  Corner,
  Root,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  Viewport,
} from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";
import type { ComponentProps, RefObject } from "react";

export function ScrollArea({
  ref,
  className,
  children,
  ...props
}: ComponentProps<typeof Root> & {
  ref?: RefObject<HTMLDivElement>;
}) {
  return (
    <Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </Viewport>
      <ScrollBar />
      <Corner />
    </Root>
  );
}

export function ScrollBar({
  ref,
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<typeof ScrollAreaScrollbar> & {
  ref?: RefObject<HTMLDivElement>;
}) {
  return (
    <ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className,
      )}
      {...props}
    >
      <ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaScrollbar>
  );
}
