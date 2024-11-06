import { getRatioReport } from "@/api";
import {} from "@/components/ui/scroll-area";
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
import { DetailButton } from "./detail-button";

export async function RatioList() {
  const t = await getTranslations("report.agent");
  const res: any = await getRatioReport({});

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
              {res?.data?.list?.map((item: any) => (
                <TableRow key={item.agentOrOwnerId}>
                  <TableCell className="w-24 text-center">
                    {item.agentOrOwnerId}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.gameName}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.shareAmount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.blockAmount}
                  </TableCell>
                  <TableCell className="w-24 text-center">
                    {item.deductAmount}
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
      </div>
    </Suspense>
  );
}
