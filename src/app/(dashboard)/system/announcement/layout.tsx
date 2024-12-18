import { getSession } from "@/session";
import { type ReactNode, Suspense } from "react";
import { AddModal } from "./add-modal";

import TabsItem from "./tabs-item";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full">
      <Suspense>
        <TabsItem session={getSession()} />
      </Suspense>
      <Suspense>{children}</Suspense>
      <AddModal session={getSession()} />
    </div>
  );
}
