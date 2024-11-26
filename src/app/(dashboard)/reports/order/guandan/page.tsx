import TableSkeleton from "@/components/table-skeleton";
import { Table } from "@/components/ui/table";
import type { GameRecordRequestParams } from "@/lib/types";
import { Suspense } from "react";
import { BombDetailDialog } from "./bomb-detail-dialog";
import { List, ListHeader } from "./list";
import { ListFilter } from "./list-filter";
import { OrderDetailDialog } from "./order-detail-dialog";
interface CommonWrapperProps {
  searchParams: Promise<GameRecordRequestParams>;
}

export default function Page({ searchParams }: CommonWrapperProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense>
        <ListFilter />
      </Suspense>
      <Suspense
        fallback={
          <div className="p-2 bg-background flex-1">
            <div className="border rounded-sm relative">
              <Table>
                <ListHeader />
                <TableSkeleton length={5} colSpan={15} />
              </Table>
            </div>
          </div>
        }
      >
        <List searchParams={searchParams} />
      </Suspense>
      <OrderDetailDialog />
      <BombDetailDialog />
    </div>
  );
}
