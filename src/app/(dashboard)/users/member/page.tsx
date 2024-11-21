import { getMemberList } from "@/api";
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
import type { MemberList } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Actions from "./action-buttons";
import Form from "./form";
import { Modals } from "./modals";

export default function Page({
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
      </Suspense>
      <div className="p-2 bg-background flex-1 gap-2">
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
      <Modals />
    </div>
  );
}

async function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const params = await searchParams;
  const { data } = await getMemberList({
    ...params,
    pageNum: Number(params.pageNum ?? 1),
    pageSize: Number(params.pageSize ?? 10),
  });
  return (
    <>
      <div className="border rounded-sm relative">
        <Table>
          <TableHeaderWrapper />
          <Suspense fallback={<TableBodySkeleton />}>
            <TableBodyWrapper list={data?.list} />
          </Suspense>
        </Table>
      </div>
      <div className="pt-2">
        <CustomPagination
          total={data?.total ?? 0}
          currentPage={Number(data?.pageNum ?? 1)}
          pageSize={Number(data?.pageSize ?? 10)}
        />
      </div>
    </>
  );
}
async function TableHeaderWrapper() {
  const t = await getTranslations("users.members");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead>{t("upUsername")}</TableHead>
        <TableHead className="min-w-28">{t("deptId")}</TableHead>
        <TableHead className="min-w-60">{t("userId")}</TableHead>
        <TableHead>{t("username")}</TableHead>
        <TableHead>{t("nickname")}</TableHead>
        <TableHead className="min-w-28">{t("walletAddress")}</TableHead>
        <TableHead className="min-w-28">{t("debtAmount")}</TableHead>
        <TableHead className="min-w-28">{t("creditAmount")}</TableHead>
        <TableHead className="min-w-20">{t("status")}</TableHead>
        <TableHead className="min-w-[630px] text-center sticky right-0 bg-muted">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
async function TableBodyWrapper({ list }: { list: MemberList[] | undefined }) {
  const t = await getTranslations("users.members");
  return (
    <TableBody>
      {list?.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.upUsername}</TableCell>
          <TableCell>{item.level}</TableCell>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.username}</TableCell>
          <TableCell>{item.nickname}</TableCell>
          <TableCell>{item.depositAddress}</TableCell>
          <TableCell>{item.debtAmount}</TableCell>
          <TableCell>{item.creditAmount}</TableCell>
          <TableCell>
            <div
              className={cn(
                "px-2 rounded-sm w-fit",
                item.status === 0 && "text-green bg-green/10",
                item.status === 1 && "text-destructive bg-destructive/10",
              )}
            >
              {t(`statusLabel.${item.status}`)}
            </div>
          </TableCell>
          <TableCell className="text-center sticky right-0 bg-background">
            <Actions data={item} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

async function TableBodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={10}>
            <Skeleton className="w-full h-4" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
