import { getPeriodReport } from "@/api";
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
import type { PageData, PeriodReportList } from "@/lib/types";
import { format } from "date-fns";
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
              <PeriodTableHeader />
              <TableBodySkeleton />
            </Table>
          }
        >
          <PeriodTable searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
async function PeriodTableHeader() {
  const t = await getTranslations("report.periodlist");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="min-w-32 text-center">
          {t("issueNumber")}
        </TableHead>
        <TableHead className="min-w-32 text-center">{t("openTime")}</TableHead>
        <TableHead className="min-w-32 text-center">{t("gameType")}</TableHead>
        <TableHead className="min-w-32 text-center">{t("gameId")}</TableHead>
        <TableHead className="min-w-32 text-center">{t("betNum")}</TableHead>
        <TableHead className="min-w-32 text-center">
          {t("memberBetAmount")}
        </TableHead>
        <TableHead className="min-w-32 text-center">{t("tieAmount")}</TableHead>
        <TableHead className="min-w-32 text-center">
          {t("pairBetAmount")}
        </TableHead>
        <TableHead className="min-w-32 text-center">
          {t("availableBetAmount")}
        </TableHead>
        <TableHead className="text-center">{t("backIncome")}</TableHead>
        <TableHead className="w-24 text-center sticky right-0 bg-muted">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
async function PeriodTable({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const {
    startTime,
    endTime,
    pageSize,
    pageNum,
    gameType,
    gameId,
    issueNumber,
  } = await searchParams;
  if (!startTime || !endTime) {
    return null;
  }
  const { data } = await getPeriodReport({
    pageSize: Number(pageSize ?? 10),
    pageNum: Number(pageNum ?? 1),
    startTime: Number(startTime),
    endTime: Number(endTime),
    gameType: Number(gameType),
    gameId: Number(gameId) ?? null,
    issueNumber: issueNumber?.toString() ?? "",
  });
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-background flex-1">
        <div className="h-full border rounded-sm relative">
          <Table>
            <PeriodTableHeader />
            <Suspense fallback={<TableBodySkeleton />}>
              <TableBodyWrapper data={data} />
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
    </div>
  );
}

async function TableBodyWrapper({
  data,
}: { data?: PageData<PeriodReportList> }) {
  const translations = await getTranslations();

  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data?.list?.map((item) => (
          <TableRow key={item.issueNumber}>
            <TableCell className="w-24 text-center">
              {item.issueNumber}
            </TableCell>
            <TableCell className="w-24 text-center">
              {format(Number(item.openTime), "yyyy-MM-dd HH:mm:ss")}
            </TableCell>
            <TableCell className="w-24 text-center">{item.gameType}</TableCell>
            <TableCell className="w-24 text-center">{item.gameId}</TableCell>
            <TableCell className="w-24 text-center">{item.betNum}</TableCell>
            <TableCell className="w-24 text-center">
              {item.memberBetAmount}
            </TableCell>
            <TableCell className="w-24 text-center">{item.tieAmount}</TableCell>
            <TableCell className="w-24 text-center">
              {item.pairBetAmount}
            </TableCell>
            <TableCell className="w-24 text-center">
              {item.availableBetAmount}
            </TableCell>
            <TableCell className="text-center">{item.backIncome}</TableCell>
            <TableCell className="sticky right-0 bg-background w-24 text-center">
              <Actions />
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
          <TableCell colSpan={11}>
            <Skeleton className="w-full h-9" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
