"use client";

import { Tabs, TabsList } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

export default function TopTabs() {
  const t = useTranslations("report.agent");
  const pathname = usePathname();
  return (
    <div className="bg-background flex flex-col gap-2 p-4">
      <Tabs className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <Link
            data-state={
              pathname === "/reports/agent/baccarat/ratio"
                ? "active"
                : "inactive"
            }
            href="/reports/agent/baccarat/ratio"
            className="focus-visible:outline-hidden focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm"
          >
            {t("ratioblock")}
          </Link>

          <Link
            data-state={
              pathname === "/reports/agent/baccarat/member"
                ? "active"
                : "inactive"
            }
            href="/reports/agent/baccarat/member"
            className="focus-visible:outline-hidden focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm"
          >
            {t("memberBetting")}
          </Link>
        </TabsList>
      </Tabs>
    </div>
  );
}
