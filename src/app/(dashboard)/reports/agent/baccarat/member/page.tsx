import { getBaccaratGames } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import type { MemberBetReportRequestParams } from "@/lib/types";
import { Suspense } from "react";
import { MemberForm } from "./member-form";
import { ListHeader, MemberList } from "./member-list";

interface CommonWrapperProps {
  searchParams: Promise<MemberBetReportRequestParams>;
}

export default async function Page({ searchParams }: CommonWrapperProps) {
  const gameListResp = await getBaccaratGames();
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-between bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <MemberForm gameList={gameListResp?.data ?? []} />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex-1 bg-background p-2">
            <div className="relative rounded-sm border">
              <Table>
                <ListHeader />
                <TableSkeleton length={5} colSpan={11} />
              </Table>
            </div>
          </div>
        }
      >
        <MemberList
          searchParams={searchParams}
          gameList={gameListResp?.data ?? []}
        />
      </Suspense>
    </>
  );
}
