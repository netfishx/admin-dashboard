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
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Actions } from "./actions";
import { Form } from "./form";

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
  const t = await getTranslations("report.recharge");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-24 text-center">{t("orderNo")}</TableHead>
        <TableHead className="w-24 text-center">{t("userId")}</TableHead>
        <TableHead className="w-24  text-center">{t("currency")}</TableHead>
        <TableHead className="w-24  text-center">
          {t("rechargeMoney")}
        </TableHead>
        <TableHead className="w-32 text-center">{t("finishTime")}</TableHead>
        <TableHead className="w-24 text-center">{t("rechargeHash")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
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
      <Table className="border rounded-sm">
        <TableHeaderWrapper />
        <TableBodySkeleton />
      </Table>
    );
  }
  const params: RechargeReportParams = {
    userId: (userId ?? null) as string,
    orderNo: (orderNo ?? null) as string,
    operatorSymbol: operatorSymbol ? Number(operatorSymbol) : 3, // 默认大于
    rechargeMoney: rechargeMoney ? Number(rechargeMoney) : 0,
    userType: userType ? Number(userType) : undefined,
    pageNum: Number(pageNum ?? 1),
    pageSize: Number(pageSize ?? 10),
    startTime: Number(startTime),
    endTime: Number(endTime),
  };

  const { data } = await getRechargeReportList(params);
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

async function TableBodyWrapper({ data }: { data?: PageData<RechargeReport> }) {
  const t = await getTranslations("");
  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data.list.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="text-center">{item.orderNo}</TableCell>
            <TableCell className="text-center">{item.userId}</TableCell>
            <TableCell className="text-center">{item.currency}</TableCell>
            <TableCell className="text-center">{item.rechargeMoney}</TableCell>
            <TableCell className="text-center">
              <Time time={item.finishTime} />
            </TableCell>
            <TableCell className="text-center flex justify-center items-center h-full">
              <Actions item={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={7} className="text-center h-40">
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
          <TableCell colSpan={12}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
