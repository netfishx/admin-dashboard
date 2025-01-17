import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import type { HTMLAttributes, RefObject } from "react";

export function Breadcrumb({
  ref,
  ...props
}: HTMLAttributes<HTMLElement> & {
  ref?: RefObject<HTMLElement>;
}) {
  return <nav ref={ref} aria-label="breadcrumb" {...props} />;
}
export function BreadcrumbList({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLOListElement> & {
  ref?: RefObject<HTMLOListElement>;
}) {
  return (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbItem({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLLIElement> & {
  ref?: RefObject<HTMLLIElement>;
}) {
  return (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

export function BreadcrumbLink({
  ref,
  asChild,
  className,
  ...props
}: HTMLAttributes<HTMLAnchorElement> & {
  asChild?: boolean;
  ref?: RefObject<HTMLAnchorElement>;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
}

export function BreadcrumbPage({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  ref?: RefObject<HTMLSpanElement>;
}) {
  return (
    <span
      ref={ref}
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:h-3.5 [&>svg]:w-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

export function BreadcrumbEllipsis({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
}
