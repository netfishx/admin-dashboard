import { getWithdrawReportList } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { WithdrawReportParams } from "@/lib/types";
import { Suspense } from "react";
import { Actions } from "./actions";
import { Form } from "./form";

import { Time } from "@/components/time";
import { STATUS } from "@/lib/dict";
import type { WithdrawReport } from "@/lib/types";
import type { PageData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { hasPermission } from "@/session";
import { getTranslations } from "next-intl/server";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { startTime, endTime } = await searchParams;
  const hasAdminPermission = await hasPermission("withdraw_report_search");
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="flex flex-col gap-2 bg-background p-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <Form
          key={`${startTime}-${endTime}`}
          hasAdminPermission={hasAdminPermission}
        />
      </Suspense>
      <div className="flex flex-1 flex-col gap-2 bg-background p-4">
        <Suspense
          fallback={
            <Table className="table-fixed">
              <TableHeaderWrapper />
              <TableBodySkeleton />
            </Table>
          }
        >
          <TableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function TableHeaderWrapper() {
  const t = await getTranslations("report.withdraw");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-56">{t("orderNo")}</TableHead>
        <TableHead className="w-56">{t("userId")}</TableHead>
        <TableHead className="w-32">{t("currency")}</TableHead>
        <TableHead className="w-32">{t("withdrawMoney")}</TableHead>
        <TableHead className="w-32">{t("withdrawFee")}</TableHead>
        <TableHead className="w-32">{t("status")}</TableHead>
        <TableHead className="w-48">{t("applyTime")}</TableHead>
        <TableHead className="w-48">{t("approverTime")}</TableHead>
        <TableHead className="w-48">{t("finishTime")}</TableHead>
        <TableHead className="w-48">{t("withdrawHash")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
async function TableWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const {
    orderNo,
    operatorSymbol,
    withdrawMoney,
    requestStatus,
    startTime,
    endTime,
    pageNum,
    pageSize,
    userId,
    userType,
  } = await searchParams;

  const params: WithdrawReportParams = {
    orderNo: orderNo || null,
    operatorSymbol: operatorSymbol ? Number(operatorSymbol) : 3, // 默认大于
    withdrawMoney: withdrawMoney ? Number(withdrawMoney) : 0,
    requestStatus: requestStatus ? Number(requestStatus) : null,
    pageNum: Number(pageNum ?? 1),
    pageSize: Number(pageSize ?? 10),
    startTime: Number(startTime) || null,
    endTime: Number(endTime) || null,
    userId: userId || null,
    userType: userType ? Number(userType) : 0,
  };

  if (!((startTime && endTime) || orderNo)) {
    return (
      <Table className="table-fixed rounded-sm border">
        <TableHeaderWrapper />
        <TableBodySkeleton />
      </Table>
    );
  }

  const { data } = await getWithdrawReportList(params);
  return (
    <div className="w-full flex-1 bg-background">
      <div className="relative overflow-x-auto overflow-y-auto rounded-sm border">
        <Table className="table-fixed">
          <TableHeaderWrapper />
          <Suspense fallback={<TableBodySkeleton />}>
            <TableBodyWrapper data={data} />
          </Suspense>
        </Table>
      </div>
      {Number(data?.total) > 0 && (
        <div className="pt-2">
          <CustomPagination
            total={data?.total ?? 0}
            currentPage={Number(data?.pageNum ?? 1)}
            pageSize={Number(data?.pageSize ?? 10)}
          />
        </div>
      )}
    </div>
  );
}

async function TableBodyWrapper({ data }: { data?: PageData<WithdrawReport> }) {
  const t = await getTranslations("");
  const translate = await getTranslations("report.withdraw");

  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data.list.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.orderNo}</TableCell>
            <TableCell>{item.userId}</TableCell>
            <TableCell>{item.currency}</TableCell>
            <TableCell>{formatNumber(Number(item.withdrawMoney))}</TableCell>
            <TableCell>{formatNumber(Number(item.withdrawFee))}</TableCell>
            <TableCell>
              {(() => {
                const status = STATUS.find((s) => s.value === item.status);
                return status ? translate(status.label) : item.status;
              })()}
            </TableCell>
            <TableCell>
              <Time time={item.applyTime} />
            </TableCell>
            <TableCell>
              {!!item.approverTime && <Time time={item.approverTime} />}
            </TableCell>
            <TableCell>
              {!!item.finishTime && <Time time={item.finishTime} />}
            </TableCell>
            <TableCell>
              <Actions item={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={10} className="h-48 text-center">
            {t("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={10}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
