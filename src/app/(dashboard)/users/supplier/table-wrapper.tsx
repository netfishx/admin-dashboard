"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Supplier } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { EditButton } from "./edit";

export function SupplierTable({ data }: { data: Supplier[] | undefined }) {
  const translation = useTranslations();
  const t = useTranslations("users.supplier");
  return (
    <TableBody>
      {data && data.length > 0 ? (
        data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.nickname}</TableCell>
            <TableCell className="break-all">{item.remark}</TableCell>
            <TableCell className="text-center">
              <span
                className={cn(
                  "inline-block h-6 w-16 rounded-sm leading-6",
                  item.status === 0 && "bg-green/10 text-green",
                  item.status === 1 && "bg-destructive/10 text-destructive",
                )}
              >
                {item.status === 0 ? t("enable") : t("disable")}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <EditButton data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="h-48 text-center">
            {translation("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export function TbodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={6}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
