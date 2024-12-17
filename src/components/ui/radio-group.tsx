"use client";

import { Indicator, Item, Root } from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ComponentProps, RefObject } from "react";

export function RadioGroup({
  ref,
  className,
  ...props
}: ComponentProps<typeof Root> & {
  ref?: RefObject<HTMLDivElement>;
}) {
  return <Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
}

export function RadioGroupItem({
  ref,
  className,
  ...props
}: ComponentProps<typeof Item> & {
  ref?: RefObject<HTMLDivElement>;
}) {
  return (
    <Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow-sm focus:outline-hidden focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </Indicator>
    </Item>
  );
}
