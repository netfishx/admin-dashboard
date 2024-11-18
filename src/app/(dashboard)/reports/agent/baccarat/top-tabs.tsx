"use client";
import { TabsTypes } from "@/app/(dashboard)/reports/agent/baccarat/defiend";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export default function TopTabs() {
  const t = useTranslations("report.agent");
  const [currentTab, setCurrentTab] = useState(TabsTypes.RATIO);

  const getTabStyle = (tabType: TabsTypes) => {
    return cn(
      // 基础样式
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full",
      // 条件样式
      currentTab === tabType
        ? "bg-card text-foreground shadow"
        : "hover:bg-secondary",
    );
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      <Tabs defaultValue={TabsTypes.RATIO} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <Link href="/reports/agent/baccarat/ratio">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              className={getTabStyle(TabsTypes.RATIO)}
              onClick={() => setCurrentTab(TabsTypes.RATIO)}
            >
              {t("ratioblock")}
            </div>
          </Link>

          <Link href="/reports/agent/baccarat/member">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              className={getTabStyle(TabsTypes.MEMBER)}
              onClick={() => setCurrentTab(TabsTypes.MEMBER)}
            >
              {t("memberBetting")}
            </div>
          </Link>
        </TabsList>
      </Tabs>
    </div>
  );
}
