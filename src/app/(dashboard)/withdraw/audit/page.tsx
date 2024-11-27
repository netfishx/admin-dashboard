import { getAuditList } from "@/api";
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
import { format } from "date-fns";

import type { AuditList } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { CleanBtn } from "./clean-btn";
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
            <Skeleton className="h-9 w-full opacity-25" />
            <Skeleton className="h-9 w-full opacity-25" />
          </div>
        }
      >
        <Form />
      </Suspense>
      <div className="bg-background flex-1">
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

async function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const { startTime, endTime, id, userId, pageNum, pageSize } =
    await searchParams;
  if (!startTime || !endTime) {
    return null;
  }

  const { data } = await getAuditList({
    startTime: Number(startTime),
    endTime: Number(endTime),
    id: (id ?? "") as string,
    userId: (userId ?? "") as string,
    pageNum: Number(pageNum ?? 1),
    pageSize: Number(pageSize ?? 10),
  });
  // temp dict
  // 稽核状态
  return (
    <div className="p-2 bg-background flex-1 w-full ">
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
  const t = await getTranslations("withdraw.audit");
  const translations = await getTranslations();
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-32 text-center">{t("id")}</TableHead>
        <TableHead className="min-w-32 text-center">
          {t("createTime")}
        </TableHead>
        <TableHead className="min-w-32 text-center">{t("orderType")}</TableHead>
        <TableHead className="min-w-32 text-center">{t("userId")}</TableHead>
        <TableHead className="min-w-32 text-center">
          {t("orderAmount")}
        </TableHead>
        <TableHead className="min-w-32 text-center">
          {t("auditMultiple")}
        </TableHead>
        <TableHead className="min-w-32 text-center">
          {t("availableAudit")}
        </TableHead>
        <TableHead className="text-center">{t("remainingAudit")}</TableHead>
        <TableHead className="min-w-32 text-center">{t("status")}</TableHead>

        <TableHead className="min-w-48 text-center sticky right-0 bg-muted">
          {translations("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
async function TableBodyWrapper({ list }: { list: AuditList[] }) {
  const translations = await getTranslations();
  return (
    <TableBody>
      {list && list.length > 0 ? (
        list.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="min-w-32 text-center">{item.id}</TableCell>
            <TableCell className="min-w-32 text-center">
              {format(item.createTime, "yyyy-MM-dd HH:mm:ss")}
            </TableCell>

            <TableCell className="min-w-32 text-center">
              {item.orderType}
            </TableCell>
            <TableCell className="min-w-32 text-center">
              {item.userId}
            </TableCell>
            <TableCell className="min-w-32 text-center">
              {item.orderAmount}
            </TableCell>
            <TableCell className="min-w-32 text-center">
              {item.auditMultiple}
            </TableCell>
            <TableCell className="min-w-32 text-center">
              {item.availableAudit}
            </TableCell>
            <TableCell className="text-center">{item.remainingAudit}</TableCell>
            <TableCell className="min-w-32 text-center">
              {item.status}
            </TableCell>

            <TableCell className="min-w-48 text-center sticky right-0 bg-background">
              <CleanBtn data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={10} className="text-center h-40">
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
          <TableCell colSpan={10}>
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
