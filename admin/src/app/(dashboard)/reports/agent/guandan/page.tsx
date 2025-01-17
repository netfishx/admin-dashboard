import { getGuandanGames } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import { getSession } from "@/session";
import { Suspense } from "react";
import { List, ListHeader } from "./list";
import { ListFilter } from "./list-filter";

async function ListFilterWrapper() {
  const session = await getSession();
  const permissions = session?.permissions;
  const hasSearchPermission = permissions?.includes(
    "agent_report_guandan_search",
  );
  return <ListFilter hasSearchPermission={!!hasSearchPermission} />;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { startTime, endTime } = await searchParams;
  const gameListResp = await getGuandanGames();
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="flex flex-col gap-2 bg-background p-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <ListFilterWrapper key={`${startTime}-${endTime}`} />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex-1 bg-background p-2">
            <div className="h-6" />
            <div className="relative rounded-sm border">
              <Table className="table-fixed">
                <ListHeader />
                <TableSkeleton length={5} colSpan={6} />
              </Table>
            </div>
          </div>
        }
      >
        <List searchParams={searchParams} gameList={gameListResp?.data || []} />
      </Suspense>
    </div>
  );
}
