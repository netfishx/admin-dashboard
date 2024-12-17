import { getBaccaratGames, getWithdrawApplyList } from "@/api";
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
import {
  MONEY_STATUS,
  USER_TYPE,
  WITHDRAW_MODE,
  WITHDRAW_STATUS,
} from "@/lib/dict";
import type { ApplyData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getSession } from "@/session";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Actions } from "./actions";
import { FlowDialog } from "./flow-dialog";
import { Form } from "./form";
import { MoneyBtn } from "./money-btn";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const { startTime, endTime } = await searchParams;

  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="flex flex-col gap-2 bg-background p-4">
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
            <Table className="rounded-sm border">
              <TableHeaderWrapper />
              <TableBodySkeleton />
            </Table>
          }
        >
          <TableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
      <FlowDialogWrapper />
    </div>
  );
}

async function TableWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const { startTime, endTime, approverStatus, pageNum, pageSize } =
    await searchParams;

  if (!(startTime && endTime)) {
    return (
      <Table className="rounded-sm border">
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
        <Table className="table-fixed">
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
        <TableHead className="w-48">{t("orderNo")}</TableHead>
        <TableHead className="w-48">{t("userId")}</TableHead>
        <TableHead className="w-24">{t("userType")}</TableHead>
        <TableHead className="w-32">{t("account")}</TableHead>
        <TableHead className="w-32">{t("nickname")}</TableHead>
        <TableHead className="w-32">{t("parentAccount")}</TableHead>
        <TableHead className="w-48">{t("withdrawMoney")}</TableHead>
        <TableHead className="w-56">{t("applyTime")}</TableHead>
        <TableHead className="w-32">{t("approverName")}</TableHead>
        <TableHead className="w-32 text-center">
          {t("approverStatus")}
        </TableHead>
        <TableHead className="w-32 text-center">{t("withdrawMode")}</TableHead>
        <TableHead className="w-32 text-center">{t("moneyStatus")}</TableHead>
        <TableHead className="w-48 text-center sticky right-0 bg-muted">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
async function TableBodyWrapper({ list }: { list: ApplyData[] }) {
  const translations = await getTranslations();
  const userInfo = await getSession();
  const t = await getTranslations("withdraw.apply");
  // 审核状态 0未处理 1锁定中 2拒绝 3通过
  // 资金状态 0转账中 1到账 2异常
  // 出金模式 0自动 1手动
  // 用户类型 0代理 1会员

  return (
    <TableBody>
      {list && list.length > 0 ? (
        list.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.orderNo}</TableCell>
            <TableCell>{item.userId}</TableCell>
            <TableCell>
              {(() => {
                const status = USER_TYPE.find((s) => s.value === item.userType);
                return status ? t(status.label) : item.userType;
              })()}
            </TableCell>
            <TableCell>{item.account}</TableCell>
            <TableCell>{item.nickname}</TableCell>
            <TableCell>{item.parentAccount}</TableCell>
            <TableCell>
              <MoneyBtn data={item} />
            </TableCell>
            <TableCell>
              <Time time={item.applyTime} />
            </TableCell>
            <TableCell>{item.approverName}</TableCell>
            <TableCell className="text-center">
              <div
                className={cn(
                  "inline-block w-fit rounded-sm px-2 text-center",
                  item.approverStatus === 0 && "bg-primary/10 text-primary",
                  item.approverStatus === 1 &&
                    "bg-muted-foreground/10 text-muted-foreground",
                  item.approverStatus === 2 &&
                    "bg-destructive/10 text-destructive",
                  item.approverStatus === 3 && "bg-green/10 text-green",
                )}
              >
                {(() => {
                  const status = WITHDRAW_STATUS.find(
                    (s) => s.value === item.approverStatus,
                  );
                  return status ? t(status.label) : item.approverStatus;
                })()}
              </div>
            </TableCell>
            <TableCell className="text-center">
              <div
                className={cn(
                  "inline-block w-fit rounded-sm px-2 text-center",
                  item.withdrawMode === 0 && "bg-green/10 text-green",
                  item.withdrawMode === 1 && "bg-orange/10 text-orange",
                )}
              >
                {(() => {
                  const status = WITHDRAW_MODE.find(
                    (s) => s.value === item.withdrawMode,
                  );
                  return status ? t(status.label) : item.withdrawMode;
                })()}
              </div>
            </TableCell>
            <TableCell className="text-center">
              <div
                className={cn(
                  "inline-block w-fit rounded-sm px-2 text-center",
                  item.moneyStatus === 0 && "bg-primary/10 text-primary",
                  item.moneyStatus === 1 && "bg-green/10 text-green",
                  item.moneyStatus === 2 &&
                    "bg-destructive/10 text-destructive",
                )}
              >
                {(() => {
                  const status = MONEY_STATUS.find(
                    (s) => s.value === item.moneyStatus,
                  );
                  return status ? t(status.label) : item.moneyStatus;
                })()}
              </div>
            </TableCell>
            <TableCell className="text-center sticky right-0 bg-background">
              <Actions data={item} currentUserId={userInfo?.id ?? "0"} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={13} className="text-center h-40">
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
          <TableCell colSpan={13}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
async function FlowDialogWrapper() {
  const gameListResp = await getBaccaratGames();

  return <FlowDialog gameList={gameListResp?.data ?? []} />;
}
