import { Skeleton } from "@/components/ui/skeleton";
import type { CollectionAddressListRequestParams } from "@/lib/types";
import { Suspense } from "react";
import { Form } from "./form";
import { List } from "./list";

interface CommonWrapperProps {
  searchParams: Promise<CollectionAddressListRequestParams>;
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
        <Form />
      </Suspense>
      <List searchParams={searchParams} />
    </>
  );
}

export default async function Page({ searchParams }: CommonWrapperProps) {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <CommonWrapper searchParams={searchParams} />
    </div>
  );
}
