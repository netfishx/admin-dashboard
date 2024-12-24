import { getCollectionAddressList } from "@/api";
import { DetailButton } from "@/app/(dashboard)/fund/collection/detail-button";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CollectionAddressListRecords } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import CopyButton from "./copy-button";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("fund.collection");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-90 text-center">{t("address")}</TableHead>
        <TableHead className="w-32">{t("currency")}</TableHead>
        <TableHead className="w-32">{t("balance")}</TableHead>
        <TableHead className="w-24">{t("status")}</TableHead>
        <TableHead className="w-50">{t("createTime")}</TableHead>
        <TableHead className="sticky right-0 w-60 bg-muted text-center">
          {t("caozuo")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: CollectionAddressListRecords[] }) {
  const translate = await getTranslations();
  const t = await getTranslations("fund.collection");
  const typeMap = {
    0: t("disable"),
    1: t("enable"),
    2: t("locked"),
  };
  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item: CollectionAddressListRecords) => (
          <TableRow key={item.id}>
            <TableCell>
              <span className="flex items-center justify-center">
                {item.address}
                <CopyButton address={item.address} />
              </span>
            </TableCell>
            <TableCell>{item.coin}</TableCell>
            <TableCell>{item.usdtBalance}</TableCell>
            <TableCell>
              {typeMap[item.status as keyof typeof typeMap]}
            </TableCell>
            <TableCell>{item.updateTime}</TableCell>
            <TableCell className="sticky right-0 bg-background flex items-center justify-center">
              <DetailButton item={item} />
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
