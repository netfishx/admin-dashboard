import { getSupplierReportList } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import TableSkeleton from "@/components/table-skeleton";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  SupplierReportRecords,
  SupplierReportRequestParams,
} from "@/lib/types";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.supplier");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">
          {t("supplierID")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("supplierName")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("date")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("game")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("betNum")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("validAmount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("proportionAmount")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: SupplierReportRecords[] }) {
  const translate = await getTranslations();
  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item) => (
          <TableRow key={item.supplierId}>
            <TableCell className="w-24 text-center">
              {item.supplierId}
            </TableCell>
            <TableCell className="w-24 text-center">{item.gameName}</TableCell>
            <TableCell className="w-24 text-center">
              {format(item.analysisTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell className="w-24 text-center">{item.gameId}</TableCell>
            <TableCell className="w-24 text-center">{item.betNum}</TableCell>
            <TableCell className="w-24 text-center">
              {item.validAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.shareAmount}
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={7} className="text-center h-40">
            {translate("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export async function List({
  searchParams,
}: { searchParams: Promise<SupplierReportRequestParams> }) {
  const t = await getTranslations("report.supplier");
  const params = await searchParams;
  const { data } = await getSupplierReportList(params);
  return (
    <div className="p-2 bg-background flex-1">
      <div>
        <Label className="min-w-24 text-center text-sm">{t("betNum")}:</Label>
        <span className="min-w-24 text-center text-sm">
          {data?.list?.[0]?.totalBetNum ?? 0} &nbsp;
        </span>
        <Label className="min-w-24 text-center text-sm">
          {t("betAmount")}:
        </Label>
        <span className="min-w-24 text-center text-sm">
          {data?.list?.[0]?.totalValidAmount ?? 0} &nbsp;
        </span>
        <Label className="min-w-24 text-center text-sm">
          {t("validBetAmount")}:
        </Label>
        <span className="min-w-24 text-center text-sm">
          {data?.list?.[0]?.totalShareAmount ?? 0} &nbsp;
        </span>
      </div>
      <div className="border rounded-sm relative">
        <Table>
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={10} />}>
            <ListBody list={data?.list ?? []} />
          </Suspense>
        </Table>
      </div>
      <div className="pt-2">
        <CustomPagination
          total={data?.total ?? 0}
          currentPage={data?.pageNum ?? 1}
          pageSize={data?.pageSize ?? 10}
        />
      </div>
    </div>
  );
}
