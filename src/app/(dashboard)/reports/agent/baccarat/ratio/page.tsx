import { getRatioReport } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import type { PageData, RatioReportRequestRecords } from "@/lib/types";
import { Suspense } from "react";
import { RatioForm } from "./ratio-form";
import { RatioList } from "./ratio-list";
interface CommonWrapperProps {
  searchParams: Promise<RatioReportRequestRecords>;
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  const params = await searchParams;
  const { data } = await getRatioReport(params);
  return (
    <>
      <Suspense fallback={null}>
        <RatioForm />
      </Suspense>
      <Suspense fallback={<TableSkeleton length={5} />}>
        <RatioList data={data as PageData<RatioReportRequestRecords>} />
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
