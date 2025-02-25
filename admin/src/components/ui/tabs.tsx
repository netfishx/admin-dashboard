"use client";

import { Content, List, Root, Trigger } from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const Tabs = Root;

export function TabsList({ className, ...props }: ComponentProps<typeof List>) {
  return (
    <List
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-2 py-1 font-medium text-sm transition-[color,box-shadow] focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Content className={cn("flex-1 outline-none", className)} {...props} />
  );
}

export { Tabs };
