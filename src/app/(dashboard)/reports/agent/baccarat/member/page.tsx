import { Suspense } from "react";
import { MemberForm } from "./member-form";
import { MemberList } from "./member-list";

export default async function Page({ searchParams }: { searchParams: any }) {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      {/* 会员下注 */}
      <MemberForm />
      <Suspense fallback={<div>loading...</div>}>
        <MemberList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
