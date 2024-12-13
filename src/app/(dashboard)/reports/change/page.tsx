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
import type { WalletLogRequestParams } from "@/lib/types";
import type { PageData } from "@/lib/types";
import type { WalletLogRecords } from "@/lib/types";
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
      <div className="flex flex-1 flex-col gap-2 bg-background">
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
        <TableHead className="w-24">{t("userId")}</TableHead>
        <TableHead className="w-24">{t("transactionId")}</TableHead>
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
      <Table className="rounded-sm border">
        <TableHeaderWrapper />
        <TableBodySkeleton />
      </Table>
    );
  }
  const params: WalletLogRequestParams = {
    userId: userId || null,
    transactionID: transactionID || null,
    operateCode: operateCode ? Number(operateCode) : null,
    userType: userType ? Number(userType) : 0,
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
    <div className="bg-background flex-1 w-full p-4">
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

  const operateTypeMap = {
    1: t("lotteryBet"),
    3: t("deposit"),
    4: t("withdrawal"),
    5: t("withdrawalCompleted"),
    6: t("withdrawalReturned"),
    7: t("createWallet"),
    8: t("issueRebate"),
    9: t("lotterySettlement"),
    10: t("guandanSettlement"),
    11: t("closeRoom"),
    12: t("roomRecharge"),
    13: t("receiveRebate"),
    15: t("borrow"),
    16: t("repayment"),
    17: t("createRoom"),
    18: t("increaseCredit"),
    19: t("decreaseCredit"),
    20: t("transfer"),
    21: t("writeOff"),
  };
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
              {operateTypeMap[item.operateType as keyof typeof operateTypeMap]}
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
