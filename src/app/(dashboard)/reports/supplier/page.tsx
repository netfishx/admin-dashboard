import { getSupplierReportList } from "@/api";
import type { PageData, SupplierReportListItem } from "@/lib/types";
import { Suspense, use } from "react";
import { List } from "./list";
import { ListFilter } from "./list-filter";

function CommonWrapper() {
  const { data } = use(getSupplierReportList());
  return (
    <>
      <ListFilter />
      <List data={data || ({} as PageData<SupplierReportListItem>)} />
    </>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={<div>loading...</div>}>
        <CommonWrapper />
      </Suspense>
    </div>
  );
}
