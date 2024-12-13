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
import type { AuditList } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { CleanBtn } from "./clean-btn";
import { Form } from "./form";

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
          <div className="flex flex-col gap-2 bg-background p-2">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <Form key={`${startTime}-${endTime}`} />
      </Suspense>
      <div className="flex-1 bg-background">
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
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const { startTime, endTime, id, userId, pageNum, pageSize } =
    await searchParams;
  if (!(startTime && endTime)) {
    return (
      <Table className="rounded-sm border">
        <TableHeaderWrapper />
        <TableBodySkeleton />
      </Table>
    );
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
    <div className="w-full flex-1 bg-background p-2">
      <div className="relative overflow-x-auto overflow-y-auto rounded-sm border">
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
        <TableHead className="w-32 text-center">{t("id")}</TableHead>
        <TableHead className="w-32 text-center">{t("createTime")}</TableHead>
        <TableHead className="w-32 text-center">{t("orderType")}</TableHead>
        <TableHead className="w-32 text-center">{t("userId")}</TableHead>
        <TableHead className="w-32 text-center">{t("orderAmount")}</TableHead>
        <TableHead className="w-32 text-center">{t("auditMultiple")}</TableHead>
        <TableHead className="w-32 text-center">
          {t("availableAudit")}
        </TableHead>
        <TableHead className="w-32 text-center">
          {t("remainingAudit")}
        </TableHead>
        <TableHead className="w-32 text-center">{t("status")}</TableHead>

        <TableHead className="sticky right-0 w-48 bg-muted text-center">
          {translations("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
async function TableBodyWrapper({ list }: { list: AuditList[] }) {
  const translations = await getTranslations();
  const t = await getTranslations("withdraw.audit");

  const orderTypeList = {
    0: t("deposit"),
    1: t("issueRebate"),
  };
  const statusList = {
    0: t("uncompleted"),
    1: t("completed"),
    2: t("manualCleared"),
  };
  return (
    <TableBody>
      {list && list.length > 0 ? (
        list.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="text-center">{item.id}</TableCell>
            <TableCell className="text-center">
              <Time time={item.createTime} />
            </TableCell>

            <TableCell className="text-center">
              {orderTypeList[item.orderType as keyof typeof orderTypeList]}
            </TableCell>
            <TableCell className="text-center">{item.userId}</TableCell>
            <TableCell className="text-center">{item.orderAmount}</TableCell>
            <TableCell className="text-center">{item.auditMultiple}</TableCell>
            <TableCell className="text-center">{item.availableAudit}</TableCell>
            <TableCell className="text-center">{item.remainingAudit}</TableCell>
            <TableCell className="text-center">
              {statusList[item.status as keyof typeof statusList]}
            </TableCell>

            <TableCell className="sticky right-0 bg-background text-center">
              <CleanBtn data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={10} className="h-40 text-center">
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
