import TopTabs from "@/app/(dashboard)/reports/agent/baccarat/top-tabs";
import { type ReactNode, Suspense } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="flex flex-col gap-2 w-full h-full">
        <TopTabs />
        {children}
      </div>
    </Suspense>
  );
}
