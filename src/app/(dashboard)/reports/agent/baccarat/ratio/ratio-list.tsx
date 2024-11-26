import { getRatioReport } from "@/api";
import DetailButton from "@/app/(dashboard)/reports/agent/baccarat/ratio/detail-button";
import { CustomPagination } from "@/components/custom-pagination";
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
  RatioReportRequestParams,
  RatioReportRequestRecords,
} from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.agent");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">
          {t("agentOrOwnerId")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("gameName")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("shareAmount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("blockAmount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("throwAmount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("shareProfitLoss")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("rebateIncome")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("rebateExpense")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("netRebate")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("totalProfitLossAmount")}
        </TableHead>
        <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
          {t("more")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: RatioReportRequestRecords[] }) {
  const translate = await getTranslations();
  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item: RatioReportRequestRecords) => (
          <TableRow key={`${item.userId}`}>
            <TableCell className="w-24 text-center">{item.userId}</TableCell>
            <TableCell className="w-24 text-center">{item.gameName}</TableCell>
            <TableCell className="w-24 text-center">
              {item.expectedShareAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.interceptAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.throwAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.actualShareWinLoss}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.backIncome}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.backOutcome}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.pureBackAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.totalProfitLossAmount}
            </TableCell>
            <TableCell className="w-24 text-center sticky right-0 z-10 bg-background">
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

export async function RatioList({
  searchParams,
}: { searchParams: Promise<RatioReportRequestParams> }) {
  const params = await searchParams;
  const { data } = await getRatioReport(params);
  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <Table>
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={11} />}>
            <ListBody list={data?.list ?? []} />
          </Suspense>
        </Table>
      </div>
      <div className="pt-2">
        <CustomPagination
          total={data?.total ?? 0}
          currentPage={Number(data?.pageNum ?? 1)}
          pageSize={Number(data?.pageSize ?? 10)}
        />
      </div>
    </div>
  );
}
