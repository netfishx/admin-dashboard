import { getRechargeReportList } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
import { Time } from "@/components/time";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  PageData,
  RechargeReport,
  RechargeReportParams,
} from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { hasPermission } from "@/session";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Actions } from "./actions";
import { Form } from "./form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { startTime, endTime } = await searchParams;
  const hasAdminPermission = await hasPermission("recharge_report_search");
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="bg-background flex flex-col gap-2 p-4">
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
      <div className="bg-background flex flex-1 flex-col gap-2 p-4">
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
  const t = await getTranslations("report.recharge");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-32">{t("orderNo")}</TableHead>
        <TableHead className="w-32">{t("userId")}</TableHead>
        <TableHead className="w-24">{t("currency")}</TableHead>
        <TableHead className="w-24">{t("rechargeMoney")}</TableHead>
        <TableHead className="w-32">{t("finishTime")}</TableHead>
        <TableHead className="w-48">{t("rechargeHash")}</TableHead>
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
    userId,
    orderNo,
    operatorSymbol,
    rechargeMoney,
    userType,
    startTime,
    endTime,
    pageNum,
    pageSize,
  } = await searchParams;

  if (!((startTime && endTime) || orderNo)) {
    return (
      <Table className="table-fixed rounded-sm border">
        <TableHeaderWrapper />
        <TableBodySkeleton />
      </Table>
    );
  }
  const params: RechargeReportParams = {
    userId: userId || null,
    orderNo: orderNo || null,
    operatorSymbol: operatorSymbol ? Number(operatorSymbol) : 3, // 默认大于
    rechargeMoney: rechargeMoney ? Number(rechargeMoney) : 0,
    userType: userType ? Number(userType) : 0, // 默认代理
    pageNum: Number(pageNum ?? 1),
    pageSize: Number(pageSize ?? 10),
    startTime: Number(startTime) || null,
    endTime: Number(endTime) || null,
  };

  const { data } = await getRechargeReportList(params);
  return (
    <div className="bg-background w-full flex-1 ">
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

async function TableBodyWrapper({ data }: { data?: PageData<RechargeReport> }) {
  const t = await getTranslations("");
  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data.list.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.orderNo}</TableCell>
            <TableCell>{item.userId}</TableCell>
            <TableCell>{item.currency}</TableCell>
            <TableCell>{formatNumber(Number(item.rechargeMoney))}</TableCell>
            <TableCell>
              <Time time={item.finishTime} />
            </TableCell>
            <TableCell>
              <Actions item={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="h-48 text-center">
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
          <TableCell colSpan={6}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
