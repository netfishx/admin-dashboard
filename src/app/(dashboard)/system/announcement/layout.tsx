import { type ReactNode, Suspense } from "react";
import { AddModal } from "./add-modal";
import { ContentModal } from "./content-modal";

import TabsItem from "./tabs-item";

export default async function DashboardLayout({
  children,
}: { children: ReactNode }) {
  return (
    <div className="w-full overflow-hidden">
      <TabsItem />
      <Suspense fallback={null}>{children}</Suspense>
      <ContentModal />
      <AddModal />
    </div>
  );
}
