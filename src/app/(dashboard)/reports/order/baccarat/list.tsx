import { getDictListCache, getOrderReportList } from "@/api";
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
import { SETTLE_RESULT, TRANSFER_TYPE } from "@/lib/dict";
import type { GameInfo, OrderReportsRecord } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";
import { getSession } from "@/session";
import { getTranslations } from "next-intl/server";
import DetailButton from "./detail-button";

export async function ListHeader() {
  "use cache";
  const t = await getTranslations("report.orderlist");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-60">{t("ordernumber")}</TableHead>
        <TableHead className="w-60">{t("issuenumber")}</TableHead>
        <TableHead className="w-60">{t("memberID")}</TableHead>
        <TableHead className="w-60">{t("roomeownerID")}</TableHead>
        <TableHead className="w-60">{t("ministerID")}</TableHead>
        <TableHead className="w-60">{t("leastlevelID")}</TableHead>
        <TableHead className="w-60">{t("agentID")}</TableHead>
        <TableHead className="w-40">{t("gamename")}</TableHead>
        <TableHead className="w-24">{t("smallType")}</TableHead>
        <TableHead className="w-20">{t("odds")}</TableHead>
        <TableHead className="w-20">{t("settleResult")}</TableHead>
        <TableHead className="w-24">{t("betamount")}</TableHead>
        <TableHead className="w-24">{t("winamount")}</TableHead>
        <TableHead className="w-48">{t("bettime")}</TableHead>
        <TableHead className="w-48">{t("membersettlementtime")}</TableHead>
        <TableHead className="w-24">{t("proxystatus")}</TableHead>
        <TableHead className="bg-muted sticky right-0 w-24 p-0">
          <div className="shadow-l flex h-full items-center justify-center px-4">
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
  dict,
}: {
  list: OrderReportsRecord[];
  gameList: GameInfo[];
  dict: { label: string; value: string }[] | undefined;
}) {
  const translate = await getTranslations();
  const t = await getTranslations("report.orderlist");

  const getOdds = (item: OrderReportsRecord) => {
    let odds = 0;
    if (item.orderStatus === 1) {
      odds = Number(Object.values(item.odds || {})[0]);
    } else {
      odds = Number(item.finalOdds);
    }
    if (!odds) {
      return "-";
    }

    return formatNumber(odds, { maximumFractionDigits: 3 });
  };

  const getBetLabel = (value: number) => {
    return dict?.find((item) => Number(item.label) === value)?.value;
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
            <TableCell>{item.agentId}</TableCell>
            <TableCell className="whitespace-nowrap">
              {gameList.find((game) => game.gameId === item.gameId)?.gameName}
            </TableCell>
            <TableCell>{getBetLabel(item.betType)}</TableCell>
            <TableCell>{getOdds(item)}</TableCell>
            <TableCell
              className={cn(
                item.settleResult === 0 && "text-primary",
                item.settleResult === 1 && "text-green",
                item.settleResult === 2 && "text-destructive",
              )}
            >
              {item.settleResult
                ? t(
                    SETTLE_RESULT.find(
                      (type: { value: number }) =>
                        type.value === item.settleResult,
                    )?.label,
                  )
                : "-"}
            </TableCell>
            <TableCell>{formatNumber(Number(item?.betAmount || 0))}</TableCell>
            <TableCell>
              {formatNumber(Number(item.winLossAmount || 0))}
            </TableCell>
            <TableCell>
              <Time time={item.betTime} />
            </TableCell>
            <TableCell>
              <Time time={item.settleTime} />
            </TableCell>
            <TableCell>
              {t(
                TRANSFER_TYPE.find((type) => type.value === item.orderStatus)
                  ?.label,
              )}
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
  searchParams: Promise<{ [key: string]: string | undefined }>;
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

  if (!((params?.startTime && params?.endTime) || params?.id)) {
    return (
      <div className="bg-background flex-1 p-4">
        <div className="rounded-sm border">
          <Table className="table-fixed">
            <ListHeader />
            <TableSkeleton length={5} colSpan={16} />
          </Table>
        </div>
      </div>
    );
  }
  const { data } = await getOrderReportList(p);
  const { data: dict } = await getDictListCache({
    dictCode: "baccarat_bet_label",
  });
  const session = await getSession();
  const list =
    data?.list.map((item) => ({
      ...item,
      agentId: params?.agentId || session?.mainId,
    })) ?? [];

  return (
    <div className="bg-background flex-1 p-4">
      <div className="relative rounded-sm border">
        <Table className="table-fixed">
          <ListHeader />
          <ListBody list={list} gameList={gameList} dict={dict} />
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
