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
        <TableHead className="min-w-24 text-center">
          {t("issuenumber")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("roomeownerID")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("ministerID")}
        </TableHead>
        {hasSearchPermission && (
          <TableHead className="min-w-24 text-center">{t("agentID")}</TableHead>
        )}
        <TableHead className="min-w-24 text-center">{t("bottomBet")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("topBet")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("level")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("settlementAmount")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("bombNumber")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("multiplier")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("winPlayer")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("gameStartTime")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("settlementFinishTime")}
        </TableHead>
        <TableHead className="sticky right-0 z-10 w-24 bg-muted text-center">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

function generateResultString(players: GameRecordRequestRecords["result"]) {
  // 分组赢和输的玩家
  const winners = players.filter(
    (player) => Number.parseInt(player.result) > 0,
  );
  const losers = players.filter((player) => Number.parseInt(player.result) < 0);

  // 格式化输出字符串
  const winString = `赢: ${winners.map((player) => `HY${player.memberId}`).join(", ")}`;
  const loseString = `输: ${losers.map((player) => `HY${player.memberId}`).join(", ")}`;

  // 返回拼接后的结果
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
            <TableCell className="w-24 text-center">{item.id}</TableCell>
            <TableCell className="w-24 text-center">
              {item.roomOwnerId}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.clubOwnerId}
            </TableCell>
            {hasSearchPermission && (
              <TableCell className="w-24 text-center">
                {item.parentClubOwnerAgentId}
              </TableCell>
            )}
            <TableCell className="w-24 text-center">{item.bet}</TableCell>
            <TableCell className="w-24 text-center">{item.settleCap}</TableCell>
            <TableCell className="w-24 text-center">
              {item.upgradeMode}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.result?.[0]?.result}
            </TableCell>
            <TableCell className="w-24 text-center">{item.bombCount}</TableCell>
            <TableCell className="w-24 text-center">
              {item.multiplierCount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {generateResultString(item?.result)}
            </TableCell>
            <TableCell className="w-24 whitespace-nowrap text-center">
              <Time time={item.gameStartTime} />
            </TableCell>
            <TableCell className="w-24 whitespace-nowrap text-center">
              <Time time={item.gameEndTime} />
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

export async function List({
  searchParams,
}: {
  searchParams: Promise<GameRecordRequestParams>;
}) {
  const params = await searchParams;
  if (!(params?.startTime && params?.endTime)) {
    return (
      <div className="flex-1 bg-background p-2">
        <div className="relative rounded-sm border">
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
    <div className="flex-1 bg-background p-2">
      <div className="relative rounded-sm border">
        <Table>
          <ListHeader />
          <ListBody list={data?.list ?? []} />
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
