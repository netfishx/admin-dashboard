import { getCollectionAddressList } from "@/api";
import { DetailButton } from "@/app/(dashboard)/fund/collection/detail-button";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COLLECTION_STATUS } from "@/lib/dict";
import type { CollectionAddressListRecords } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import CopyButton from "./copy-button";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("fund.collection");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-90">{t("address")}</TableHead>
        <TableHead className="w-32">{t("currency")}</TableHead>
        <TableHead className="w-32">{t("balance")}</TableHead>
        <TableHead className="w-32 text-center">{t("status")}</TableHead>
        <TableHead className="w-50">{t("createTime")}</TableHead>
        <TableHead className="bg-muted sticky right-0 w-48 p-0 text-center">
          <div className=" shadow-l flex h-full items-center justify-center">
            {t("caozuo")}
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: CollectionAddressListRecords[] }) {
  const translate = await getTranslations();
  const t = await getTranslations("fund.collection");

  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item: CollectionAddressListRecords) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="flex items-center">
                <span>{item.address}</span>
                <CopyButton address={item.address} />
              </div>
            </TableCell>
            <TableCell>{item.coin}</TableCell>
            <TableCell>{formatNumber(item.usdtBalance)}</TableCell>
            <TableCell className="w-32 text-center">
              <div
                className={cn(
                  "inline-block h-6 w-16 rounded-sm leading-6",
                  item.status === 0 && "bg-destructive/10 text-destructive",
                  item.status === 1 && "bg-green/10 text-green",
                  item.status === 2 && "bg-orange/10 text-orange",
                )}
              >
                {(() => {
                  const status = COLLECTION_STATUS.find(
                    (s) => s.value === item.status,
                  );
                  return status ? t(status.label) : item.status;
                })()}
              </div>
            </TableCell>
            <TableCell>{item.updateTime}</TableCell>
            <TableCell className="bg-background sticky right-0 p-0">
              <div className="shadow-l flex items-center justify-center px-4 py-2">
                <DetailButton item={item} />
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="h-48 text-center">
            {translate("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export async function List() {
  const { data } = await getCollectionAddressList({ size: 100 });
  return <ListBody list={data ?? []} />;
}
