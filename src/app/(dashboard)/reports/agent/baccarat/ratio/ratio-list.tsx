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
  GameInfo,
  RatioReportRequestParams,
  RatioReportRequestRecords,
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
        <TableHead className="sticky right-0 z-10 w-24 bg-muted text-center">
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
  list: RatioReportRequestRecords[];
  gameList: GameInfo[];
}) {
  const translate = await getTranslations();
  const t = await getTranslations("report.agent");
  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item: RatioReportRequestRecords) => (
          <TableRow key={`${item.userId}`}>
            <TableCell className="w-24 text-center">{item.userId}</TableCell>
            <TableCell className="w-24 text-center">
              {gameList.find((game) => game.gameId === item.gameId)?.gameName ||
                t("all")}
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
            <TableCell className="sticky right-0 z-10 w-24 bg-background text-center">
              <DetailButton item={item} />
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

export async function RatioList({
  gameList,
  searchParams,
}: {
  gameList: GameInfo[];
  searchParams: Promise<RatioReportRequestParams>;
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
      <div className="flex-1 bg-background p-2">
        <div className="relative rounded-sm border">
          <Table>
            <ListHeader />
            <ListBody list={[]} gameList={gameList} />
          </Table>
        </div>
      </div>
    );
  }
  const { data } = await getRatioReport(p);

  return (
    <div className="flex-1 bg-background p-2">
      <div className="relative rounded-sm border">
        <Table>
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={11} />}>
            <ListBody list={data?.list || []} gameList={gameList} />
          </Suspense>
        </Table>
      </div>
      <div className="pt-2">
        {!!data?.total && (
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={p.pageNum}
            pageSize={p.pageSize}
          />
        )}
      </div>
    </div>
  );
}
