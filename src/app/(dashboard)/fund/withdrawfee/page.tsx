import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import { List } from "./list";
import { TableBodySkeleton, TableHeaderWrapper } from "./list";
export default async function Page() {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex flex-1 flex-col gap-2">
        <Suspense
          fallback={
            <Table className="rounded-sm border">
              <TableHeaderWrapper />
              <TableBodySkeleton />
            </Table>
          }
        >
          <List />
        </Suspense>
      </div>
    </div>
  );
}
