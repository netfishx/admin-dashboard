import { getCollectionAddressList } from "@/api";
import { DetailButton } from "@/app/(dashboard)/fund/collection/detail-button";
import TableSkeleton from "@/components/table-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  CollectionAddressListRecords,
  CollectionAddressListRequestParams,
} from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import CopyButton from "./copy-button";

async function ListHeader() {
  "use cache";
  const t = await getTranslations("fund.collection");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">{t("address")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("currency")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("balance")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("status")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("createTime")}
        </TableHead>
        <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
          {t("caozuo")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: CollectionAddressListRecords[] }) {
  const translate = await getTranslations();
  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item: CollectionAddressListRecords) => (
          <TableRow key={item.address}>
            <TableCell className="w-32 text-center">
              <div className="flex items-center justify-center gap-2">
                {item.address}
                <CopyButton address={item.address} />
              </div>
            </TableCell>
            <TableCell className="w-32 text-center">{item.coin}</TableCell>
            <TableCell className="w-36 text-center">{item.coin}</TableCell>
            <TableCell className="w-36 text-center">{item.status}</TableCell>
            <TableCell className="w-36 text-center">
              {item.updateTime}
            </TableCell>
            <TableCell className="w-12 text-center sticky right-0 z-10 bg-background">
              <DetailButton item={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={15} className="text-center h-40">
            {translate("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export async function List({
  searchParams,
}: { searchParams: Promise<CollectionAddressListRequestParams> }) {
  const params = await searchParams;
  const { data } = await getCollectionAddressList(params);
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <Table>
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={10} />}>
            <ListBody list={data ?? []} />
          </Suspense>
        </Table>
      </div>
    </div>
  );
}
