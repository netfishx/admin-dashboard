import { postGetCreditLogList } from "@/api";
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
import { CREDIT_OPERATE_TYPE } from "@/lib/dict";
import type { CreditRecordRequestRecords } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { hasPermission } from "@/session";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function ListHeader() {
  const t = await getTranslations("report.credit");
  const hasAdminPermission = await hasPermission("credit_report_search");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-60">{t("orderNumber")}</TableHead>
        {hasAdminPermission && (
          <TableHead className="w-60">{t("agentID")}</TableHead>
        )}
        <TableHead className="w-60">{t("memberID")}</TableHead>
        <TableHead className="w-24">{t("amount")}</TableHead>
        <TableHead className="w-24">{t("type")}</TableHead>
        <TableHead className="w-[240px]">{t("applyTime")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function ListBody({ list }: { list: CreditRecordRequestRecords[] }) {
  const translate = await getTranslations();
  const t = await getTranslations("report.credit");
  const hasAdminPermission = await hasPermission("credit_report_search");

  return (
    <TableBody>
      {list?.length > 0 ? (
        list?.map((item) => (
          <TableRow key={item.transactionID}>
            <TableCell>{item.transactionID}</TableCell>
            {hasAdminPermission && <TableCell>{item.agentId}</TableCell>}
            <TableCell>{item.memberId}</TableCell>
            <TableCell>{formatNumber(Number(item.amount || 0))}</TableCell>
            <TableCell>
              {t(
                CREDIT_OPERATE_TYPE.find(
                  (type) => type.value === item.operateCode,
                )?.label,
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
  const params = await searchParams;
  if (!((params?.startTime && params?.endTime) || params?.transactionID)) {
    return (
      <div className="bg-background flex-1 p-4">
        <div className="relative rounded-sm border">
          <Table className="table-fixed">
            <ListHeader />
            <ListBody list={[]} />
          </Table>
        </div>
      </div>
    );
  }
  const p = {
    ...params,
    operateCode: Number(params?.operateCode || 0),
    pageNum: Number(params?.pageNum || 1),
    pageSize: Number(params?.pageSize || 10),
    startTime: Number(params?.startTime) || null,
    endTime: Number(params?.endTime) || null,
  };
  const { data } = await postGetCreditLogList(p);

  return (
    <div className="bg-background flex-1 p-4">
      <div className="relative rounded-sm border">
        <Table className="table-fixed">
          <ListHeader />
          <Suspense fallback={<TableSkeleton length={5} colSpan={6} />}>
            <ListBody list={data?.list ?? []} />
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
