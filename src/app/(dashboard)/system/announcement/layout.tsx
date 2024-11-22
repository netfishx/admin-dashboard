import { type ReactNode, Suspense } from "react";
import { AddModal } from "./add-modal";
import { ContentModal } from "./content-modal";

import { getSession } from "@/session";
import TabsItem from "./tabs-item";

export default async function DashboardLayout({
  children,
}: { children: ReactNode }) {
  return (
    <div className="w-full">
      <Suspense>
        <TabsItem session={getSession()} />
      </Suspense>
      <Suspense>{children}</Suspense>
      <ContentModal />
      <AddModal />
    </div>
  );
}
