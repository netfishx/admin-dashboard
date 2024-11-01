import { type ReactNode, Suspense } from "react";
import TopTabs from "./top-tabs";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TopTabs />
        {children}
      </Suspense>
    </div>
  )
}
