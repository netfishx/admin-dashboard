import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import type { BorrowRecordRequestParams } from "@/lib/types";
import { Suspense } from "react";
import { List, ListHeader } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: Promise<BorrowRecordRequestParams>;
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  const { startTime, endTime } = await searchParams;
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-between bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <ListFilter key={`${startTime}-${endTime}`} />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex-1 bg-background p-4">
            <div className="relative rounded-sm border">
              <Table>
                <ListHeader />
                <TableSkeleton length={5} colSpan={6} />
              </Table>
            </div>
          </div>
        }
      >
        <List searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export default function Page({ searchParams }: CommonWrapperProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense>
        <CommonWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
