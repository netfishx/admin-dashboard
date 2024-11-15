import type { CollectionAddressListRequestParams } from "@/lib/types";
import { Suspense } from "react";
import { Form } from "./form";
import { List } from "./list";

interface CommonWrapperProps {
  searchParams: Promise<CollectionAddressListRequestParams>;
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  const search = await searchParams;
  return (
    <>
      <Suspense fallback={null}>
        <Form />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <List searchParams={search} />
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
