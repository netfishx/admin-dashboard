import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import type { TransferRecordRequestParams } from "@/lib/types";
import { hasPermission } from "@/session";
import { Suspense } from "react";
import { List, ListHeader } from "./list";
import { ListFilter } from "./list-filter";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<TransferRecordRequestParams>;
}) {
  const hasTransferTypePermission = await hasPermission("transfer_type");
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="bg-background flex flex-col gap-2 p-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <ListFilter hasTransferTypePermission={hasTransferTypePermission} />
      </Suspense>
      <Suspense
        fallback={
          <div className="bg-background flex-1 p-4">
            <div className="relative rounded-sm border">
              <Table className="table-fixed">
                <ListHeader />
                <TableSkeleton
                  length={5}
                  colSpan={hasTransferTypePermission ? 6 : 5}
                />
              </Table>
            </div>
          </div>
        }
      >
        <List searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
