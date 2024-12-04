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

export default function Page({ searchParams }: CommonWrapperProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <ListFilterWrapper />
      </Suspense>
      <Suspense
        fallback={
          <div className="p-2 bg-background flex-1">
            <div className="border rounded-sm relative">
              <Table>
                <ListHeader />
                <TableSkeleton length={5} colSpan={6} />
              </Table>
            </div>
          </div>
        }
      >
        <List searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
