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

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <ListFilterWrapper gameList={gameListResp?.data ?? []} />
      </Suspense>
      <Suspense
        fallback={
          <div className="p-2 bg-background flex-1">
            <div className="border rounded-sm relative">
              <Table>
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
