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
import type { WithdrawReport } from "@/lib/types";
import type { PageData } from "@/lib/types";
import { getTranslations } from "next-intl/server";

export default async function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const { startTime, endTime } = await searchParams;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="bg-background p-2 flex flex-col gap-2">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <Form key={`${startTime}-${endTime}`} />
      </Suspense>
      <div className="p-2 bg-background flex-1 flex flex-col gap-2">
        <Suspense
          fallback={
            <Table>
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
        <TableHead className="w-24 min-w-24 text-center">
          {t("orderNo")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("userId")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("currency")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("withdrawMoney")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("withdrawFee")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("status")}
        </TableHead>
        <TableHead className="w-32 min-w-32 text-center">
          {t("applyTime")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("approverTime")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("finishTime")}
        </TableHead>
        <TableHead className="w-24 text-center">{t("withdrawHash")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
async function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
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
    orderNo: (orderNo ?? null) as string,
    operatorSymbol: operatorSymbol ? Number(operatorSymbol) : 3, // 默认大于
    withdrawMoney: withdrawMoney ? Number(withdrawMoney) : 0,
    requestStatus: requestStatus ? Number(requestStatus) : null,
    pageNum: Number(pageNum ?? 1),
    pageSize: Number(pageSize ?? 10),
    startTime: Number(startTime),
    endTime: Number(endTime),
    userId: (userId ?? null) as string,
    userType: userType ? Number(userType) : null,
  };

  if (!((startTime && endTime) || orderNo)) {
    return (
      <Table className="border rounded-sm">
        <TableHeaderWrapper />
        <TableBodySkeleton />
      </Table>
    );
  }

  const { data } = await getWithdrawReportList(params);
  return (
    <div className="bg-background flex-1 w-full ">
      <div className="relative overflow-y-auto overflow-x-auto border rounded-sm">
        <Table>
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
  const statusMap = {
    0: "审核中",
    1: "提现中",
    2: "审核拒绝",
    3: "提现成功",
  };
  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data.list.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="w-24 min-w-24 text-center">
              {item.orderNo}
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {item.userId}
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {item.currency}
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {item.withdrawMoney}
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {item.withdrawFee}
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {statusMap[item.status as keyof typeof statusMap]}
            </TableCell>
            <TableCell className="w-32 min-w-32 text-center">
              <Time time={item.applyTime} />
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {!!item.approverTime && <Time time={item.approverTime} />}
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {!!item.finishTime && <Time time={item.finishTime} />}
            </TableCell>
            <TableCell className="min-w-24 text-center">
              <Actions item={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={10} className="text-center h-40">
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
