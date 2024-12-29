import TableSkeleton from "@/components/table-skeleton";
import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import { Form } from "./form";
import { List, ListHeader } from "./list";

export default async function Page() {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <Form />
      <div className="bg-background flex-1 p-4">
        <div className="rounded-sm border">
          <Table className="table-fixed">
            <ListHeader />
            <Suspense fallback={<TableSkeleton length={5} colSpan={6} />}>
              <List />
            </Suspense>
          </Table>
        </div>
      </div>
    </div>
  );
}
