"use client";

import { Content, List, Root, Trigger } from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const Tabs = Root;

export function TabsList({
  ref,
  className,
  ...props
}: ComponentProps<typeof List>) {
  return (
    <List
      ref={ref}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  ref,
  className,
  ...props
}: ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 font-medium text-sm transition-all focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  ref,
  className,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Content
      ref={ref}
      className={cn(
        "mt-2 focus-visible:outline-hidden focus-visible:ring focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs };
