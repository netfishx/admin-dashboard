import { getCollectionAddressList } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import type {
  CollectionAddressListRecords,
  CollectionAddressListRequestParams,
} from "@/lib/types";
import { Suspense } from "react";
import { Form } from "./form";
import { List } from "./list";

interface CommonWrapperProps {
  searchParams: Promise<CollectionAddressListRequestParams>;
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  const params = await searchParams;
  const { data } = await getCollectionAddressList(params);
  return (
    <>
      <Suspense fallback={null}>
        <Form />
      </Suspense>
      <Suspense fallback={<TableSkeleton length={5} />}>
        <List data={data as CollectionAddressListRecords[]} />
      </Suspense>
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
