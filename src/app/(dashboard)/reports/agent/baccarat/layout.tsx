import { type ReactNode, Suspense } from "react";
import TopTabs from "./top-tabs";

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
