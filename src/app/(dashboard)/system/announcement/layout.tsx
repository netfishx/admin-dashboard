import { getTranslations } from "next-intl/server";
import { type ReactNode, Suspense } from "react";
import TabsItem from "./tabs-item";

export default async function DashboardLayout({
  children,
}: { children: ReactNode }) {
  const t = await getTranslations("system.announcement");
  const tabsContent = [
    { label: t("notifyAnnouncement"), value: "all" },
    { label: t("myAnnouncement"), value: "own" },
  ];
  // const tabsContent1 = [
  //   { label: t("allAgentAnnouncement"), value: "0" },
  //   { label: t("platformAnnouncement"), value: "1" },
  // ];
  return (
    <div className="w-full overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <TabsItem tabsContent={tabsContent} />
        {children}
      </Suspense>
    </div>
  );
}
