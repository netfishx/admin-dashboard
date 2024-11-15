import { getPokerReport } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import type {
  PageData,
  PokerReportRequestParams,
  PokerReportRequestRecords,
} from "@/lib/types";
import { Suspense } from "react";
import { List } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: Promise<PokerReportRequestParams>;
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  const params = await searchParams;
  const { data } = await getPokerReport(params);
  return (
    <>
      <Suspense fallback={null}>
        <ListFilter />
      </Suspense>
      <Suspense fallback={<TableSkeleton length={5} />}>
        <List data={data as PageData<PokerReportRequestRecords>} />
      </Suspense>
    </>
  );
}

export default function Page({ searchParams }: CommonWrapperProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={null}>
        <CommonWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
