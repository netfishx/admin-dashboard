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
        "bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1",
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
        "focus-visible:outline-hidden focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
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
        "focus-visible:outline-hidden focus-visible:ring-ring mt-2 focus-visible:ring",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs };
