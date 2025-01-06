import { cn } from "@/lib/utils";
import type {
  HTMLAttributes,
  RefObject,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

export function ScrollableTable({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLTableElement> & {
  ref?: RefObject<HTMLTableElement>;
}) {
  return (
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  );
}

export function Table({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLTableElement> & {
  ref?: RefObject<HTMLTableElement>;
}) {
  return (
    <div className="relative h-full w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement> & {
  ref?: RefObject<HTMLTableSectionElement>;
}) {
  return (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  );
}

export function TableBody({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement> & {
  ref?: RefObject<HTMLTableSectionElement>;
}) {
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

export function TableFooter({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement> & {
  ref?: RefObject<HTMLTableSectionElement>;
}) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        "bg-muted/50 border-t font-medium last:[&>tr]:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

export function TableRow({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement> & {
  ref?: RefObject<HTMLTableRowElement>;
}) {
  return (
    <tr
      ref={ref}
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({
  ref,
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & {
  ref?: RefObject<HTMLTableCellElement>;
}) {
  return (
    <th
      ref={ref}
      className={cn(
        "text-muted-foreground h-10 text-nowrap px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({
  ref,
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & {
  ref?: RefObject<HTMLTableCellElement>;
}) {
  return (
    <td
      ref={ref}
      className={cn(
        "px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

export function TableCaption({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLTableCaptionElement> & {
  ref?: RefObject<HTMLTableCaptionElement>;
}) {
  return (
    <caption
      ref={ref}
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}
