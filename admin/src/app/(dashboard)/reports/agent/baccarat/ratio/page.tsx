import { getBaccaratGames } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import { RatioForm } from "./ratio-form";
import { ListHeader, RatioList } from "./ratio-list";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const gameListResp = await getBaccaratGames();
  const { startTime, endTime } = await searchParams;
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="flex items-center justify-between bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <RatioForm
          gameList={gameListResp?.data ?? []}
          key={`${startTime}-${endTime}`}
        />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex-1 bg-background p-4">
            <div className="h-6" />
            <div className="rounded-sm border">
              <Table className="table-fixed">
                <ListHeader />
                <TableSkeleton length={5} colSpan={11} />
              </Table>
            </div>
          </div>
        }
      >
        <RatioList
          searchParams={searchParams}
          gameList={gameListResp?.data ?? []}
        />
      </Suspense>
    </div>
  );
}
