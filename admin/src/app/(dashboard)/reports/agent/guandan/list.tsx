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
import { ROOM_TYPE } from "@/lib/dict";
import type { GameInfo, PokerReportRequestRecords } from "@/lib/types";
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
        <TableHead className="w-40">{t("gameName")}</TableHead>
        <TableHead className="w-40">{t("roomType")}</TableHead>
        <TableHead className="w-20">{t("issueNumber")}</TableHead>
        <TableHead className="w-32">{t("settledAmount")}</TableHead>
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

  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item: PokerReportRequestRecords) => (
          <TableRow key={nanoid()}>
            {hasSearchPermission && <TableCell>{item.agentId}</TableCell>}
            <TableCell>
              {gameList.find((i) => i.gameType === item.gameType)?.gameName}
            </TableCell>
            <TableCell>
              {t(ROOM_TYPE.find((type) => type.value === item.roomType)?.label)}
            </TableCell>
            <TableCell>{item.issueAmount}</TableCell>
            <TableCell>
              {formatNumber(Number(item.settledAmount) || 0)}
            </TableCell>
            <TableCell className="bg-background sticky right-0 p-0">
              <div className="shadow-l flex items-center justify-center px-4 py-2">
                <DetailButton agentId={item.agentId} />
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={hasSearchPermission ? 6 : 5}
            className="h-48 text-center"
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
  searchParams: Promise<{ [key: string]: string | undefined }>;
  gameList: GameInfo[];
}) {
  const t = await getTranslations("report.agent");
  const params = await searchParams;
  if (!(params?.startTime && params?.endTime)) {
    return (
      <div className="bg-background flex-1 p-4">
        <div className="h-6" />
        <div className="relative mt-2 rounded-sm  border">
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
    roomType: Number(params?.roomType) || null,
    pageNum: Number(params?.pageNum || 1),
    pageSize: Number(params?.pageSize || 10),
    startTime: Number(params?.startTime || 0),
    endTime: Number(params?.endTime || 0),
  };
  const { data } = await getPokerReport(p);
  return (
    <div className="bg-background flex-1 p-4">
      <div className="flex h-6 gap-4">
        {data?.list && data.list.length > 0 && (
          <>
            <div>
              <Label className="min-w-24 text-center text-sm opacity-70 ">
                {t("totalIssueAmount")}
              </Label>
              <span className="min-w-24 text-center text-sm">
                {formatNumber(Number(data?.list[0]?.totalIssueAmount) || 0)}
              </span>
            </div>
            <div>
              <Label className="min-w-24 text-center text-sm opacity-70">
                {t("totaSettledAmount")}
              </Label>
              <span className="min-w-24 text-center text-sm">
                {formatNumber(Number(data?.list[0]?.totalSettledAmount) || 0)}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="relative mt-2 rounded-sm border">
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
