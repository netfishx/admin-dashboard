import { getTranslations } from "next-intl/server";

import { getFundList, getTodayWinLoss, getTodayWinLossChart } from "@/api";
import { getAgentAnnouncement, getAnnouncement } from "@/api";
import { Announcement } from "@/app/(dashboard)/announcement";
import { DataOverview } from "@/app/(dashboard)/data-overview";
import { QuickAccess } from "@/app/(dashboard)/quick-access";
import type { ChartConfig } from "@/components/ui/chart";
import { getSession } from "@/session";
import { endOfDay, format, fromUnixTime, startOfDay, sub } from "date-fns";
import { connection } from "next/server";
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
  await connection();
  const now = Date.now();
  const start = startOfDay(now).getTime();
  const end = endOfDay(now).getTime();
  const oneWeekAgo = sub(start, { weeks: 1 }).getTime();
  // const isFirstLogin = session?.isFirstLogin as boolean;
  const isFirstLogin = false;

  const { data: todayWinLossData } = await getTodayWinLoss({
    startTime: start,
    endTime: end,
  });
  const { data: gameChartData } = await getTodayWinLossChart({
    startTime: start,
    endTime: end,
    beforeEndTime: oneWeekAgo,
    size: 6,
  });
  const chartConfig = {
    bjl01: {
      color: "hsl(var(--chart-1))",
    },
    bjl02: {
      color: "hsl(var(--chart-2))",
    },
    bjl03: {
      color: "hsl(var(--chart-3))",
    },
    bjl04: {
      color: "hsl(var(--chart-4))",
    },
    bjl05: {
      color: "hsl(var(--chart-5))",
    },
    bjl06: {
      color: "hsl(var(--chart-6))",
    },
  } satisfies ChartConfig;

  // 今日百家乐流水
  const bjlBetAmountData: Array<{ game: string; data: number; fill: string }> =
    [];
  // 今日百家乐人次
  const bjlActiveUsersData: Array<{
    game: string;
    data: number;
    fill: string;
  }> = [];
  // 百家乐流水
  const bjlTrendingBetAmountData: Array<{ name: string; data: number }> = [];
  // 百家乐人次
  const bjlTrendingBetNumData: Array<{ name: string; data: number }> = [];
  // 掼蛋流水
  const gdTrendingBetAmountData: Array<{ name: string; data: number }> = [];
  // 掼蛋人次
  const gdTrendingBetNumData: Array<{ name: string; data: number }> = [];
  gameChartData?.agentBaccaratIssueReport?.forEach(
    ({ gameName, memberBetAmount, betNum }, index) => {
      const color = Object.values(chartConfig)[index]?.color;
      bjlBetAmountData.push({
        game: gameName || "",
        data: Number(memberBetAmount),
        fill: color,
      });

      bjlActiveUsersData.push({
        game: gameName || "",
        data: Number(betNum),
        fill: color,
      });
    },
  );

  gameChartData?.dailyBaccaratReport?.forEach(
    ({ day, memberBetAmount, betNum }) => {
      const formattedDay = format(fromUnixTime(day / 1000), "yyyy-MM-dd");

      bjlTrendingBetAmountData.push({
        name: formattedDay,
        data: Number(memberBetAmount),
      });

      bjlTrendingBetNumData.push({
        name: formattedDay,
        data: Number(betNum),
      });
    },
  );

  gameChartData?.dailyPokerReport?.forEach(
    ({ day, totaSettledAmount, issueAmount }) => {
      const formattedDay = format(fromUnixTime(day / 1000), "yyyy-MM-dd");

      gdTrendingBetAmountData.push({
        name: formattedDay,
        data: Number(totaSettledAmount),
      });

      gdTrendingBetNumData.push({
        name: formattedDay,
        data: Number(issueAmount),
      });
    },
  );

  // 充提
  const { data: fundListData } = await getFundList({
    startTime: oneWeekAgo,
    endTime: end,
  });
  const rechargeData: Array<{ name: string; data: number }> = [];
  const withdrawData: Array<{ name: string; data: number }> = [];
  fundListData?.fundList?.forEach(({ day, rechargeAmount, withdrawAmount }) => {
    const formattedDay = format(fromUnixTime(day / 1000), "yyyy-MM-dd");

    rechargeData.push({
      name: formattedDay,
      data: Number(rechargeAmount),
    });

    withdrawData.push({
      name: formattedDay,
      data: Number(withdrawAmount),
    });
  });

  const weekChart1Text = {
    title: t("chart.bjlDataTrending"),
    tab: [t("chart.cashflow"), t("chart.headcount")],
    type: "game",
    data: {
      betAmountData: bjlTrendingBetAmountData || [],
      betNumData: bjlTrendingBetNumData || [],
    },
  };
  const weekChart2Text = {
    title: t("chart.gdDataTrending"),
    tab: [t("chart.cashflow"), t("chart.headcount")],
    type: "game",
    data: {
      betAmountData: gdTrendingBetAmountData || [],
      betNumData: gdTrendingBetNumData || [],
    },
  };

  const weekChart3Text = {
    title: t("chart.memberDataTrending"),
    tab: [t("chart.addMember"), t("chart.memberLoginTimes")],
    type: "member",
    data: [],
  };
  const weekChart4Text = {
    title: t("chart.moneyDataTrending"),
    tab: [t("chart.topup"), t("chart.withdraw")],
    type: "fund",
    data: {
      rechargeData: rechargeData || [],
      withdrawData: withdrawData || [],
    },
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
            <Salutations data={todayWinLossData} />
          </Suspense>
        )}
        <div className="grid grid-cols-2 gap-2">
          <DayChart
            title={t("chart.todayCashflow")}
            subTitle={t("chart.bettingAmount")}
            data={bjlBetAmountData || []}
            chartConfig={chartConfig}
          />
          <DayChart
            title={t("chart.todayActiveUsers")}
            subTitle={t("chart.bettingTimes")}
            data={bjlActiveUsersData || []}
            chartConfig={chartConfig}
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
        {/* 代理 */}
        {!permissions?.includes("admin_stat") && <DataOverview />}
        {/* admin */}
        {permissions?.includes("admin_stat") && <DataOverviewFlow />}
        <QuickAccess />
        <Announcement data={announcementOwnData || { list: [] }} />
      </div>
      <AnnouncementDialog
        data={announcementData || { list: [] }}
        isFirstLogin={isFirstLogin}
      />
    </>
  );
}
