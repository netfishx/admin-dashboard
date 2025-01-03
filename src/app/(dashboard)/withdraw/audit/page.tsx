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

import { Time } from "@/components/time";
import { AUDIT_STATUS, ORDER_TYPE } from "@/lib/dict";
import type { AuditList } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { CleanBtn } from "./clean-btn";
import { Form } from "./form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { startTime, endTime } = await searchParams;
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="bg-background flex flex-col gap-2 p-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <Form key={`${startTime}-${endTime}`} />
      </Suspense>
      <div className="bg-background flex-1 p-4">
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

async function TableWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { startTime, endTime, id, userId, pageNum, pageSize } =
    await searchParams;
  if (!(startTime && endTime)) {
    return (
      <Table className="table-fixed rounded-sm border">
        <TableHeaderWrapper />
        <TableBodySkeleton />
      </Table>
    );
  }

  const { data } = await getAuditList({
    startTime: Number(startTime),
    endTime: Number(endTime),
    id: id || null,
    userId: userId || null,
    pageNum: Number(pageNum ?? 1),
    pageSize: Number(pageSize ?? 10),
  });
  // temp dict
  // 稽核状态
  return (
    <div className="bg-background w-full flex-1">
      <div className="relative overflow-x-auto overflow-y-auto rounded-sm border">
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
  const t = await getTranslations("withdraw.audit");
  const translations = await getTranslations();

  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-48">{t("id")}</TableHead>
        <TableHead className="w-48">{t("createTime")}</TableHead>
        <TableHead className="w-32">{t("orderType")}</TableHead>
        <TableHead className="w-48">{t("userId")}</TableHead>
        <TableHead className="w-48">{t("orderAmount")}</TableHead>
        <TableHead className="w-24">{t("auditMultiple")}</TableHead>
        <TableHead className="w-48">{t("availableAudit")}</TableHead>
        <TableHead className="w-48">{t("remainingAudit")}</TableHead>
        <TableHead className="w-32">{t("status")}</TableHead>
        <TableHead className="bg-muted sticky right-0 w-48 p-0 text-center">
          <div className="shadow-l flex h-full items-center justify-center px-4">
            {translations("action")}
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
async function TableBodyWrapper({ list }: { list: AuditList[] }) {
  const translations = await getTranslations();
  const t = await getTranslations("withdraw.audit");

  return (
    <TableBody>
      {list && list.length > 0 ? (
        list.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>
              <Time time={item.createTime} />
            </TableCell>

            <TableCell>
              {(() => {
                const status = ORDER_TYPE.find(
                  (s) => s.value === item.orderType,
                );
                return status ? t(status.label) : item.orderType;
              })()}
            </TableCell>
            <TableCell>{item.userId}</TableCell>
            <TableCell>{formatNumber(Number(item.orderAmount))}</TableCell>
            <TableCell>{formatNumber(Number(item.auditMultiple))}</TableCell>
            <TableCell>{formatNumber(Number(item.availableAudit))}</TableCell>
            <TableCell>{formatNumber(Number(item.remainingAudit))}</TableCell>
            <TableCell>
              {(() => {
                const status = AUDIT_STATUS.find(
                  (s) => s.value === item.status,
                );
                return status ? t(status.label) : item.status;
              })()}
            </TableCell>

            <TableCell className="bg-background sticky right-0 p-0">
              <div className="shadow-l flex items-center justify-center px-4 py-2">
                <CleanBtn data={item} />
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={10} className="h-48 text-center">
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
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
