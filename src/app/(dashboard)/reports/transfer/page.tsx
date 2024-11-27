import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import type { TransferRecordRequestParams } from "@/lib/types";
import { hasPermission } from "@/session";
import { Suspense } from "react";
import { List, ListHeader } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: Promise<TransferRecordRequestParams>;
}

export default async function Page({ searchParams }: CommonWrapperProps) {
  const hasSearchPermission = await hasPermission("admin_supplier_report");

  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background p-4">
            <Skeleton className="w-full h-9 opacity-20" />
          </div>
        }
      >
        <ListFilter hasSearchPermission={hasSearchPermission} />
      </Suspense>
      <Suspense
        fallback={
          <Table>
            <ListHeader />
            <TableSkeleton length={5} colSpan={15} />
          </Table>
        }
      >
        <List searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
