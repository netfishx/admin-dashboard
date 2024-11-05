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

  return (
    <div className="w-full overflow-hidden">
      <TabsItem tabsContent={tabsContent} />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
