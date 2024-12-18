import { getGuandanReportList } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import TableSkeleton from "@/components/table-skeleton";
import { Time } from "@/components/time";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  GameRecordRequestParams,
  GameRecordRequestRecords,
} from "@/lib/types";
import { getSession } from "@/session";
import { getTranslations } from "next-intl/server";
import DetailButton from "./detail-button";

export async function ListHeader() {
  const t = await getTranslations("report.orderlist");
  const session = await getSession();
  const permissions = session?.permissions;
  const hasSearchPermission = permissions?.includes("detail_guandan_search");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-60">{t("issuenumber")}</TableHead>
        <TableHead className="w-60">{t("roomeownerID")}</TableHead>
        <TableHead className="w-60">{t("ministerID")}</TableHead>
        {hasSearchPermission && (
          <TableHead className="w-60">{t("agentID")}</TableHead>
        )}
        <TableHead className="w-40">{t("bottomBet")}</TableHead>
        <TableHead className="w-40">{t("topBet")}</TableHead>
        <TableHead className="w-40">{t("level")}</TableHead>
        <TableHead className="w-40">{t("settlementAmount")}</TableHead>
        <TableHead className="w-24">{t("bombNumber")}</TableHead>
        <TableHead className="w-24">{t("multiplier")}</TableHead>
        <TableHead className="w-120">{t("winPlayer")}</TableHead>
        <TableHead className="w-[240px]">{t("gameStartTime")}</TableHead>
        <TableHead className="w-[240px]">{t("settlementFinishTime")}</TableHead>
        <TableHead className="w-24 sticky right-0 z-10 bg-muted text-center">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

function generateResultString(players: GameRecordRequestRecords["result"]) {
  const winners = players.filter(
    (player) => Number.parseInt(player.result) > 0,
  );
  const losers = players.filter((player) => Number.parseInt(player.result) < 0);

  const winString = `赢: ${winners.map((player) => `HY${player.memberId}`).join(", ")}`;
  const loseString = `输: ${losers.map((player) => `HY${player.memberId}`).join(", ")}`;

  return (
    <div className="flex flex-col gap-2">
      <div className="whitespace-nowrap text-gray-800">{winString}</div>
      <div className="whitespace-nowrap text-gray-800">{loseString}</div>
    </div>
  );
}

async function ListBody({ list }: { list: GameRecordRequestRecords[] }) {
  const translate = await getTranslations();
  const session = await getSession();
  const permissions = session?.permissions;
  const hasSearchPermission = permissions?.includes("detail_guandan_search");
  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item: GameRecordRequestRecords) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.roomOwnerId}</TableCell>
            <TableCell>{item.clubOwnerId}</TableCell>
            {hasSearchPermission && (
              <TableCell>{item.parentClubOwnerAgentId}</TableCell>
            )}
            <TableCell>{item.bet}</TableCell>
            <TableCell>{item.settleCap}</TableCell>
            <TableCell>{item.upgradeMode}</TableCell>
            <TableCell>{item.result?.[0]?.result}</TableCell>
            <TableCell>{item.bombCount}</TableCell>
            <TableCell>{item.multiplierCount}</TableCell>
            <TableCell>{generateResultString(item?.result)}</TableCell>
            <TableCell>
              <Time time={item.gameStartTime} />
            </TableCell>
            <TableCell>
              <Time time={item.gameEndTime} />
            </TableCell>
            <TableCell className="sticky right-0 z-10 bg-background text-center">
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

export async function List({
  searchParams,
}: {
  searchParams: Promise<GameRecordRequestParams>;
}) {
  const params = await searchParams;
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
  const p = {
    ...params,
    pageNum: Number(params?.pageNum) || 1,
    pageSize: Number(params?.pageSize) || 10,
    startTime: Number(params?.startTime) || 0,
    endTime: Number(params?.endTime) || 0,
  };
  const { data } = await getGuandanReportList(p);
  return (
    <div className="p-4 bg-background flex-1">
      <div className="border rounded-sm relative">
        <Table className="table-fixed">
          <ListHeader />
          <ListBody list={data?.list ?? []} />
        </Table>
      </div>
      <div className="pt-2">
        {data?.total && data?.total > 0 ? (
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
