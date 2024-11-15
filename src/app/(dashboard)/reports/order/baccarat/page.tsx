import { getOrderReportList } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import type {
  OrderReportsRecord,
  OrderReportsRequestParams,
  PageData,
  Res,
} from "@/lib/types";
import { Suspense } from "react";
import { List } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: Promise<OrderReportsRequestParams>;
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  const params = await searchParams;
  const { data } = await getOrderReportList(params);

  return (
    <>
      <Suspense fallback={null}>
        <ListFilter />
      </Suspense>
      <Suspense fallback={<TableSkeleton length={10} />}>
        <List data={data as Res<PageData<OrderReportsRecord>>} />
      </Suspense>
    </>
  );
}

export default function Page({ searchParams }: CommonWrapperProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense>
        <CommonWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
