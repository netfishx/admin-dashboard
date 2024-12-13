import TopTabs from "@/app/(dashboard)/reports/agent/baccarat/top-tabs";
import { type ReactNode, Suspense } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <TopTabs />
      <Suspense>{children}</Suspense>
    </div>
  );
}
