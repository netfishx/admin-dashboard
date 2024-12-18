"use client";

import { cn } from "@/lib/utils";
import { Content, Root, Trigger } from "@radix-ui/react-collapsible";
import type { ComponentProps } from "react";

export { Root as Collapsible, Trigger as CollapsibleTrigger };

export function CollapsibleContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Content
      className={cn(
        "text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    >
      {children}
    </Content>
  );
}
