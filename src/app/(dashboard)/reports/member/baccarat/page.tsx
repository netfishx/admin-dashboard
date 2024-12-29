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

async function ListFilterWrapper({
  gameList,
  hasSearchPermission,
}: {
  gameList: GameInfo[];
  hasSearchPermission: boolean;
}) {
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
  const session = await getSession();
  const permissions = session?.permissions;
  const hasSearchPermission = permissions?.includes(
    "member_report_baccarat_search",
  );

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="bg-background flex items-center justify-between p-4">
            <Skeleton />
          </div>
        }
      >
        <ListFilterWrapper
          gameList={gameListResp?.data ?? []}
          key={`${startTime}-${endTime}`}
          hasSearchPermission={!!hasSearchPermission}
        />
      </Suspense>
      <Suspense
        fallback={
          <div className="bg-background flex-1 p-2">
            <div className="relative rounded-sm border">
              <Table className="table-fixed">
                <ListHeader hasSearchPermission={!!hasSearchPermission} />
                <TableSkeleton length={5} colSpan={11} />
              </Table>
            </div>
          </div>
        }
      >
        <List
          searchParams={searchParams}
          gameList={gameListResp?.data ?? []}
          hasSearchPermission={!!hasSearchPermission}
        />
      </Suspense>
    </div>
  );
}
