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
  const hasAdminPermission = await hasPermission("borrow_report_search");
  return (
    <>
      <Suspense
        fallback={
          <div className="bg-background flex flex-col gap-2 p-4">
            <Skeleton />
            <Skeleton />
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
          <div className="bg-background flex-1 p-4">
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
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense>
        <CommonWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
