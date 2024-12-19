import { getPeriodReport } from "@/api";
import { getGameList } from "@/api";
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
import type { PageData, PeriodReportList } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Actions } from "./actions";
import { Form } from "./form";
export default async function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
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
        <FormWrapper searchParams={searchParams} />
      </Suspense>

      <div className="flex-1 gap-2 bg-background p-4">
        <Suspense
          fallback={
            <Table className="table-fixed">
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
        <TableHead className="w-32">{t("issueNumber")}</TableHead>
        <TableHead className="w-48">{t("openTime")}</TableHead>
        <TableHead className="w-24">{t("gameType")}</TableHead>
        <TableHead className="w-32">{t("gameId")}</TableHead>
        <TableHead className="w-24">{t("betNum")}</TableHead>
        <TableHead className="w-24">{t("memberBetAmount")}</TableHead>
        <TableHead className="w-24">{t("tieAmount")}</TableHead>
        <TableHead className="w-24">{t("pairBetAmount")}</TableHead>
        <TableHead className="w-24">{t("availableBetAmount")}</TableHead>
        <TableHead className="w-24">{t("backIncome")}</TableHead>
        <TableHead className="w-32 text-center sticky right-0 bg-muted">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
async function PeriodTable({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const {
    startTime,
    endTime,
    pageSize,
    pageNum,
    gameType,
    gameId,
    issueNumber,
  } = await searchParams;

  if (!(startTime && endTime)) {
    return (
      <Table className="rounded-sm border table-fixed">
        <PeriodTableHeader />
        <TableBodySkeleton />
      </Table>
    );
  }
  const params = {
    pageSize: Number(pageSize ?? 10),
    pageNum: Number(pageNum ?? 1),
    startTime: Number(startTime),
    endTime: Number(endTime),
    // temp临时参数
    // startTime: 1730304000000,
    // endTime: 1730504000000,
    gameType: gameType ? Number(gameType) : 61, // 第一期先写死
    gameId: gameId ? Number(gameId) : null,
    issueNumber: issueNumber || null,
  };
  const { data } = await getPeriodReport(params);
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-background flex-1">
        <div className="h-full border rounded-sm relative">
          <Table className="table-fixed">
            <PeriodTableHeader />
            <Suspense fallback={<TableBodySkeleton />}>
              <TableBodyWrapper
                data={data as PageData<PeriodReportList>}
                searchParams={searchParams}
              />
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
  searchParams,
}: {
  data?: PageData<PeriodReportList>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const translations = await getTranslations();
  const urlParams = await searchParams;

  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data?.list?.map((item) => (
          <TableRow key={item.issueNumber}>
            <TableCell>{item.issueNumber}</TableCell>
            <TableCell>
              <Time time={Number(item.openTime)} />
            </TableCell>
            <TableCell>{item.gameTypeName}</TableCell>
            <TableCell>{item.gameName}</TableCell>
            <TableCell>{item.betNum}</TableCell>
            <TableCell>{item.memberBetAmount}</TableCell>
            <TableCell>{item.tieAmount}</TableCell>
            <TableCell>{item.pairBetAmount}</TableCell>
            <TableCell>{item.availableBetAmount}</TableCell>
            <TableCell>{item.backIncome}</TableCell>
            <TableCell className="sticky right-0 bg-background text-center">
              <Actions searchParams={urlParams} data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={11} className="text-center h-40">
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
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

async function FormWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { startTime, endTime } = await searchParams;
  const res = await getGameList(1);
  return <Form list={res.data ?? []} key={`${startTime}-${endTime}`} />;
}
