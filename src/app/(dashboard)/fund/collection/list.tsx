import DetailButton from "@/app/(dashboard)/fund/collection/detail-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CollectionAddressListRecords } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import CopyButton from "./copy-button";

export async function List({ data }: { data: CollectionAddressListRecords[] }) {
  const t = await getTranslations("fund.collection");
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm relative">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="min-w-24 text-center">
                  {t("address")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("currency")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("balance")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("status")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("createTime")}
                </TableHead>
                <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
                  操作
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item: CollectionAddressListRecords) => (
                <TableRow key={item.address}>
                  <TableCell className="w-32 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {item.address}
                      <CopyButton address={item.address} />
                    </div>
                  </TableCell>
                  <TableCell className="w-32 text-center">
                    {item.coin}
                  </TableCell>
                  <TableCell className="w-36 text-center">
                    {item.coin}
                  </TableCell>
                  <TableCell className="w-36 text-center">
                    {item.status}
                  </TableCell>
                  <TableCell className="w-36 text-center">
                    {item.updateTime}
                  </TableCell>
                  <TableCell className="w-12 text-center sticky right-0 z-10 bg-background">
                    <DetailButton id={item.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Suspense>
  );
}
