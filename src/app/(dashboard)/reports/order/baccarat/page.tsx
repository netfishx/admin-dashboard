import { getBaccaratGames } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import type { OrderReportsRequestParams } from "@/lib/types";
import { Suspense } from "react";
import { List, ListHeader } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: Promise<OrderReportsRequestParams>;
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  const gameListResp = await getBaccaratGames();
  const { startTime, endTime } = await searchParams;
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="flex items-center justify-between bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <ListFilter
          gameList={gameListResp?.data ?? []}
          key={`${startTime}-${endTime}`}
        />
      </Suspense>
      <Suspense
        fallback={
          <div className="p-4 bg-background flex-1">
            <div className="border rounded-sm">
              <Table>
                <ListHeader />
                <TableSkeleton length={5} colSpan={16} />
              </Table>
            </div>
          </div>
        }
      >
        <List searchParams={searchParams} gameList={gameListResp?.data ?? []} />
      </Suspense>
    </div>
  );
}

export default function Page({ searchParams }: CommonWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className="flex w-full flex-col gap-2">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      }
    >
      <CommonWrapper searchParams={searchParams} />
    </Suspense>
  );
}
