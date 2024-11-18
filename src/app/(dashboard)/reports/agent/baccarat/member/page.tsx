import { Skeleton } from "@/components/ui/skeleton";
import type { MemberBetReportRequestParams } from "@/lib/types";
import { Suspense } from "react";
import { MemberForm } from "./member-form";
import { MemberList } from "./member-list";

interface CommonWrapperProps {
  searchParams: Promise<MemberBetReportRequestParams>;
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
        <MemberForm />
      </Suspense>
      <MemberList searchParams={searchParams} />
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
