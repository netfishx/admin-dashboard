import { getMemberBetReport } from "@/api";
import TableSkeleton from "@/components/table-skeleton";
import type {
  MemberBetReportRequestParams,
  MemberBetReportRequestRecords,
  PageData,
} from "@/lib/types";
import { Suspense } from "react";
import { MemberForm } from "./member-form";
import { MemberList } from "./member-list";

interface CommonWrapperProps {
  searchParams: Promise<MemberBetReportRequestParams>;
}

async function CommonWrapper({ searchParams }: CommonWrapperProps) {
  const params = await searchParams;
  const { data } = await getMemberBetReport(params);
  return (
    <>
      <Suspense fallback={null}>
        <MemberForm />
      </Suspense>
      <Suspense fallback={<TableSkeleton length={5} />}>
        <MemberList data={data as PageData<MemberBetReportRequestRecords>} />
      </Suspense>
    </>
  );
}

export default async function Page({ searchParams }: CommonWrapperProps) {
  return (
    <Suspense fallback={null}>
      <CommonWrapper searchParams={searchParams} />
    </Suspense>
  );
}
