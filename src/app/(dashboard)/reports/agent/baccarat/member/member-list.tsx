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
    ...searchParams,
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
                <TableRow key={item.leastlevelID}>
                  <TableCell className="w-24 text-center">
                    {item.leastlevelID}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.gameName}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.betNum}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.memberBetting}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.memberProfitLoss}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.shareAmount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.blockAmount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.throwAmount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.shareProfitLoss}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.rebateIncome}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.rebateExpense}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.netRebate}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.totalProfitLossAmount}
                  </TableCell>
                  <TableCell className="w-24 text-center sticky right-0 z-10 bg-background">
                    <DetailButton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="pt-2">
          <Pages
            total={data?.total ?? 0}
            currentPage={Number(data?.page ?? 1)}
            pageSize={Number(data?.size ?? 10)}
          />
        </div>
      </div>
    </Suspense>
  );
}
