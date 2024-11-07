import { Suspense } from "react";
import { Form } from "./form";
import { List } from "./list";

export default async function Page({ searchParams }: { searchParams: any }) {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      {/* 会员下注 */}
      <Form />
      <Suspense fallback={<div>loading...</div>}>
        <List searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
