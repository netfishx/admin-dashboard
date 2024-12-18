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
          <div className="flex items-center justify-between bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <ListFilter hasTransferTypePermission={hasTransferTypePermission} />
      </Suspense>
      <Suspense
        fallback={
          <Table>
            <ListHeader />
            <TableSkeleton
              length={5}
              colSpan={hasTransferTypePermission ? 6 : 5}
            />
          </Table>
        }
      >
        <List searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
