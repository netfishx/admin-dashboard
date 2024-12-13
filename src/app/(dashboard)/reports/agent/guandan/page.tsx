import { getGuandanGames } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import type { PokerReportRequestParams } from "@/lib/types";
import { getSession } from "@/session";
import { Suspense } from "react";
import { List, ListHeader } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: Promise<PokerReportRequestParams>;
}

async function ListFilterWrapper() {
  const session = await getSession();
  const permissions = session?.permissions;
  const hasSearchPermission = permissions?.includes(
    "agent_report_guandan_search",
  );
  return <ListFilter hasSearchPermission={!!hasSearchPermission} />;
}

export default async function Page({ searchParams }: CommonWrapperProps) {
  const gameListResp = await getGuandanGames();
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="flex items-center justify-between bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <ListFilterWrapper />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex-1 bg-background p-2">
            <div className="relative rounded-sm border">
              <Table>
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
