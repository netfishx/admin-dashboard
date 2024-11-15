import { getAuditList } from "@/api";
import { CustomPagination } from "@/components/custom-pagination";
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
  const t = await getTranslations("withdraw.audit");
  const translations = await getTranslations();

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
        <ListScrollArea>
          <Suspense
            fallback={
              <div className="bg-background py-2">
                <Skeleton className="h-9 w-full opacity-25" />
              </div>
            }
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="min-w-32 text-center">
                    {t("id")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("createTime")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("orderType")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("userId")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("orderAmount")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("auditMultiple")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("availableAudit")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("remainingAudit")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("status")}
                  </TableHead>

                  <TableHead className="min-w-48 text-center sticky right-0 bg-muted z-20 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.2)]">
                    {translations("action")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.list.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="min-w-32 text-center">
                      {item.id}
                    </TableCell>
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
                    <TableCell className="min-w-32 text-center">
                      {item.remainingAudit}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.status}
                    </TableCell>

                    <TableCell className="min-w-48 text-center sticky right-0 bg-background z-20 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.2)]">
                      <CleanBtn data={item} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Suspense>
          <ScrollBar orientation="horizontal" />
        </ListScrollArea>
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
