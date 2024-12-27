import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import { hasPermission } from "@/session";
import { Suspense } from "react";
import { List, ListHeader } from "./list";
import { ListFilter } from "./list-filter";

async function CommonWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { startTime, endTime } = await searchParams;
  const hasAdminPermission = await hasPermission("credit_report_search");
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-between bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <ListFilter
          key={`${startTime}-${endTime}`}
          hasAdminPermission={hasAdminPermission}
        />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex-1 bg-background p-2">
            <div className="relative rounded-sm border">
              <Table className="table-fixed">
                <ListHeader />
                <TableSkeleton
                  length={5}
                  colSpan={hasAdminPermission ? 6 : 5}
                />
              </Table>
            </div>
          </div>
        }
      >
        <List searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export default function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense>
        <CommonWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
