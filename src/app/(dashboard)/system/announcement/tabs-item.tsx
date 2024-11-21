"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TabsItem() {
  const t = useTranslations("system.announcement");
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="p-2 bg-background gap-2">
        <Tabs defaultValue="platform" value={pathname.split("/").pop()}>
          <TabsList>
            <TabsTrigger value="platform">
              <Link href="/system/announcement/platform">
                {t("allAgentAnnouncement")}
              </Link>
            </TabsTrigger>
            <TabsTrigger value="all">
              <Link href="/system/announcement/all">
                {t("notifyAnnouncement")}
              </Link>
            </TabsTrigger>
            <TabsTrigger value="own">
              <Link href="/system/announcement/own">{t("myAnnouncement")}</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
