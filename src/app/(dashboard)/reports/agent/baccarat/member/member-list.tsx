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
import { formatNumber } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.agent");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-60">{t("leastlevelID")}</TableHead>
        <TableHead className="w-60">{t("gameName")}</TableHead>
        <TableHead className="w-24">{t("betNum")}</TableHead>
        <TableHead className="w-32">{t("memberBetting")}</TableHead>
        <TableHead className="w-32">{t("memberProfitLoss")}</TableHead>
        <TableHead className="w-32">{t("shareAmount")}</TableHead>
        <TableHead className="w-32">{t("blockAmount")}</TableHead>
        <TableHead className="w-32">{t("throwAmount")}</TableHead>
        <TableHead className="w-32">{t("shareProfitLoss")}</TableHead>
        <TableHead className="w-32">{t("rebateIncome")}</TableHead>
        <TableHead className="w-32">{t("rebateExpense")}</TableHead>
        <TableHead className="w-32">{t("netRebate")}</TableHead>
        <TableHead className="w-32">{t("totalProfitLossAmount")}</TableHead>
        <TableHead className="w-24 sticky right-0 bg-muted p-0">
          <div className="shadow-l h-full px-4 flex justify-center items-center">
            {t("action")}
          </div>
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
            <TableCell>
              {formatNumber(Number(item.memberBetAmount || 0))}
            </TableCell>
            <TableCell>
              {formatNumber(Number(item.memberProfitLossAmount || 0))}
            </TableCell>
            <TableCell>
              {formatNumber(Number(item.expectedShareAmount || 0))}
            </TableCell>
            <TableCell>
              {formatNumber(Number(item.interceptAmount || 0))}
            </TableCell>
            <TableCell>{formatNumber(Number(item.throwAmount || 0))}</TableCell>
            <TableCell>
              {formatNumber(Number(item.actualShareWinLoss || 0))}
            </TableCell>
            <TableCell>{formatNumber(Number(item.backIncome || 0))}</TableCell>
            <TableCell>{formatNumber(Number(item.backOutcome || 0))}</TableCell>
            <TableCell>
              {formatNumber(Number(item.pureBackAmount || 0))}
            </TableCell>
            <TableCell>
              {formatNumber(Number(item.totalProfitLossAmount || 0))}
            </TableCell>
            <TableCell className="sticky right-0 bg-background p-0">
              <div className="shadow-l py-2 px-4 flex justify-center items-center">
                <DetailButton item={item} />
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={14} className="h-40 text-center">
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
          <Table className="table-fixed">
            <ListHeader />
            <TableSkeleton length={5} colSpan={14} />
          </Table>
        </div>
      </div>
    );
  }

  const { data } = await getMemberBetReport(p);

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
