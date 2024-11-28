import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import { List } from "./list";
import { TableBodySkeleton, TableHeaderWrapper } from "./list";
export default async function Page() {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <Suspense
        fallback={
          <Table className="border rounded-sm">
            <TableHeaderWrapper />
            <TableBodySkeleton />
          </Table>
        }
      >
        <List />
      </Suspense>
    </div>
  );
}
