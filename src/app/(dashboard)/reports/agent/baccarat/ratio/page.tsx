import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import type { RatioReportRequestRecords } from "@/lib/types";
import { Suspense } from "react";
import { RatioForm } from "./ratio-form";
import { RatioList } from "./ratio-list";
interface CommonWrapperProps {
  searchParams: Promise<RatioReportRequestRecords>;
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
        <RatioForm />
      </Suspense>
      <Suspense fallback={<TableSkeleton length={5} colSpan={11} />}>
        <RatioList searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export default async function Page({ searchParams }: CommonWrapperProps) {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <Suspense fallback={null}>
        <CommonWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
