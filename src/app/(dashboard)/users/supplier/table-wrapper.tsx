"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Supplier } from "@/lib/types";
import { supplierLoadingAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { EditButton } from "./edit";

export function SupplierTable({ data }: { data: Supplier[] | undefined }) {
  const translation = useTranslations();
  const t = useTranslations("users.supplier");
  const supplierLoading = useAtomValue(supplierLoadingAtom);
  if (supplierLoading) {
    return <TbodySkeleton />;
  }

  return (
    <TableBody>
      {data && data.length > 0 ? (
        data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.nickname}</TableCell>
            <TableCell>{item.remark}</TableCell>
            <TableCell>
              <ShowStatus status={item.status} />
            </TableCell>
            <TableCell className="w-24 text-center">
              <EditButton data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="h-40 text-center">
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

function ShowStatus({ status }: { status: number }) {
  const t = useTranslations("users.supplier");
  if (status === 0) {
    return (
      <div className="w-fit rounded-sm bg-green/10 px-2 text-green">
        {t("enable")}
      </div>
    );
  }
  return (
    <div className="w-fit rounded-sm bg-destructive/10 px-2 text-destructive">
      {t("disable")}
    </div>
  );
}
