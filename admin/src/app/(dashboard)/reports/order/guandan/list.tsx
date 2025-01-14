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
import { formatNumber } from "@/lib/utils";
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
        <TableHead className="w-48">{t("issuenumber")}</TableHead>
        <TableHead className="w-60">{t("roomeownerID")}</TableHead>
        <TableHead className="w-60">{t("ministerID")}</TableHead>
        {hasSearchPermission && (
          <TableHead className="w-60">{t("agentID")}</TableHead>
        )}
        <TableHead className="w-20">{t("bottomBet")}</TableHead>
        <TableHead className="w-20">{t("topBet")}</TableHead>
        <TableHead className="w-20">{t("level")}</TableHead>
        <TableHead className="w-28">{t("settlementAmount")}</TableHead>
        <TableHead className="w-20">{t("bombNumber")}</TableHead>
        <TableHead className="w-28">{t("multiplier")}</TableHead>
        <TableHead className="w-140">{t("winPlayer")}</TableHead>
        <TableHead className="w-48">{t("gameStartTime")}</TableHead>
        <TableHead className="w-48">{t("settlementFinishTime")}</TableHead>

        <TableHead className="bg-muted sticky right-0 w-24 p-0 text-center">
          <div className="shadow-l flex h-full items-center justify-center px-4">
            {t("action")}
          </div>
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

  const winString = `赢: ${winners.map((player) => `${player.memberId}`).join(", ")}`;
  const loseString = `输: ${losers.map((player) => `${player.memberId}`).join(", ")}`;

  return (
    <div className="flex flex-col gap-2">
      <div>{winString}</div>
      <div>{loseString}</div>
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
            <TableCell>
              {formatNumber(Number(item.result?.[0]?.result || 0))}
            </TableCell>
            <TableCell>{item.bombCount}</TableCell>
            <TableCell>{item.multiplierCount}</TableCell>
            <TableCell>{generateResultString(item?.result)}</TableCell>
            <TableCell>
              <Time time={item.gameStartTime} />
            </TableCell>
            <TableCell>
              <Time time={item.gameEndTime} />
            </TableCell>
            <TableCell className="bg-background sticky right-0 p-0">
              <div className="shadow-l flex h-[65px] items-center justify-center px-4 py-2">
                <DetailButton item={item} />
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={15} className="h-48 text-center">
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
  if (!((params?.startTime && params?.endTime) || params?.issueNumber)) {
    return (
      <div className="bg-background flex-1 p-4">
        <div className="rounded-sm border">
          <Table className="table-fixed">
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
    <div className="bg-background flex-1 p-4">
      <div className="relative rounded-sm border">
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
