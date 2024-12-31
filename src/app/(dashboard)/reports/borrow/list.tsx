import { postGetBorrowLogList } from "@/api";
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
import { OPERATE_TYPE } from "@/lib/dict";
import type { BorrowRecordRequestRecords } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { getSession, hasPermission } from "@/session";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function ListHeader() {
  const t = await getTranslations("report.borrow");
  const hasAdminPermission = await hasPermission("borrow_report_search");

  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-60">{t("orderNumber")}</TableHead>
        {hasAdminPermission && (
          <TableHead className="w-60">{t("agentID")}</TableHead>
        )}
        <TableHead className="w-60">{t("memberID")}</TableHead>
        <TableHead className="w-60">{t("amount")}</TableHead>
        <TableHead className="w-60">{t("type")}</TableHead>
        <TableHead className="w-[240px]">{t("applyTime")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: BorrowRecordRequestRecords[] }) {
  const translate = await getTranslations();
  const t = await getTranslations("report.borrow");
  const hasAdminPermission = await hasPermission("borrow_report_search");

  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.orderNo}</TableCell>
            {hasAdminPermission && <TableCell>{item.agentId}</TableCell>}
            <TableCell>{item.memberId}</TableCell>
            <TableCell>
              {formatNumber(Number(item.operateMoney || 0))}
            </TableCell>
            <TableCell>
              {t(
                OPERATE_TYPE.find((type) => type.value === item.orderType)
                  ?.label,
              )}
            </TableCell>
            <TableCell>
              <Time time={item.createTime} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={hasAdminPermission ? 6 : 5}
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
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await getSession();
  const hasAdminPermission = await hasPermission("borrow_report_search");
  const params = await searchParams;
  const p = {
    ...params,
    agentId: hasAdminPermission ? params?.agentId : session?.mainId,
    pageNum: Number(params?.pageNum) || 1,
    pageSize: Number(params?.pageSize) || 10,
    startTime: Number(params?.startTime) || null,
    endTime: Number(params?.endTime) || null,
  };
  if (!((params?.startTime && params?.endTime) || params?.orderNo)) {
    return (
      <div className="bg-background flex-1 p-4">
        <div className="relative rounded-sm border">
          <Table className="table-fixed">
            <ListHeader />
            <TableSkeleton length={5} colSpan={hasAdminPermission ? 6 : 5} />
          </Table>
        </div>
      </div>
    );
  }

  const { data } = await postGetBorrowLogList(p);

  return (
    <div className="bg-background flex-1 p-4">
      <div className="relative rounded-sm border">
        <Table className="table-fixed">
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={6} />}>
            <ListBody list={data?.list || []} />
          </Suspense>
        </Table>
      </div>
      {data?.total && data?.total > 0 ? (
        <div className="pt-2">
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={data?.pageNum ?? 1}
            pageSize={data?.pageSize ?? 10}
          />
        </div>
      ) : null}
    </div>
  );
}
