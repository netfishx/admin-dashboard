import { getGuandanGames } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import type { GameInfo, GameRecordRequestParams } from "@/lib/types";
import { getSession } from "@/session";
import { Suspense } from "react";
import { BombDetailDialog } from "./bomb-detail-dialog";
import { List, ListHeader } from "./list";
import { ListFilter } from "./list-filter";
import { OrderDetailDialog } from "./order-detail-dialog";
interface CommonWrapperProps {
  searchParams: Promise<GameRecordRequestParams>;
}

async function ListFilterWrapper({ gameList }: { gameList: GameInfo[] }) {
  const session = await getSession();
  const permissions = session?.permissions;
  const hasSearchPermission = permissions?.includes("detail_guandan_search");
  return (
    <ListFilter
      hasSearchPermission={!!hasSearchPermission}
      gameList={gameList}
    />
  );
}

export default async function Page({ searchParams }: CommonWrapperProps) {
  const gameListResp = await getGuandanGames();
  return (
    <div className="flex flex-col gap-2 w-full">
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
                <TableSkeleton length={5} colSpan={14} />
              </Table>
            </div>
          </div>
        }
      >
        <List searchParams={searchParams} />
      </Suspense>
      <OrderDetailDialog />
      <BombDetailDialog />
    </div>
  );
}
