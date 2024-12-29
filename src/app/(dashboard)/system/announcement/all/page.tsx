import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import { List, TableBodySkeleton, TableHeaderWrapper } from "./list";
// 上级公告
export default async function All({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  return (
    <div className="mt-2 flex h-full w-full flex-col gap-2">
      <div className="bg-background flex flex-1 flex-col gap-2 p-4">
        <Suspense
          fallback={
            <Table className="table-fixed">
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
