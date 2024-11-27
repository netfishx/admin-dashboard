import TableSkeleton from "@/components/table-skeleton";
import { Table } from "@/components/ui/table";
import type { MemberBetReportRequestParams } from "@/lib/types";
import { Suspense } from "react";
import { MemberForm } from "./member-form";
import { ListHeader, MemberList } from "./member-list";

interface CommonWrapperProps {
  searchParams: Promise<MemberBetReportRequestParams>;
}

export default async function Page({ searchParams }: CommonWrapperProps) {
  return (
    <>
      <Suspense>
        <MemberForm />
      </Suspense>
      <Suspense
        fallback={
          <div className="p-2 bg-background flex-1">
            <div className="border rounded-sm relative">
              <Table>
                <ListHeader />
                <TableSkeleton length={5} colSpan={15} />
              </Table>
            </div>
          </div>
        }
      >
        <MemberList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
