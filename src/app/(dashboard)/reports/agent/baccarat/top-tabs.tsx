"use client";
import { times } from "@/components/daterange-filter";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { TabsTypes } from "./defiend";

export default function TopTabs() {
  const t = useTranslations("report.agent");
  const [currentTab, setCurrentTab] = useState(TabsTypes.RATIO);

  const getTabStyle = (tabType: TabsTypes) => {
    return cn(
      // 基础样式
      "flex items-center justify-center cursor-pointer text-l",
      // 条件样式
      currentTab === tabType ? "bg-card text-foreground" : "hover:bg-secondary",
    );
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      <Tabs defaultValue={TabsTypes.RATIO} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            className={getTabStyle(TabsTypes.RATIO)}
            onClick={() => setCurrentTab(TabsTypes.RATIO)}
          >
            <Link
              href={`/reports/agent/baccarat/ratio?tabsType=${TabsTypes.RATIO}&startTime=${times.startTime}&endTime=${times.endTime}`}
            >
              {t("ratioblock")}
            </Link>
          </div>

          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            className={getTabStyle(TabsTypes.MEMBER)}
            onClick={() => setCurrentTab(TabsTypes.MEMBER)}
          >
            <Link
              href={`/reports/agent/baccarat/member?tabsType=${TabsTypes.MEMBER}&startTime=${times.startTime}&endTime=${times.endTime}`}
            >
              {t("memberBetting")}
            </Link>
          </div>
        </TabsList>
      </Tabs>
    </div>
  );
}
