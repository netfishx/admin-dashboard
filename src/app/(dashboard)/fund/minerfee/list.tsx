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
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { RemoveBtn } from "./remove-btn";

export async function List() {
  const translations = await getTranslations();
  const { data } = await getOreFeeList();
  return (
    <div className="p-2  bg-background gap-2 flex flex-col h-full">
      <div className="border rounded-sm">
        <Table>
          <TableHeaderWrapper />
          <Suspense fallback={<TableBodySkeleton />}>
            <TableBody>
              {data && data.list.length > 0 ? (
                data.list.map((item) => (
                  <TableRow key={Math.random()}>
                    <TableCell className="w-24 text-center">
                      {item.address}
                    </TableCell>
                    <TableCell className="w-24 text-center">
                      {item.coin}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.usdtBalance}
                    </TableCell>
                    <TableCell className="w-24 text-center">
                      <RemoveBtn data={item} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center h-40">
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
          <TableCell colSpan={10}>
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
        <TableHead className="w-24 min-w-24 text-center">
          {t("address")}
        </TableHead>
        <TableHead className="text-center">{t("coin")}</TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("usdtBalance")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("actions")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
