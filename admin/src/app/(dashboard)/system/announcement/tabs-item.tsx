"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SessionData } from "@/session";
import { addDays, endOfDay, startOfDay } from "date-fns";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { use } from "react";

export default function TabsItem({
  session,
}: {
  session: Promise<SessionData | null>;
}) {
  const t = useTranslations("system.announcement");
  const pathname = usePathname();
  const sessionData = use(session);
  const permissions = sessionData?.permissions;
  const today = new Date();
  const startTime = startOfDay(today);
  const endTime = endOfDay(addDays(today, 30));
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="gap-2 bg-background p-4">
        <Tabs defaultValue="own" value={pathname.split("/").pop()}>
          <TabsList>
            {permissions?.includes("own_announcement") && (
              <TabsTrigger value="own">
                <Link href="/system/announcement/own">
                  {t("myAnnouncement")}
                </Link>
              </TabsTrigger>
            )}
            {permissions?.includes("platform_announcement") && (
              <TabsTrigger value="platform">
                <Link
                  href={`/system/announcement/platform?startTime=${startTime.getTime()}&endTime=${endTime.getTime()}`}
                >
                  {t("allAgentAnnouncement")}
                </Link>
              </TabsTrigger>
            )}
            {permissions?.includes("super_announcement") && (
              <TabsTrigger value="all">
                <Link href="/system/announcement/all">
                  {t("notifyAnnouncement")}
                </Link>
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
