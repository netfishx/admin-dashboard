import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OreFeeList } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { RemoveBtn } from "./remove-btn";

export async function List({ data }: { data?: { list: OreFeeList[] } }) {
  const t = await getTranslations("fund.orefee");
  const translations = await getTranslations();
  return (
    <div className="p-2  bg-background gap-2 flex flex-col h-full">
      <div className="border rounded-sm">
        <Table>
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
          <Suspense
            fallback={
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <TableRow key={i}>
                    <TableCell colSpan={10} className="h-40">
                      <Skeleton className="w-full h-full" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            }
          >
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
