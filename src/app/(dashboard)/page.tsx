import { getAgentAnnouncement, getAnnouncement } from "@/api";
import { Announcement } from "@/app/(dashboard)/announcement";
import { DataOverview } from "@/app/(dashboard)/data-overview";
import { QuickAccess } from "@/app/(dashboard)/quick-access";
import { getSession } from "@/session";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { AnnouncementDialog } from "./announcement-dialog";
import { DataOverviewFlow } from "./data-overview-flow";
import { DayChart } from "./day-chart";
import { Salutations } from "./salutations";
import { WeekChart } from "./week-chart";

export default async function DashboardPage() {
  const session = await getSession();
  const permissions = session?.permissions;
  const t = await getTranslations();

  const cookie = await cookies();
  const isFirstLogin = cookie?.get("isFirstLogin")?.value;

  const weekChart1Text = {
    title: t("chart.bjlDataTrending"),
    tab: [t("chart.cashflow"), t("chart.headcount")],
    type: "bjl",
  };
  const weekChart2Text = {
    title: t("chart.gdDataTrending"),
    tab: [t("chart.cashflow"), t("chart.headcount")],
    type: "gd",
  };

  const weekChart3Text = {
    title: t("chart.memberDataTrending"),
    tab: [t("chart.addMember"), t("chart.memberLoginTimes")],
    type: "member",
  };
  const weekChart4Text = {
    title: t("chart.moneyDataTrending"),
    tab: [t("chart.topup"), t("chart.withdraw")],
    type: "fund",
  };
  const { data: announcementOwnData } = await getAgentAnnouncement({
    pageSize: 5,
    pageNum: 1,
    level: 0,
  });
  const { data: announcementData } = await getAnnouncement({
    pageSize: 5,
    pageNum: 1,
  });

  return (
    <>
      <div className="flex-1 flex flex-col gap-2">
        {permissions?.includes("admin_stat") && (
          <Suspense>
            <Salutations />
          </Suspense>
        )}
        <div className="grid grid-cols-2 gap-2">
          <DayChart
            title={t("chart.todayCashflow")}
            subTitle={t("chart.bettingAmount")}
            type={0}
          />
          <DayChart
            title={t("chart.todayActiveUsers")}
            subTitle={t("chart.bettingTimes")}
            type={1}
          />
        </div>
        <div className="grid gap-2 rounded bg-card p-4">
          <WeekChart textConfig={weekChart1Text} />
        </div>
        <div className="grid gap-2 rounded bg-card p-4">
          <WeekChart textConfig={weekChart2Text} />
        </div>
        {permissions?.includes("admin_stat") && (
          <>
            <div className="grid gap-2 rounded bg-card p-4">
              <WeekChart textConfig={weekChart4Text} />
            </div>
            <div className="grid gap-2 rounded bg-card p-4">
              <WeekChart textConfig={weekChart4Text} />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 w-[280px] min-[2400px]:w-[560px]">
        {permissions?.includes("admin_stat") ? (
          <DataOverviewFlow />
        ) : (
          <DataOverview />
        )}
        <QuickAccess />
        <Announcement data={announcementOwnData || { list: [] }} />
      </div>
      <AnnouncementDialog
        data={announcementData || { list: [] }}
        isFirstLogin={isFirstLogin || "false"}
      />
    </>
  );
}
