import { getPeriodReport } from "@/api";
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
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Actions } from "./actions";
import { Form } from "./form";
export default async function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={null}>
        <Form />
      </Suspense>
      {/* table */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-4 p-4">
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-2/3 h-6" />
          </div>
        }
      >
        <PeriodTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function PeriodTable({ searchParams }: { searchParams: any }) {
  const t = await getTranslations("report.periodlist");
  const search = await searchParams;
  const { data } = await getPeriodReport({
    size: search.size ?? 10,
    pages: search.pages ?? 1,
  });
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="p-2 bg-background flex-1">
        <div className="h-full border rounded-sm relative">
          <ListScrollArea>
            <Suspense fallback={<div>loading...</div>}>
              <Table className="">
                <TableHeader className="sticky">
                  <TableRow className="bg-muted">
                    <TableHead className="min-w-32 text-center">
                      {t("gameId")}
                    </TableHead>
                    <TableHead className="min-w-32 text-center">
                      {t("openTime")}
                    </TableHead>
                    <TableHead className="min-w-32 text-center">
                      {t("gameType")}
                    </TableHead>
                    <TableHead className="min-w-32 text-center">
                      {t("gameName")}
                    </TableHead>
                    <TableHead className="min-w-32 text-center">
                      {t("betNum")}
                    </TableHead>
                    <TableHead className="min-w-32 text-center">
                      {t("betMoneyAmount")}
                    </TableHead>
                    <TableHead className="min-w-32 text-center">
                      {t("heMoney")}
                    </TableHead>
                    <TableHead className="min-w-32 text-center">
                      {t("ddMoney")}
                    </TableHead>
                    <TableHead className="min-w-32 text-center">
                      {t("workMoney")}
                    </TableHead>
                    <TableHead className="min-w-32 text-center">
                      {t("memberBackMoney")}
                    </TableHead>
                    <TableHead className="w-24 text-center sticky right-0 bg-muted">
                      {t("action")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.list?.map((item: any) => (
                    <TableRow key={item.gameId}>
                      <TableCell className="w-24 text-center">
                        {item.gameId}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.openTime}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.gameType}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.gameName}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.betNum}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.betMoneyAmount}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.heMoney}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.ddMoney}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.workMoney}
                      </TableCell>
                      <TableCell className="w-24 text-center">
                        {item.memberBackMoney}
                      </TableCell>
                      <TableCell className="!sticky !right-0 bg-background w-24 text-center">
                        <Actions />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Suspense>
            <ScrollBar orientation="horizontal" />
          </ListScrollArea>
        </div>
        <div className="pt-2">
          <Pages
            total={data?.total ?? 0}
            currentPage={Number(data?.page ?? 1)}
            pageSize={Number(data?.size ?? 10)}
          />
        </div>
      </div>
    </div>
  );
}
