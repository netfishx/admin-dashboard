import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import { List, TableBodySkeleton, TableHeaderWrapper } from "./list";
// 上级公告
export default async function All({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  return (
    <div className="flex flex-col gap-2 w-full h-full mt-2">
      <div className="p-2 bg-background flex-1 flex flex-col gap-2">
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
