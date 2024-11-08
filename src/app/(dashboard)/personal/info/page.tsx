import { Suspense } from "react";
import { Detail } from "./detail";
import { Form } from "./form";

export default async function Page({ searchParams }: { searchParams: any }) {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <Form />
      <Suspense fallback={<div>loading...</div>}>
        <Detail searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
