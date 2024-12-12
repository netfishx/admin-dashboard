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
        <TableHead className="min-w-24 text-center">
          {t("ordernumber")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("issuenumber")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("memberID")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("roomeownerID")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("ministerID")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("leastlevelID")}
        </TableHead>
        <TableHead className="min-w-24 text-center">{t("gamename")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("smallType")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("odds")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("betamount")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("winamount")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("agentID")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("bettime")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("membersettlementtime")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("proxystatus")}
        </TableHead>
        <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({
  list,
  gameList,
}: { list: OrderReportsRecord[]; gameList: GameInfo[] }) {
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
            <TableCell className="w-24 text-center">{item.id}</TableCell>
            <TableCell className="w-24 text-center">
              {item.issueNumber}
            </TableCell>
            <TableCell className="w-24 text-center">{item.memberId}</TableCell>
            <TableCell className="w-24 text-center">
              {item.roomOwnerId}
            </TableCell>
            <TableCell className="w-24 text-center">{item.minister}</TableCell>
            <TableCell className="w-24 text-center">
              {item.lastAgentId}
            </TableCell>
            <TableCell className="w-24 text-center">
              {gameList.find((game) => game.gameId === item.gameId)?.gameName}
            </TableCell>
            <TableCell className="w-24 text-center">{item.betType}</TableCell>
            <TableCell className="w-24 text-center">
              {
                Object.entries(item.odds || {})[
                  Object.entries(item.odds || {}).length - 1
                ]
              }
            </TableCell>
            <TableCell className="w-24 text-center">
              {item?.betAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.winLossAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              <AgentId session={session as SessionData} />
            </TableCell>
            <TableCell className="text-center">
              <Time time={item.betTime} />
            </TableCell>
            <TableCell className="text-center">
              <Time time={item.settleTime} />
            </TableCell>
            <TableCell className="w-24 text-center">
              {typeMap[item.orderStatus]}
            </TableCell>
            <TableCell className="w-24 text-center sticky right-0 z-10 bg-background">
              <DetailButton item={item} />
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

export async function List({
  searchParams,
  gameList,
}: { searchParams: Promise<OrderReportsRequestParams>; gameList: GameInfo[] }) {
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
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm relative">
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
    <div className="p-2 bg-background flex-1">
      <div className="border rounded-sm relative">
        <Table>
          <ListHeader />
          <ListBody list={data?.list ?? []} gameList={gameList} />
        </Table>
      </div>
      <div className="pt-2">
        {/* biome-ignore lint/style/useExplicitLengthCheck: <explanation> */}
        {!!data?.list?.length && (
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={Number(params?.pageNum) || 1}
            pageSize={Number(params?.pageSize) || 10}
          />
        )}
      </div>
    </div>
  );
}
