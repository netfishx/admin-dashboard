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
  const res = await getBaccaratGames();
  const { startTime, endTime } = await searchParams;
  return (
    <div className="flex w-full flex-col gap-2">
      <ListFilter gameList={res?.data ?? []} key={`${startTime}-${endTime}`} />
      <Suspense
        fallback={
          <div className="bg-background flex-1 p-4">
            <div className="rounded-sm border">
              <Table className="table-fixed">
                <ListHeader />
                <TableSkeleton length={5} colSpan={16} />
              </Table>
            </div>
          </div>
        }
      >
        <List searchParams={searchParams} gameList={res?.data ?? []} />
      </Suspense>
    </div>
  );
}

export default function Page({ searchParams }: CommonWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className="flex w-full flex-col gap-2">
          <div className="bg-background flex flex-col gap-2 p-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div className="bg-background flex-1 p-4">
            <div className="rounded-sm border">
              <Table className="table-fixed">
                <ListHeader />
                <TableSkeleton length={5} colSpan={16} />
              </Table>
            </div>
          </div>
        </div>
      }
    >
      <CommonWrapper searchParams={searchParams} />
    </Suspense>
  );
}
