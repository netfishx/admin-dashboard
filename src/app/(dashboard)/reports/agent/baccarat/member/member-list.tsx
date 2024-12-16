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
  GameInfo,
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
        <TableHead className="w-60">{t("leastlevelID")}</TableHead>
        <TableHead className="w-40">{t("gameName")}</TableHead>
        <TableHead className="w-40">{t("betNum")}</TableHead>
        <TableHead className="w-40">{t("memberBetting")}</TableHead>
        <TableHead className="w-40">{t("memberProfitLoss")}</TableHead>
        <TableHead className="w-40">{t("shareAmount")}</TableHead>
        <TableHead className="w-40">{t("blockAmount")}</TableHead>
        <TableHead className="w-40">{t("throwAmount")}</TableHead>
        <TableHead className="w-40">{t("shareProfitLoss")}</TableHead>
        <TableHead className="w-40">{t("rebateIncome")}</TableHead>
        <TableHead className="w-40">{t("rebateExpense")}</TableHead>
        <TableHead className="w-40">{t("netRebate")}</TableHead>
        <TableHead className="w-40">{t("totalProfitLossAmount")}</TableHead>
        <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
          {t("more")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({
  list,
  gameList,
}: {
  list: MemberBetReportRequestRecords[];
  gameList: GameInfo[];
}) {
  const translate = await getTranslations();
  const t = await getTranslations("report.agent");
  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item: MemberBetReportRequestRecords) => (
          <TableRow key={item.agentId}>
            <TableCell>{item.agentId}</TableCell>
            <TableCell>
              {gameList.find((game) => game.gameId === item.gameId)?.gameName ||
                t("all")}
            </TableCell>
            <TableCell>{item.betNum}</TableCell>
            <TableCell>{item.memberBetAmount}</TableCell>
            <TableCell>{item.memberProfitLossAmount}</TableCell>
            <TableCell>{item.expectedShareAmount}</TableCell>
            <TableCell>{item.interceptAmount}</TableCell>
            <TableCell>{item.throwAmount}</TableCell>
            <TableCell>{item.actualShareWinLoss}</TableCell>
            <TableCell>{item.backIncome}</TableCell>
            <TableCell>{item.backOutcome}</TableCell>
            <TableCell>{item.pureBackAmount}</TableCell>
            <TableCell>{item.totalProfitLossAmount}</TableCell>
            <TableCell className="w-24 text-center sticky right-0 z-10 bg-background">
              <DetailButton id={item.agentId} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={15} className="h-40 text-center">
            {translate("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export async function MemberList({
  searchParams,
  gameList,
}: {
  searchParams: Promise<MemberBetReportRequestParams>;
  gameList: GameInfo[];
}) {
  const params = await searchParams;
  const p = {
    ...params,
    pageNum: Number(params?.pageNum) || 1,
    pageSize: Number(params?.pageSize) || 10,
    startTime: Number(params?.startTime) || 0,
    endTime: Number(params?.endTime) || 0,
  };

  if (!(params?.startTime && params?.endTime)) {
    return (
      <div className="p-4 bg-background flex-1">
        <div className="border rounded-sm">
          <Table>
            <ListHeader />
            <TableSkeleton length={5} colSpan={14} />
          </Table>
        </div>
      </div>
    );
  }

  const { data } = await getMemberBetReport(p);
  console.info(data, "data");

  return (
    <div className="p-4 bg-background flex-1">
      <div className="border rounded-sm">
        <Table className="table-fixed">
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={14} />}>
            <ListBody list={data?.list ?? []} gameList={gameList} />
          </Suspense>
        </Table>
      </div>
      <div className="pt-2">
        {!!data?.total && data?.total > 0 ? (
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={Number(data?.pageNum ?? 1)}
            pageSize={Number(data?.pageSize ?? 10)}
          />
        ) : null}
      </div>
    </div>
  );
}
