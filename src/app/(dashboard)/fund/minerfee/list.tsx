import { getOreFeeList } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { RemoveBtn } from "./remove-btn";

export async function List() {
  const translations = await getTranslations();
  const { data } = await getOreFeeList();

  return (
    <div className="flex h-full flex-col gap-2 bg-background">
      <div className="rounded-sm border">
        <Table className="table-fixed">
          <TableHeaderWrapper />
          <Suspense fallback={<TableBodySkeleton />}>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-24">{item.address}</TableCell>
                    <TableCell className="w-24 ">{item.coin}</TableCell>
                    <TableCell className="w-24">
                      {formatNumber(Number(item.usdtBalance))}
                    </TableCell>
                    <TableCell className="w-24 text-center">
                      <RemoveBtn data={item} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-40 text-center">
                    {translations("noData")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Suspense>
        </Table>
      </div>
    </div>
  );
}

export function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={4}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export async function TableHeaderWrapper() {
  const t = await getTranslations("fund.orefee");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead>{t("address")}</TableHead>
        <TableHead>{t("coin")}</TableHead>
        <TableHead>{t("usdtBalance")}</TableHead>
        <TableHead className="text-center">{t("actions")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
