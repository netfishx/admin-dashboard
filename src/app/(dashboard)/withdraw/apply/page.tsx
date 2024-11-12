import { getWithdrawApplyList } from "@/api";
import Pages from "@/components/custom-pagination";
import ListScrollArea from "@/components/list-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
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

export default async function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="bg-background py-2">
            <Skeleton className="h-9 w-full opacity-25" />
          </div>
        }
      >
        <Form />
        <TableWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const t = await getTranslations("withdraw.apply");

  const search = await searchParams;
  const { data } = await getWithdrawApplyList({
    startTime: search.startTime as string,
    endTime: search.endTime as string,
    approverStatus: search.approverStatus as string,
    pageNum: Number(search.pageNum ?? 1),
    pageSize: Number(search.pageSize ?? 10),
  });

  console.info("agent list:", data);
  return (
    <div className="p-2 bg-background flex-1 w-full ">
      <div className="relative overflow-y-auto overflow-x-auto border rounded-sm">
        <ListScrollArea>
          <Suspense fallback={<div>loading...</div>}>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="min-w-32 text-center">
                    {t("orderNo")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("userId")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("userType")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("username")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("nickname")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("parentAccount")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("withdrawMoney")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("applyTime")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("approverName")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("approverStatus")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("withdrawMode")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("moneyStatus")}
                  </TableHead>
                  <TableHead className="min-w-48 text-center sticky right-0 bg-muted z-20 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.2)]">
                    {t("action")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.list?.map((item) => (
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
                    <TableCell className="min-w-32 text-center">
                      {item.username}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.nickname}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.parentAccount}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.withdrawMoney}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.applyTime}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.approverName}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      <div
                        className={cn(
                          "px-2 rounded-sm w-fit text-center inline-block",
                          item.approverStatus === 0 &&
                            "text-primary bg-primary/10",
                          item.approverStatus === 1 &&
                            "text-muted-foreground bg-muted-foreground/10",
                          item.approverStatus === 2 &&
                            "text-destructive bg-destructive/10",
                          item.approverStatus === 3 && "text-green bg-green/10",
                        )}
                      >
                        {translateValue(
                          item.approverStatus,
                          approverStatusDict,
                        )}
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
                          item.moneyStatus === 0 &&
                            "text-primary bg-primary/10",
                          item.moneyStatus === 1 && "text-green bg-green/10",
                          item.moneyStatus === 2 &&
                            "text-destructive bg-destructive/10",
                        )}
                      >
                        {translateValue(item.moneyStatus, moneyStatusDict)}
                      </div>
                    </TableCell>
                    <TableCell className="min-w-48 text-center sticky right-0 bg-background z-20 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.2)]">
                      <Actions data={item} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Suspense>
          <ScrollBar orientation="horizontal" />
        </ListScrollArea>
      </div>

      <div className="pt-2">
        <Pages
          total={data?.total ?? 0}
          currentPage={Number(data?.pageNum ?? 1)}
          pageSize={Number(data?.pageSize ?? 10)}
        />
      </div>
    </div>
  );
}
