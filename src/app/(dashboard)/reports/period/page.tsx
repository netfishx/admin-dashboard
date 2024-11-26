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
          <div className="flex justify-between items-center bg-background py-2 px-4">
            <Skeleton className="w-full h-9 opacity-20" />
            <Skeleton className="w-full h-9 opacity-20" />
          </div>
        }
      >
        <Form />
      </Suspense>

      <div className="p-2 bg-background flex-1 gap-2">
        <PeriodTable searchParams={searchParams} />
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
        <TableHead className="min-w-32 text-center">
          {t("gameTypeName")}
        </TableHead>
        <TableHead className="min-w-32 text-center">{t("gameName")}</TableHead>
        <TableHead className="min-w-32 text-center">{t("betNum")}</TableHead>
        <TableHead className="min-w-32 text-center">{t("betAmount")}</TableHead>
        <TableHead className="min-w-32 text-center">{t("tieAmount")}</TableHead>
        <TableHead className="min-w-32 text-center">
          {t("pairBetAmount")}
        </TableHead>
        <TableHead className="min-w-32 text-center">
          {t("validBetAmount")}
        </TableHead>
        <TableHead className="text-center">{t("memberBackAmount")}</TableHead>
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
  const translations = await getTranslations();
  const search = await searchParams;
  const now = Date.now();
  const start = search.startTime ?? startOfDay(now).getTime();
  const end = search.endTime ?? endOfDay(now).getTime();
  const { data } = await getPeriodReport({
    pageSize: Number(search.pageSize ?? 10),
    pageNum: Number(search.pageNum ?? 1),
    startTime: Number(start),
    endTime: Number(end),
    gameTypeName: search.gameTypeName?.toString() ?? "",
    gameName: search.gameName?.toString() ?? "",
    issueNumber: search.issueNumber?.toString() ?? "",
  });
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-background flex-1">
        <div className="h-full border rounded-sm relative">
          <Table>
            <PeriodTableHeader />
            <Suspense
              fallback={
                <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <TableRow key={index}>
                      <TableCell colSpan={12}>
                        <Skeleton className="w-full h-6" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              }
            >
              <TableBody>
                {data && data.list.length > 0 ? (
                  data?.list?.map((item) => (
                    <TableRow key={item.issueNumber}>
                      <TableCell className="w-24 text-center">
                        {item.issueNumber}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.openTime}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.gameTypeName}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.gameName}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.betNum}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.betAmount}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.tieAmount}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.pairBetAmount}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.validBetAmount}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.memberBackAmount}
                      </TableCell>
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
