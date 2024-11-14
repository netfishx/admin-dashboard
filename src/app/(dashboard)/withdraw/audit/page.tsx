import { getAuditList } from "@/api";
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
import { endOfDay, startOfDay } from "date-fns";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
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
  const t = await getTranslations("withdraw.audit");
  const translations = await getTranslations();

  const search = await searchParams;
  const now = Date.now();
  const start = search.startTime ?? startOfDay(now).getTime();
  const end = search.endTime ?? endOfDay(now).getTime();
  const { data } = await getAuditList({
    startTime: Number(start),
    endTime: Number(end),
    memberId: Number(search.memberId),
    orderNo: search.orderNo as string,
    businessOrderNo: search.businessOrderNo as string,
    gameTypeName: search.gameTypeName as string,
    gameName: search.gameName as string,
    pageNum: Number(search.pageNum ?? 1),
    pageSize: Number(search.pageSize ?? 10),
  });

  console.info("agent list:", data);
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
                    {t("orderNo")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("auditCreateTime")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("businessOrderType")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("businessOrderNo")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("memberId")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("orderAmount")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("auditMultiple")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("validBetAmount")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("remainingAudit")}
                  </TableHead>
                  <TableHead className="min-w-32 text-center">
                    {t("auditStatus")}
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
                      {item.orderNo}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.auditCreateTime}
                    </TableCell>

                    <TableCell className="min-w-32 text-center">
                      {item.businessOrderType}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.businessOrderNo}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.memberId}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.orderAmount}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.auditMultiple}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.validBetAmount}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.remainingAudit}
                    </TableCell>
                    <TableCell className="min-w-32 text-center">
                      {item.auditStatus}
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
      {Number(data?.total) > 0 && (
        <div className="pt-2">
          <Pages
            total={data?.total ?? 0}
            currentPage={Number(data?.pageNum ?? 1)}
            pageSize={Number(data?.pageSize ?? 10)}
          />
        </div>
      )}
    </div>
  );
}
