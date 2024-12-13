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
      <div className="flex flex-1 flex-col gap-2 bg-background p-4">
        <Suspense
          fallback={
            <Table>
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
