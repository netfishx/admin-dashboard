import { getMemberReportList } from "@/api";
import type { MemberReportsRecord, PageData, Res } from "@/lib/types";
import { Suspense } from "react";
import { List } from "./list";
import { ListFilter } from "./list-filter";

interface CommonWrapperProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  const s = await searchParams;
  let params = {};
  let res = {};
  if (s.startTime && s.endTime) {
    const { data } = await getMemberReportList(params);
    res = data || ({} as Res<PageData<MemberReportsRecord>>);
  } else {
    params = {
      openStartTime: Number.parseInt(s.startTime as string, 10),
      openEndTime: Number.parseInt(s.endTime as string, 10),
    };
    const { data } = await getMemberReportList(params);
    res = data || ({} as Res<PageData<MemberReportsRecord>>);
  }

  return (
    <>
      <ListFilter />
      <List data={res as Res<PageData<MemberReportsRecord>>} />
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
