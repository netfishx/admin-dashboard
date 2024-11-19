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

import type { AuditList } from "@/lib/types";
import { endOfDay, startOfDay } from "date-fns";
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
        <Suspense>
          <TableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const search = await searchParams;
  const now = Date.now();
  const start = search.startTime ?? startOfDay(now).getTime();
  const end = search.endTime ?? endOfDay(now).getTime();
  const { data } = await getAuditList({
    startTime: Number(start),
    endTime: Number(end),
    id: (search.id ?? "") as string,
    userId: (search.userId ?? "") as string,
    pageNum: Number(search.pageNum ?? 1),
    pageSize: Number(search.pageSize ?? 10),
  });
  // temp dict
  // 稽核状态
  return (
    <div className="p-2 bg-background flex-1 w-full ">
      <div className="relative overflow-y-auto overflow-x-auto border rounded-sm">
        <Table>
          <TableHeaderWrapper />
          <Suspense
            fallback={
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <TableRow key={i}>
                    <TableCell colSpan={10} className="h-40">
                      <Skeleton className="w-full h-full" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            }
          >
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
              {item.createTime}
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
