import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import { Form } from "./form";
import { List, TableBodySkeleton, TableHeaderWrapper } from "./list";

export default async function Platform({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { startTime, endTime } = await searchParams;
  return (
    <div className="flex h-full w-full flex-col gap-2">
      {/* form: admin permission */}
      <Suspense
        fallback={
          <div className="flex items-center justify-between bg-background p-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <Form key={`${startTime}-${endTime}`} />
      </Suspense>
      <div className="flex flex-1 flex-col gap-2 bg-background p-4">
        <Suspense
          fallback={
            <Table className="table-fixed rounded-sm border">
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
