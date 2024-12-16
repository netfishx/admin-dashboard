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
  const { startTime, endTime } = await searchParams;
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
        <MemberForm
          gameList={gameListResp?.data ?? []}
          key={`${startTime}-${endTime}`}
        />
      </Suspense>
      <Suspense
        fallback={
          <div className="p-4 bg-background flex-1">
            <div className="border rounded-sm">
              <Table>
                <ListHeader />
                <TableSkeleton length={5} colSpan={14} />
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
