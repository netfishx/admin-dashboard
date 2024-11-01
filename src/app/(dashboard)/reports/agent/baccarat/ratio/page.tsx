
import { Suspense } from "react";
import RatioForm from "./ratio-form";
import RatioList from "./ratio-list";

export default async function Page({ searchParams }: any) {
  // const params = await searchParams;
  // const data = await agentBaccaratReport(params);
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* 占成拦货 */}
      <RatioForm />
      <Suspense fallback={null}>
        <RatioList />
      </Suspense>
    </div>
  );
}
