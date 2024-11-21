import { getTranslations } from "next-intl/server";

import { getFundList, getTodayWinLoss, getTodayWinLossChart } from "@/api";
import { Announcement } from "@/app/(dashboard)/announcement";
import { DataOverview } from "@/app/(dashboard)/data-overview";
import { QuickAccess } from "@/app/(dashboard)/quick-access";
import type { ChartConfig } from "@/components/ui/chart";
import { endOfDay, format, fromUnixTime, startOfDay, sub } from "date-fns";
import { connection } from "next/server";
import { Suspense } from "react";
import { DayChart } from "./day-chart";
import { Salutations } from "./salutations";
import { WeekChart } from "./week-chart";

export default async function DashboardPage() {
  const t = await getTranslations();

  await connection();
  const now = Date.now();
  const start = startOfDay(now).getTime();
  const end = endOfDay(now).getTime();
  const oneWeekAgo = sub(start, { weeks: 1 }).getTime();

  const { data: todayWinLossData } = await getTodayWinLoss({
    startTime: start,
    endTime: end,
  });
  const { data: gameChartData } = await getTodayWinLossChart({
    startTime: oneWeekAgo,
    endTime: end,
  });
  const chartConfig = {
    bjl01: {
      color: "hsl(var(--chart-sky))",
    },
    bjl02: {
      color: "hsl(var(--chart-blue))",
    },
    bjl03: {
      color: "hsl(var(--chart-cyan))",
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
      const color = Object.values(chartConfig)[index].color;
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
  return (
    <>
      <div className="flex-1 flex flex-col gap-2">
        <Suspense fallback={null}>
          <Salutations data={todayWinLossData} />
        </Suspense>
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
        <div className="grid gap-2 rounded bg-card p-4">
          <WeekChart textConfig={weekChart4Text} />
        </div>
        <div className="grid gap-2 rounded bg-card p-4">
          <WeekChart textConfig={weekChart4Text} />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[280px] min-[2400px]:w-[560px]">
        <DataOverview />
        <QuickAccess />
        <Announcement />
      </div>
    </>
  );
}
