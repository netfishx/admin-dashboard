import { getUserBasicInfo } from "@/api";
import type { UserBasicInfo } from "@/lib/types";
import { Suspense, use } from "react";
import { Detail } from "./detail";
import { Form } from "./form";

function CommonWrapper() {
  const { data } = use(getUserBasicInfo());
  return (
    <>
      <Form data={data || ({} as UserBasicInfo)} />
      <Detail data={data || ({} as UserBasicInfo)} />
    </>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <Suspense fallback={<div>loading...</div>}>
        <CommonWrapper />
      </Suspense>
    </div>
  );
}
