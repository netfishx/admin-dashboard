import { getWithdrawApplyList } from "@/api";
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
import type { ApplyData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { translateValue } from "../tools";
import {
  approverStatusDict,
  moneyStatusDict,
  userTypeDict,
  withdrawModeDict,
} from "../tools";
import { Actions } from "./actions";
import { Form } from "./form";
import { MoneyBtn } from "./money-btn";

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
          </div>
        }
      >
        <Form />
      </Suspense>
      <div className="p-2 bg-background flex-1 flex flex-col gap-2">
        <Suspense
          fallback={
            <Table className="border rounded-sm">
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

async function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const { startTime, endTime, approverStatus, pageNum, pageSize } =
    await searchParams;
  console.info("startTime:", startTime, "endTime:", endTime);
  if (!startTime || !endTime) {
    return (
      <Table className="border rounded-sm">
        <TableHeaderWrapper />
        <TableBodySkeleton />
      </Table>
    );
  }

  const { data } = await getWithdrawApplyList({
    startTime: Number(startTime),
    endTime: Number(endTime),
    approverStatus: Number(approverStatus),
    pageNum: Number(pageNum ?? 1),
    pageSize: Number(pageSize ?? 10),
  });

  console.info("apply list:", data);
  return (
    <div className="bg-background flex-1 w-full ">
      <div className="relative overflow-y-auto overflow-x-auto border rounded-sm">
        <Table>
          <TableHeaderWrapper />
          <Suspense fallback={<TableBodySkeleton />}>
            <TableBodyWrapper list={data?.list ?? []} />
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
async function TableHeaderWrapper() {
  const t = await getTranslations("withdraw.apply");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-32 text-center">{t("orderNo")}</TableHead>
        <TableHead className="min-w-32 text-center">{t("userId")}</TableHead>
        <TableHead className="min-w-32 text-center">{t("userType")}</TableHead>
        <TableHead className="text-center">{t("username")}</TableHead>
        <TableHead className="text-center">{t("nickname")}</TableHead>
        <TableHead className="text-center">{t("parentAccount")}</TableHead>
        <TableHead className="min-w-32 text-center">
          {t("withdrawMoney")}
        </TableHead>
        <TableHead className="min-w-32 text-center">{t("applyTime")}</TableHead>
        <TableHead className="text-center">{t("approverName")}</TableHead>
        <TableHead className="min-w-32 text-center">
          {t("approverStatus")}
        </TableHead>
        <TableHead className="min-w-32 text-center">
          {t("withdrawMode")}
        </TableHead>
        <TableHead className="min-w-32 text-center">
          {t("moneyStatus")}
        </TableHead>
        <TableHead className="min-w-48 text-center sticky right-0 bg-muted">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
async function TableBodyWrapper({ list }: { list: ApplyData[] }) {
  const translations = await getTranslations();
  return (
    <TableBody>
      {list && list.length > 0 ? (
        list.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="min-w-32 text-center">
              {item.orderNo}
            </TableCell>
            <TableCell className="min-w-32 text-center">
              {item.userId}
            </TableCell>
            <TableCell className="min-w-32 text-center">
              {translateValue(item.userType, userTypeDict)}
            </TableCell>
            <TableCell className="text-center">{item.username}</TableCell>
            <TableCell className="text-center">{item.nickname}</TableCell>
            <TableCell className="text-center">{item.parentAccount}</TableCell>
            <TableCell className="min-w-32 text-center text-primary font-bold">
              <MoneyBtn data={item} />
            </TableCell>
            <TableCell className="min-w-32 text-center">
              {format(Number(item.applyTime), "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell className="text-center">{item.approverName}</TableCell>
            <TableCell className="min-w-32 text-center">
              <div
                className={cn(
                  "px-2 rounded-sm w-fit text-center inline-block",
                  item.approverStatus === 0 && "text-primary bg-primary/10",
                  item.approverStatus === 1 &&
                    "text-muted-foreground bg-muted-foreground/10",
                  item.approverStatus === 2 &&
                    "text-destructive bg-destructive/10",
                  item.approverStatus === 3 && "text-green bg-green/10",
                )}
              >
                {translateValue(item.approverStatus, approverStatusDict)}
              </div>
            </TableCell>
            <TableCell className="min-w-32 text-center">
              <div
                className={cn(
                  "px-2 rounded-sm w-fit text-center inline-block",
                  item.withdrawMode === 0 && "text-green bg-green/10",
                  item.withdrawMode === 1 && "text-orange bg-orange/10",
                )}
              >
                {translateValue(item.withdrawMode, withdrawModeDict)}
              </div>
            </TableCell>
            <TableCell className="min-w-32 text-center">
              <div
                className={cn(
                  "px-2 rounded-sm w-fit text-center inline-block",
                  item.moneyStatus === 0 && "text-primary bg-primary/10",
                  item.moneyStatus === 1 && "text-green bg-green/10",
                  item.moneyStatus === 2 &&
                    "text-destructive bg-destructive/10",
                )}
              >
                {translateValue(item.moneyStatus, moneyStatusDict)}
              </div>
            </TableCell>
            <TableCell className="min-w-48 text-center sticky right-0 bg-background">
              <Actions data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={12} className="text-center h-40">
            {translations("noData")}
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
