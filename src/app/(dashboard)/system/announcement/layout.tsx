import { getTranslations } from "next-intl/server";

import { type ReactNode, Suspense } from "react";
import { ContentModal } from "./content-modal";
import { AddModal } from "./modals/add-modal";
import TabsItem from "./tabs-item";

export default async function DashboardLayout({
  children,
}: { children: ReactNode }) {
  const t = await getTranslations("system.announcement");
  let tabsContent = [
    { label: t("notifyAnnouncement"), value: "all" },
    { label: t("myAnnouncement"), value: "own" },
  ];
  // if user is admin, show all agent announcement
  // if (user.role === "admin") {
  tabsContent = [
    { label: t("allAgentAnnouncement"), value: "all" },
    { label: t("myAnnouncement"), value: "own" },
  ];
  // }
  return (
    <div className="w-full overflow-hidden">
      <TabsItem tabsContent={tabsContent} />
      <Suspense fallback={null}>{children}</Suspense>
      <ContentModal />
      <AddModal title={t("addModal")} />
    </div>
  );
}
