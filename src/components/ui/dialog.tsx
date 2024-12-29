"use client";

import { cn } from "@/lib/utils";
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";

export {
  Root as Dialog,
  Trigger as DialogTrigger,
  Portal as DialogPortal,
  Close as DialogClose,
};

export function DialogOverlay({
  ref,
  className,
  ...props
}: ComponentProps<typeof Overlay>) {
  return (
    <Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

export function DialogContent({
  ref,
  className,
  children,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Portal>
      <DialogOverlay />
      <Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg max-h-[90dvh] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
          className,
        )}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        {...props}
      >
        {children}
        <Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring focus:ring-ring disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Close>
      </Content>
    </Portal>
  );
}

export function DialogHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className,
      )}
      {...props}
    />
  );
}

export function DialogTitle({
  ref,
  className,
  ...props
}: ComponentProps<typeof Title>) {
  return (
    <Title
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function DialogDescription({
  ref,
  className,
  ...props
}: ComponentProps<typeof Description>) {
  return (
    <Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
