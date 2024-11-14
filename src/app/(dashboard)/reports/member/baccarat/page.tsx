import { getMemberReportList } from "@/api";
import type { MemberReportsRecord, PageData, Res } from "@/lib/types";
import { Suspense, use } from "react";
import { List } from "./list";
import { ListFilter } from "./list-filter";

function CommonWrapper() {
  const { data } = use(getMemberReportList());
  console.log(data, "data");

  return (
    <>
      <ListFilter />
      <List data={data || ({} as Res<PageData<MemberReportsRecord>>)} />
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
