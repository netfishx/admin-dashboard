import { getMemberReportList } from "@/api";
import type {
  MemberReportRequestParams,
  MemberReportsRecord,
  PageData,
} from "@/lib/types";
import { Suspense } from "react";
import { List } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: Promise<MemberReportRequestParams>;
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  const params = await searchParams;
  const { data } = await getMemberReportList(params);
  return (
    <>
      <ListFilter />
      <List data={data as PageData<MemberReportsRecord>} />
    </>
  );
}

export default function Page({ searchParams }: CommonWrapperProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={<div>loading...</div>}>
        <CommonWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
