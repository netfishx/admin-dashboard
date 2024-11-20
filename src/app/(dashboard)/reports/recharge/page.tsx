import { getRechargeReportList } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import type { RechargeReportParams } from "@/lib/types";
import { endOfDay, startOfDay } from "date-fns";
import { Suspense } from "react";
import { Form } from "./form";
import { RechargeTable } from "./table";

export default async function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const {
    userId,
    orderNo,
    operatorSymbol,
    rechargeMoney,
    withdrawUserType,
    startTime,
    endTime,
    pageNum,
    pageSize,
  } = await searchParams;
  const now = Date.now();
  const start = startTime ?? startOfDay(now).getTime();
  const end = endTime ?? endOfDay(now).getTime();
  const params: RechargeReportParams = {
    userId: (userId ?? null) as string,
    orderNo: orderNo ?? null,
    operatorSymbol:
      operatorSymbol !== undefined ? Number(operatorSymbol) : null,
    rechargeMoney: rechargeMoney !== undefined ? Number(rechargeMoney) : null,
    withdrawUserType:
      withdrawUserType !== undefined ? Number(withdrawUserType) : null,
    pageNum: Number(pageNum ?? 1),
    pageSize: Number(pageSize ?? 10),
    startTime: Number(start),
    endTime: Number(end),
  };
  // 验证参数是否有效 至少一个参数是有值的
  const validateParams = (params: RechargeReportParams) => {
    const { endTime, startTime, pageNum, pageSize, ...otherFields } = params;
    const isOtherFieldsValid = Object.values(otherFields).some(
      (value) => value !== null && value !== undefined && value !== "",
    );
    return isOtherFieldsValid;
  };
  if (!validateParams(params)) {
    console.info("请至少选择一个查询条件");
  }
  const { data } = await getRechargeReportList(params);
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background py-2 px-4">
            <Skeleton className="w-full h-9 opacity-20" />
            <Skeleton className="w-full h-9 opacity-20" />
          </div>
        }
      >
        <Form />
      </Suspense>
      <div className="p-2 bg-background flex-1 flex flex-col gap-2">
        <Suspense
          fallback={
            <div className="flex flex-col gap-4 p-4">
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-2/3 h-6" />
            </div>
          }
        >
          <RechargeTable data={data} />
        </Suspense>
      </div>
    </div>
  );
}
