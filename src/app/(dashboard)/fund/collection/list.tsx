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
        <TableHead className="w-48 sticky right-0 bg-muted text-center p-0">
          <div className=" h-full flex shadow-l justify-center items-center">
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
            <TableCell className="text-center w-32">
              <div
                className={cn(
                  "inline-block w-fit rounded-sm px-2 text-center",
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
            <TableCell className="sticky right-0 bg-background p-0">
              <div className="shadow-l py-2 px-4 flex justify-center items-center">
                <DetailButton item={item} />
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="h-40 text-center">
            {translate("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export async function List() {
  const { data } = await getCollectionAddressList();
  return <ListBody list={data ?? []} />;
}
