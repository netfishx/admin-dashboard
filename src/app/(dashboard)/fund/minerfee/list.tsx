import { getOreFeeList } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import CopyButton from "../collection/copy-button";
import { RemoveBtn } from "./remove-btn";

export async function MinerFeeTableBody() {
  const translations = await getTranslations();
  const { data } = await getOreFeeList();

  return (
    <TableBody>
      {data && data.length > 0 ? (
        data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <span className="flex items-center">
                {item.address}
                <CopyButton address={item.address} />
              </span>
            </TableCell>
            <TableCell>{item.coin}</TableCell>
            <TableCell>{formatNumber(Number(item.usdtBalance))}</TableCell>
            <TableCell className="text-center">
              <RemoveBtn data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} className="h-48 text-center">
            {translations("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
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

export async function MinerFeeTableHeader() {
  "use cache";
  const t = await getTranslations("fund.orefee");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-90">{t("address")}</TableHead>
        <TableHead className="w-32">{t("coin")}</TableHead>
        <TableHead className="w-32">{t("usdtBalance")}</TableHead>
        <TableHead className="w-32 text-center">{t("actions")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
