import { getSupplierReportList } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import type {
  PageData,
  SupplierReportRecords,
  SupplierReportRequestParams,
} from "@/lib/types";
import { hasPermission } from "@/session";
import { Suspense } from "react";
import { List } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: Promise<SupplierReportRequestParams>;
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  const params = await searchParams;
  const { data } = await getSupplierReportList(params);
  const hasSearchPermission = await hasPermission("admin_supplier_report");
  return (
    <>
      <Suspense fallback={null}>
        <ListFilter hasSearchPermission={hasSearchPermission} />
      </Suspense>
      <Suspense fallback={<TableSkeleton length={5} />}>
        <List data={data || ({} as PageData<SupplierReportRecords>)} />
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
