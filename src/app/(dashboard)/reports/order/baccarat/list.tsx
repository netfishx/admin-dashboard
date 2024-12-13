import { getOrderReportList } from "@/api";
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
  GameInfo,
  OrderReportsRecord,
  OrderReportsRequestParams,
} from "@/lib/types";
import { type SessionData, getSession } from "@/session";
import { getTranslations } from "next-intl/server";
import AgentId from "./agentId";
import DetailButton from "./detail-button";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.orderlist");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-40">{t("ordernumber")}</TableHead>
        <TableHead className="w-40">{t("issuenumber")}</TableHead>
        <TableHead className="w-60">{t("memberID")}</TableHead>
        <TableHead className="w-60">{t("roomeownerID")}</TableHead>
        <TableHead className="w-60">{t("ministerID")}</TableHead>
        <TableHead className="w-60">{t("leastlevelID")}</TableHead>
        <TableHead className="w-40">{t("gamename")}</TableHead>
        <TableHead className="w-40">{t("smallType")}</TableHead>
        <TableHead className="w-40">{t("odds")}</TableHead>
        <TableHead className="w-40">{t("betamount")}</TableHead>
        <TableHead className="w-40">{t("winamount")}</TableHead>
        <TableHead className="w-60">{t("agentID")}</TableHead>
        <TableHead className="w-[180px]">{t("bettime")}</TableHead>
        <TableHead className="w-[180px]">{t("membersettlementtime")}</TableHead>
        <TableHead className="w-40">{t("proxystatus")}</TableHead>
        <TableHead className="w-24 sticky right-0 z-10 bg-muted text-center">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({
  list,
  gameList,
}: {
  list: OrderReportsRecord[];
  gameList: GameInfo[];
}) {
  const translate = await getTranslations();
  const t = await getTranslations("report.orderlist");
  const session = await getSession();
  const typeMap = {
    "1": t("notSettled"),
    "2": t("settled"),
  };
  return (
    <TableBody>
      {list && list?.length > 0 ? (
        list?.map((item: OrderReportsRecord) => (
          <TableRow key={item.id}>
            <TableCell className="">{item.id}</TableCell>
            <TableCell>{item.issueNumber}</TableCell>
            <TableCell>{item.memberId}</TableCell>
            <TableCell>{item.roomOwnerId}</TableCell>
            <TableCell>{item.minister}</TableCell>
            <TableCell>{item.lastAgentId}</TableCell>
            <TableCell className="whitespace-nowrap">
              {gameList.find((game) => game.gameId === item.gameId)?.gameName}
            </TableCell>
            <TableCell>{item.betType}</TableCell>
            <TableCell>
              {
                Object.entries(item.odds || {})[
                  Object.entries(item.odds || {}).length - 1
                ]
              }
            </TableCell>
            <TableCell>{item?.betAmount}</TableCell>
            <TableCell>{item.winLossAmount}</TableCell>
            <TableCell>
              <AgentId session={session as SessionData} />
            </TableCell>
            <TableCell>
              <Time time={item.betTime} />
            </TableCell>
            <TableCell>
              <Time time={item.settleTime} />
            </TableCell>
            <TableCell>{typeMap[item.orderStatus]}</TableCell>
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
  gameList,
}: {
  searchParams: Promise<OrderReportsRequestParams>;
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
            <TableSkeleton length={5} colSpan={16} />
          </Table>
        </div>
      </div>
    );
  }
  const { data } = await getOrderReportList(p);

  return (
    <div className="p-4 bg-background flex-1">
      <div className="border rounded-sm relative">
        <Table className="table-fixed">
          <ListHeader />
          <ListBody list={data?.list ?? []} gameList={gameList} />
        </Table>
      </div>
      <div className="pt-2">
        {data?.total && data?.total > 0 ? (
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={Number(params?.pageNum) || 1}
            pageSize={Number(params?.pageSize) || 10}
          />
        ) : null}
      </div>
    </div>
  );
}
