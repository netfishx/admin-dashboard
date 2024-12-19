import { getBaccaratGames } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import type { GameInfo, MemberReportRequestParams } from "@/lib/types";
import { getSession } from "@/session";
import { Suspense } from "react";
import { List, ListHeader } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: Promise<MemberReportRequestParams>;
}

async function ListFilterWrapper({ gameList }: { gameList: GameInfo[] }) {
  const session = await getSession();
  const permissions = session?.permissions;
  const hasSearchPermission = permissions?.includes(
    "member_report_baccarat_search",
  );
  return (
    <ListFilter
      hasSearchPermission={!!hasSearchPermission}
      gameList={gameList}
    />
  );
}

export default async function Page({ searchParams }: CommonWrapperProps) {
  const gameListResp = await getBaccaratGames();
  const { startTime, endTime } = await searchParams;

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="flex items-center justify-between bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <ListFilterWrapper
          gameList={gameListResp?.data ?? []}
          key={`${startTime}-${endTime}`}
        />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex-1 bg-background p-2">
            <div className="relative rounded-sm border">
              <Table className="table-fixed">
                <ListHeader />
                <TableSkeleton length={5} colSpan={10} />
              </Table>
            </div>
          </div>
        }
      >
        <List searchParams={searchParams} gameList={gameListResp?.data ?? []} />
      </Suspense>
    </div>
  );
}
