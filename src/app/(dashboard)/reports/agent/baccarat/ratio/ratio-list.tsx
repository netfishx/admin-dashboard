import { getRatioReport } from "@/api";
import DetailButton from "@/app/(dashboard)/reports/agent/baccarat/ratio/detail-button";
import Pages from "@/components/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RatioReportListTypes } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function RatioList({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const t = await getTranslations("report.agent");
  const search = await searchParams;

  const { data } = await getRatioReport({
    ...search,
    openStartTime: search?.startTime,
    openEndTime: search?.endTime,
    page: Number(search?.page ?? 1),
    size: Number(search?.size ?? 10),
  });

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="p-2 bg-background flex-1">
        <div className="py-2">{t("title")}</div>
        <div className="border rounded-sm relative">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="min-w-24 text-center">
                  {t("agentOrOwnerId")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("gameName")}
                </TableHead>
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
                <TableHead className="min-w-24 text-center">
                  {t("netRebate")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("totalProfitLossAmount")}
                </TableHead>
                <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
                  {t("more")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.list?.map((item: RatioReportListTypes) => (
                <TableRow key={`${item.userId}`}>
                  <TableCell className="w-24 text-center">
                    {item.userId}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.gameName}
                  </TableCell>
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
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="pt-2">
          <Pages
            total={data?.total ?? 0}
            currentPage={Number(data?.pageNum ?? 1)}
            pageSize={Number(data?.pageSize ?? 10)}
          />
        </div>
      </div>
    </Suspense>
  );
}
