import { getBaccaratGames } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import type { RatioReportRequestParams } from "@/lib/types";
import { Suspense } from "react";
import { RatioForm } from "./ratio-form";
import { ListHeader, RatioList } from "./ratio-list";
interface CommonWrapperProps {
  searchParams: Promise<RatioReportRequestParams>;
}

export default async function Page({ searchParams }: CommonWrapperProps) {
  const gameListResp = await getBaccaratGames();
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <RatioForm gameList={gameListResp?.data ?? []} />
      </Suspense>
      <Suspense
        fallback={
          <div className="p-4 bg-background flex-1">
            <div className="border rounded-sm">
              <Table>
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
