import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import { Form } from "./form";
import { List, TableBodySkeleton, TableHeaderWrapper } from "./list";

export default async function Platform({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      {/* form: admin permission */}
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background py-2 px-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <Form />
      </Suspense>
      <div className="p-2 bg-background flex-1 flex flex-col gap-2">
        <Suspense
          fallback={
            <Table className="border rounded-sm">
              <TableHeaderWrapper />
              <TableBodySkeleton />
            </Table>
          }
        >
          <List searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
