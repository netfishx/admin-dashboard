import { Skeleton } from "@/components/ui/skeleton";
import type { TransferRecordRequestParams } from "@/lib/types";
import { hasPermission } from "@/session";
import { Suspense } from "react";
import { List } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: Promise<TransferRecordRequestParams>;
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  const hasSearchPermission = await hasPermission("admin_supplier_report");
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background p-4">
            <Skeleton className="w-full h-9 opacity-20" />
          </div>
        }
      >
        <ListFilter hasSearchPermission={hasSearchPermission} />
      </Suspense>
      <List searchParams={searchParams} />
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
