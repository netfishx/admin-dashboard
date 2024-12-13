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
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="flex flex-col gap-2 bg-background p-2">
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <FormWrapper searchParams={searchParams} />
      </Suspense>

      <div className="flex-1 gap-2 bg-background p-2">
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
        <TableHead className="w-24 text-center">{t("issueNumber")}</TableHead>
        <TableHead className="w-48 text-center">{t("openTime")}</TableHead>

        <TableHead className="w-24 text-center">{t("gameType")}</TableHead>
        <TableHead className="w-32 text-center">{t("gameId")}</TableHead>
        <TableHead className="w-24 text-center">{t("betNum")}</TableHead>
        <TableHead className="w-24 text-center">
          {t("memberBetAmount")}
        </TableHead>
        <TableHead className="w-24 text-center">{t("tieAmount")}</TableHead>
        <TableHead className="w-24 text-center">{t("pairBetAmount")}</TableHead>
        <TableHead className="w-32 text-center">
          {t("availableBetAmount")}
        </TableHead>
        <TableHead className="w-24 text-center">{t("backIncome")}</TableHead>
        <TableHead className="sticky right-0 w-24 bg-muted text-center">
          {t("action")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
async function PeriodTable({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
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
      <Table className="rounded-sm border">
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
    issueNumber: issueNumber?.toString() ?? null,
  };
  const { data } = await getPeriodReport(params);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex-1 bg-background">
        <div className="relative h-full rounded-sm border">
          <Table>
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
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const translations = await getTranslations();
  const urlParams = await searchParams;

  return (
    <TableBody>
      {data && data.list.length > 0 ? (
        data?.list?.map((item) => (
          <TableRow key={item.issueNumber}>
            <TableCell className="text-center">{item.issueNumber}</TableCell>
            <TableCell className="text-center">
              <Time time={Number(item.openTime)} />
            </TableCell>
            <TableCell className="text-center">{item.gameTypeName}</TableCell>
            <TableCell className="text-center">{item.gameName}</TableCell>
            <TableCell className="text-center">{item.betNum}</TableCell>
            <TableCell className="text-center">
              {item.memberBetAmount}
            </TableCell>
            <TableCell className="text-center">{item.tieAmount}</TableCell>
            <TableCell className="text-center">{item.pairBetAmount}</TableCell>
            <TableCell className="text-center">
              {item.availableBetAmount}
            </TableCell>
            <TableCell className="text-center">{item.backIncome}</TableCell>
            <TableCell className="sticky right-0 bg-background text-center">
              <Actions searchParams={urlParams} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={12} className="h-40 text-center">
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
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const { startTime, endTime } = await searchParams;
  const res = await getGameList(1);
  return <Form list={res.data ?? []} key={`${startTime}-${endTime}`} />;
}
