"use client";
import { times } from "@/components/daterange-filter";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { TabsTypes } from "./defiend";

export default function TopTabs() {
  const t = useTranslations("report.agent");

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      <Tabs
        defaultValue={TabsTypes.RATIO}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={TabsTypes.RATIO}>
            <Link href={`/reports/agent/baccarat/ratio?tabsType=${TabsTypes.RATIO}&startTime=${times.startTime}&endTime=${times.endTime}`}>
              {t("ratioblock")}
            </Link>
          </TabsTrigger>

          <TabsTrigger value={TabsTypes.MEMBER}>
            <Link href={`/reports/agent/baccarat/member?tabsType=${TabsTypes.MEMBER}&startTime=${times.startTime}&endTime=${times.endTime}`}>
              {t("memberBetting")}
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
