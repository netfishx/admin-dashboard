import TableSkeleton from "@/components/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import type { CollectionAddressListRequestParams } from "@/lib/types";
import { Suspense } from "react";
import { Form } from "./form";
import { List, ListHeader } from "./list";

interface CommonWrapperProps {
  searchParams: Promise<CollectionAddressListRequestParams>;
}

export default async function Page({ searchParams }: CommonWrapperProps) {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <Form />
      </Suspense>
      <Suspense
        fallback={
          <Table>
            <ListHeader />
            <TableSkeleton length={5} colSpan={15} />
          </Table>
        }
      >
        <List searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
