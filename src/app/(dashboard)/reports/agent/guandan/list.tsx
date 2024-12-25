import { getPokerReport } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import TableSkeleton from "@/components/table-skeleton";
import { Label } from "@/components/ui/label";
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
  PokerReportRequestParams,
  PokerReportRequestRecords,
} from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { getSession } from "@/session";
import { nanoid } from "nanoid";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import DetailButton from "./detail-button";
export async function ListHeader() {
  const t = await getTranslations("report.agent");
  const session = await getSession();
  const permissions = session?.permissions;
  const hasSearchPermission = permissions?.includes(
    "agent_report_guandan_search",
  );
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        {hasSearchPermission && (
          <TableHead className="w-60">{t("agentID")}</TableHead>
        )}
        <TableHead className="w-60">{t("gameName")}</TableHead>
        <TableHead className="w-60">{t("roomType")}</TableHead>
        <TableHead className="w-60">{t("issueNumber")}</TableHead>
        <TableHead className="w-60">{t("settledAmount")}</TableHead>
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
  gameList = [],
}: {
  list: PokerReportRequestRecords[];
  gameList: GameInfo[];
}) {
  const translate = await getTranslations();
  const t = await getTranslations("report.agent");
  const session = await getSession();
  const permissions = session?.permissions;
  const hasSearchPermission = permissions?.includes(
    "agent_report_guandan_search",
  );

  const handleRoomType = (roomType: number) => {
    if (roomType === 1) {
      return t("gameHall");
    }
    if (roomType === 2) {
      return t("club");
    }
    return "";
  };

  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item: PokerReportRequestRecords) => (
          <TableRow key={nanoid()}>
            {hasSearchPermission && <TableCell>{item.agentId}</TableCell>}
            <TableCell>
              {gameList.find((i) => i.gameType === item.gameType)?.gameName}
            </TableCell>
            <TableCell>{handleRoomType(Number(item.roomType))}</TableCell>
            <TableCell>{item.issueAmount}</TableCell>
            <TableCell>
              {formatNumber(Number(item.settledAmount) || 0)}
            </TableCell>
            <TableCell className="sticky right-0 bg-background p-0">
              <div className="shadow-l py-2 px-4 flex justify-center items-center">
                <DetailButton agentId={item.agentId} />
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={hasSearchPermission ? 6 : 5}
            className="h-40 text-center"
          >
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
  searchParams: Promise<PokerReportRequestParams>;
  gameList: GameInfo[];
}) {
  const t = await getTranslations("report.agent");
  const params = await searchParams;
  if (!(params?.startTime && params?.endTime)) {
    return (
      <div className="flex-1 bg-background p-4">
        <div className="h-6" />
        <div className="relative rounded-sm border  mt-2">
          <Table className="table-fixed">
            <ListHeader />
            <TableSkeleton length={5} colSpan={6} />
          </Table>
        </div>
      </div>
    );
  }
  const p = {
    ...params,
    pageNum: Number(params?.pageNum || 1),
    pageSize: Number(params?.pageSize || 10),
    startTime: Number(params?.startTime || 0),
    endTime: Number(params?.endTime || 0),
  };
  const { data } = await getPokerReport(p);
  return (
    <div className="flex-1 bg-background p-4">
      <div className="h-6">
        {data?.list && data.list.length > 0 && (
          <>
            <Label className="min-w-24 text-center text-sm">
              {t("totalIssueAmount")}:
            </Label>
            <span className="min-w-24 text-center text-sm">
              {data?.list[0]?.totalIssueAmount} &nbsp;
            </span>
            <Label className="min-w-24 text-center text-sm">
              {t("totaSettledAmount")}:
            </Label>
            <span className="min-w-24 text-center text-sm">
              {data?.list[0]?.totaSettledAmount} &nbsp;
            </span>
          </>
        )}
      </div>
      <div className="border rounded-sm relative mt-2">
        <Table className="table-fixed">
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={6} />}>
            <ListBody list={data?.list || []} gameList={gameList} />
          </Suspense>
        </Table>
      </div>
      <div className="pt-2">
        {data?.total && data?.total > 0 ? (
          <CustomPagination
            total={data?.total || 0}
            currentPage={data?.pageNum || 1}
            pageSize={data?.pageSize || 10}
          />
        ) : null}
      </div>
    </div>
  );
}
