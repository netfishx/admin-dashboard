import { getDailiReport } from "@/api";
import DetailButton from "@/app/(dashboard)/reports/agent/baccarat/member/detail-button";
import Pages from "@/components/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function MemberList({ searchParams }: { searchParams: any }) {
  const t = await getTranslations("report.agent");
  const search = await searchParams;
  const { data } = await getDailiReport({
    ...search,
    openStartTime: search?.startTime,
    openEndTime: search?.endTime,
    pageNum: Number(search?.pageNum ?? 1),
    pageSize: Number(search?.pageSize ?? 10),
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
                  {t("leastlevelID")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("gameName")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("betNum")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("memberBetting")}
                </TableHead>
                <TableHead className="min-w-24 text-center">
                  {t("memberProfitLoss")}
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
              {data?.list?.map((item: any) => (
                <TableRow key={item.agentId}>
                  <TableCell className="w-24 text-center">
                    {item.agentId}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.gameName}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.betNum}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.memberBetAmount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.memberProfitLossAmount}
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
                    <DetailButton id={item.agentId} />
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
