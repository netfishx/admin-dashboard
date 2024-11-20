import { Skeleton } from "@/components/ui/skeleton";
import type { MemberReportRequestParams } from "@/lib/types";
import { Suspense } from "react";
import { List } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: Promise<MemberReportRequestParams>;
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background p-4">
            <Skeleton className="w-full h-9 opacity-20" />
          </div>
        }
      >
        <ListFilter />
      </Suspense>
      <List searchParams={searchParams} />
    </>
  );
}

export default function Page({ searchParams }: CommonWrapperProps) {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <CommonWrapper searchParams={searchParams} />
    </div>
  );
}
