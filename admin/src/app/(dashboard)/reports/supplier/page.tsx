import { getAllGames } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import type { SupplierReportRequestParams } from "@/lib/types";
import { hasPermission } from "@/session";
import { Suspense } from "react";
import { List, ListHeader } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: Promise<SupplierReportRequestParams>;
}

export default async function Page({ searchParams }: CommonWrapperProps) {
  const hasSearchPermission = await hasPermission("admin_supplier_report");
  const resp = await getAllGames();
  const { startTime, endTime } = await searchParams;
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="bg-background flex items-center justify-between p-4">
            <Skeleton />
          </div>
        }
      >
        <ListFilter
          hasSearchPermission={hasSearchPermission}
          key={`${startTime}-${endTime}`}
        />
      </Suspense>
      <Suspense
        fallback={
          <div className="bg-background flex-1 p-2">
            <div className="relative rounded-sm border">
              <Table className="table-fixed">
                <ListHeader />
                <TableSkeleton length={5} colSpan={7} />
              </Table>
            </div>
          </div>
        }
      >
        <List searchParams={searchParams} gameList={resp?.data || []} />
      </Suspense>
    </div>
  );
}
