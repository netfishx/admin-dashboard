"use client";

import { Item, Root } from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";

import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { type ComponentProps, createContext, useContext } from "react";

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

export function ToggleGroup({
  ref,
  className,
  variant,
  size,
  children,
  ...props
}: ComponentProps<typeof Root> & VariantProps<typeof toggleVariants>) {
  return (
    <Root
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)}
      {...props}
    >
      <ToggleGroupContext value={{ variant, size }}>
        {children}
      </ToggleGroupContext>
    </Root>
  );
}

export function ToggleGroupItem({
  ref,
  className,
  children,
  variant,
  size,
  ...props
}: ComponentProps<typeof Item> & VariantProps<typeof toggleVariants>) {
  const context = useContext(ToggleGroupContext);

  return (
    <Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          // biome-ignore lint/style/useExplicitLengthCheck: <explanation>
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </Item>
  );
}
