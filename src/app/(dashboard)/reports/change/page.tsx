import { getWalletLog } from "@/api";
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
import type { WalletLogRequestParams } from "@/lib/types";
import type { PageData } from "@/lib/types";
import type { WalletLogRecords } from "@/lib/types";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Form } from "./form";

export default async function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="bg-background py-2">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <Form />
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

function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={7}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

async function TableHeaderWrapper() {
  const t = await getTranslations("report.change");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-24 min-w-24 text-center">
          {t("userId")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("transactionId")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("createdTime")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("oldBalance")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("transactionAmount")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("newBalance")}
        </TableHead>
        <TableHead className="w-24 min-w-24 text-center">
          {t("operateType")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const {
    userId,
    transactionID,
    userType,
    operateCode,
    startTime,
    endTime,
    pageNum,
    pageSize,
  } = await searchParams;
  if (!(startTime && endTime)) {
    return (
      <Table className="border rounded-sm">
        <TableHeaderWrapper />
        <TableBodySkeleton />
      </Table>
    );
  }
  const params: WalletLogRequestParams = {
    userId: (userId ?? null) as string,
    transactionID: (transactionID ?? null) as string,
    operateCode: Number(operateCode ?? 0),
    userType: Number(userType ?? 1),
    pageNum: Number(pageNum ?? 1),
    pageSize: Number(pageSize ?? 10),
    startTime: Number(startTime),
    endTime: Number(endTime),
  };
  // 验证参数是否有效 至少一个参数是有值的
  const validateParams = (params: WalletLogRequestParams) => {
    const { endTime, startTime, pageNum, pageSize, ...otherFields } = params;
    const isOtherFieldsValid = Object.values(otherFields).some(
      (value) => value !== null && value !== undefined && value !== "",
    );
    return isOtherFieldsValid;
  };
  if (!validateParams(params)) {
    console.info("请至少选择一个查询条件");
  }
  const { data } = await getWalletLog(params);
  console.info("🌸 ~ data:", data);
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
async function TableBodyWrapper({
  data,
}: { data?: PageData<WalletLogRecords> }) {
  const t = await getTranslations("");
  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data.list.map((item) => (
          <TableRow key={item.transactionId}>
            <TableCell className="w-24 min-w-24 text-center">
              {item.userId}
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {item.transactionId}
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {format(item.createdTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {item.oldBalance}
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {item.transactionAmount}
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {item.newBalance}
            </TableCell>
            <TableCell className="w-24 min-w-24 text-center">
              {item.operateType}
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
