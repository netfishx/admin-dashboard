"use client";

import { cn } from "@/lib/utils";
import { InboxIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";

interface EmptyProps extends HTMLAttributes<HTMLTableRowElement> {
  icon?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  colSpan?: number;
}

export function Empty({
  icon = <InboxIcon className="h-12 w-12" />,
  title = "暂无数据",
  description,
  className,
  children,
  colSpan,
  ...props
}: EmptyProps) {
  return (
    <tr
      {...props}
      className={cn(
        "h-[400px]", // 设置固定高度
        className,
      )}
    >
      <td colSpan={colSpan} className="align-middle text-center h-full">
        <span className="inline-flex flex-col items-center text-muted-foreground">
          {icon}
          <span className="mt-4 text-sm">{title}</span>
          {description && (
            <span className="mt-2 text-sm text-muted-foreground">
              {description}
            </span>
          )}
          {children}
        </span>
      </td>
    </tr>
  );
}
