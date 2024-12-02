import { getMemberBetReport } from "@/api";
import DetailButton from "@/app/(dashboard)/reports/agent/baccarat/member/detail-button";
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
  MemberBetReportRequestParams,
  MemberBetReportRequestRecords,
} from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.agent");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-24 text-center">
          {t("leastlevelID")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("gameName")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("betNum")}</TableHead>
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

async function ListBody({ list }: { list: MemberBetReportRequestRecords[] }) {
  const translate = await getTranslations();
  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item: MemberBetReportRequestRecords) => (
          <TableRow key={item.agentId}>
            <TableCell className="w-24 text-center">{item.agentId}</TableCell>
            <TableCell className="w-24 text-center">{item.gameName}</TableCell>
            <TableCell className="w-24 text-center">{item.betNum}</TableCell>
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

export async function MemberList({
  searchParams,
}: { searchParams: Promise<MemberBetReportRequestParams> }) {
  const params = await searchParams;
  if (!(params?.startTime && params?.endTime)) {
    return (
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm relative">
          <Table>
            <ListHeader />
            <ListBody list={[]} />
          </Table>
        </div>
      </div>
    );
  }
  const { data } = await getMemberBetReport(params);

  return (
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <Table>
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={14} />}>
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
