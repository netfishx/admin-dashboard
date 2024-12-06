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
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <ListFilter hasSearchPermission={hasSearchPermission} />
      </Suspense>
      <Suspense
        fallback={
          <div className="p-2 bg-background flex-1">
            <div className="border rounded-sm relative">
              <Table>
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
