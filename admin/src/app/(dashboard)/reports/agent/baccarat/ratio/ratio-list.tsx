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
import type { GameInfo, RatioReportRequestRecords } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.agent");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-60">{t("agentOrOwnerId")}</TableHead>
        <TableHead className="w-60">{t("parentAgentId")}</TableHead>
        <TableHead className="w-60">{t("gameName")}</TableHead>
        <TableHead className="w-36">{t("shareAmount")}</TableHead>
        <TableHead className="w-36">{t("blockAmount")}</TableHead>
        <TableHead className="w-36">{t("throwAmount")}</TableHead>
        <TableHead className="w-36">{t("actualShareAmount")}</TableHead>
        <TableHead className="w-36">{t("actualShareWinLoss")}</TableHead>
        <TableHead className="w-36">{t("rebateIncome")}</TableHead>
        <TableHead className="w-36">{t("rebateExpense")}</TableHead>
        <TableHead className="w-36">{t("netRebate")}</TableHead>
        <TableHead className="w-36">{t("totalProfitLossAmount")}</TableHead>
        <TableHead className="bg-muted sticky right-0 w-24 p-0">
          <div className="shadow-l flex h-full items-center justify-center px-4">
            {t("more")}
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({
  list,
  gameList,
  searchParams,
}: {
  list: RatioReportRequestRecords[];
  gameList: GameInfo[];
  searchParams: { [key: string]: string | undefined };
}) {
  const translate = await getTranslations();
  const t = await getTranslations("report.agent");
  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item) => (
          <TableRow key={item.userId}>
            <TableCell>{item.userId}</TableCell>
            <TableCell>{item.parentAgentId}</TableCell>
            <TableCell>
              {gameList.find((game) => game.gameId === item.gameId)?.gameName ||
                t("all")}
            </TableCell>
            <TableCell>
              {formatNumber(Number(item.expectedShareAmount || 0))}
            </TableCell>
            <TableCell>
              {formatNumber(Number(item.interceptAmount || 0))}
            </TableCell>
            <TableCell>{formatNumber(Number(item.throwAmount || 0))}</TableCell>
            <TableCell>
              {formatNumber(Number(item.actualShareAmount || 0))}
            </TableCell>
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
            <TableCell className="bg-background sticky right-0 p-0">
              <div className="shadow-l flex items-center justify-center px-4 py-2">
                <DetailButton item={item} searchParams={searchParams} />
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={13} className="h-48 text-center">
            {translate("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export async function RatioList({
  gameList,
  searchParams,
}: {
  gameList: GameInfo[];
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const p = {
    ...params,
    pageNum: Number(params.pageNum) || 1,
    pageSize: Number(params.pageSize) || 10,
    startTime: Number(params.startTime) || 0,
    endTime: Number(params.endTime) || 0,
  };
  if (!(params?.startTime && params?.endTime)) {
    return (
      <div className="bg-background flex-1 p-4">
        <div className="rounded-sm border">
          <Table className="table-fixed">
            <ListHeader />
            <TableSkeleton length={5} colSpan={11} />
          </Table>
        </div>
      </div>
    );
  }
  const { data } = await getRatioReport(p);
  return (
    <div className="bg-background flex-1 p-4">
      <div className="rounded-sm border">
        <Table className="table-fixed">
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={11} />}>
            <ListBody
              list={data?.list || []}
              gameList={gameList}
              searchParams={params}
            />
          </Suspense>
        </Table>
      </div>
      <div className="pt-2">
        {!!data?.total && data?.total > 0 ? (
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={p.pageNum}
            pageSize={p.pageSize}
          />
        ) : null}
      </div>
    </div>
  );
}
