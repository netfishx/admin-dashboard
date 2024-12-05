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
  PokerReportRequestParams,
  PokerReportRequestRecords,
} from "@/lib/types";
import { getSession } from "@/session";
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
          <TableHead className="min-w-24 text-center">{t("agentID")}</TableHead>
        )}
        <TableHead className="min-w-24 text-center">{t("gameName")}</TableHead>
        <TableHead className="min-w-24 text-center">{t("roomType")}</TableHead>
        <TableHead className="min-w-24 text-center">
          {t("issueNumber")}
        </TableHead>
        <TableHead className="min-w-24 text-center">
          {t("settledAmount")}
        </TableHead>
        <TableHead className="w-24 text-center sticky right-0 z-10 bg-muted">
          {t("more")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: PokerReportRequestRecords[] }) {
  const translate = await getTranslations();
  const session = await getSession();
  const permissions = session?.permissions;
  const hasSearchPermission = permissions?.includes(
    "agent_report_guandan_search",
  );
  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item: PokerReportRequestRecords) => (
          <TableRow key={`${item.agentId}`}>
            {hasSearchPermission && (
              <TableCell className="w-24 text-center">{item.agentId}</TableCell>
            )}
            <TableCell className="w-24 text-center">{item.gameType}</TableCell>
            <TableCell className="w-24 text-center">{item.roomType}</TableCell>
            <TableCell className="w-24 text-center">
              {item.issueAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.settledAmount}
            </TableCell>
            <TableCell className="w-24 text-center sticky right-0 z-10 bg-background">
              <DetailButton />
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
}: { searchParams: Promise<PokerReportRequestParams> }) {
  const t = await getTranslations("report.agent");
  const params = await searchParams;
  if (!(params?.startTime && params?.endTime)) {
    return (
      <div className="p-2 bg-background flex-1">
        <div className="h-6" />
        <div className="border rounded-sm relative">
          <Table>
            <ListHeader />
            <ListBody list={[]} />
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
    <div className="p-2 bg-background flex-1">
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
      <div className="border rounded-sm relative">
        <Table>
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={14} />}>
            <ListBody list={data?.list || []} />
          </Suspense>
        </Table>
      </div>
      <div className="pt-2">
        <CustomPagination
          total={data?.total || 0}
          currentPage={data?.pageNum || 1}
          pageSize={data?.pageSize || 10}
        />
      </div>
    </div>
  );
}
