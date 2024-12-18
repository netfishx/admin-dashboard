import { getWalletLog } from "@/api";
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
import { CHANGE_TYPE } from "@/lib/dict";
import type { WalletLogRecords } from "@/lib/types";
import type { PageData } from "@/lib/types";
import type { WalletLogRequestParams } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Form } from "./form";

export default async function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { startTime, endTime } = await searchParams;
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
        <Form key={`${startTime}-${endTime}`} />
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
        <TableHead className="w-32">{t("userId")}</TableHead>
        <TableHead className="w-32">{t("transactionId")}</TableHead>
        <TableHead className="w-32">{t("createdTime")}</TableHead>
        <TableHead className="w-24">{t("oldBalance")}</TableHead>
        <TableHead className="w-24">{t("transactionAmount")}</TableHead>
        <TableHead className="w-24">{t("newBalance")}</TableHead>
        <TableHead className="w-24">{t("operateType")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
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

  if (!((startTime && endTime) || transactionID)) {
    return (
      <Table className="rounded-sm border table-fixed">
        <TableHeaderWrapper />
        <TableBodySkeleton />
      </Table>
    );
  }
  const params: WalletLogRequestParams = {
    userId: userId || null,
    transactionID: transactionID || null,
    operateCode: operateCode ? Number(operateCode) : null,
    userType: userType ? Number(userType) : 0, // 0 代理 2 会员 默认代理
    pageNum: Number(pageNum ?? 1),
    pageSize: Number(pageSize ?? 10),
    startTime: Number(startTime),
    endTime: Number(endTime),
    // temp 临时参数
    // startTime: 1732165114683,
    // endTime: 1733290152826,
  };

  const { data } = await getWalletLog(params);
  return (
    <div className="bg-background flex-1 w-full">
      <div className="relative overflow-y-auto overflow-x-auto border rounded-sm">
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
async function TableBodyWrapper({
  data,
}: {
  data?: PageData<WalletLogRecords>;
}) {
  const translations = await getTranslations("");
  const t = await getTranslations("report.change");

  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data.list.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.userId}</TableCell>
            <TableCell>{item.transactionId}</TableCell>
            <TableCell>
              <Time time={item.createdTime} />
            </TableCell>
            <TableCell>{item.oldBalance}</TableCell>
            <TableCell>{item.transactionAmount}</TableCell>
            <TableCell>{item.newBalance}</TableCell>
            <TableCell>
              {(() => {
                const status = CHANGE_TYPE.find(
                  (s) => s.value === item.operateType,
                );
                return status ? t(status.label) : item.operateType;
              })()}
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={7} className="h-40 text-center">
            {translations("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
