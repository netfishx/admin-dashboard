import {
  MinerFeeTableBody,
  MinerFeeTableHeader,
  TableBodySkeleton,
} from "@/app/(dashboard)/fund/minerfee/list";
import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import { AddBtn } from "./add-btn";

export default async function Page() {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <AddBtn />
      <div className="flex flex-1 flex-col bg-background p-4">
        <div className="rounded-sm border">
          <Table className="table-fixed">
            <MinerFeeTableHeader />
            <Suspense fallback={<TableBodySkeleton />}>
              <MinerFeeTableBody />
            </Suspense>
          </Table>
        </div>
      </div>
    </div>
  );
}
