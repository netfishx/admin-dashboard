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
    <div className="flex h-full w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="flex items-center justify-between bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <RatioForm gameList={gameListResp?.data ?? []} />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex-1 bg-background p-2">
            <div className="relative rounded-sm border">
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
