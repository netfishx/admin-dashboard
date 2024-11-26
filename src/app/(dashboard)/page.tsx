import { getTranslations } from "next-intl/server";

import { getFundList, getTodayWinLoss, getTodayWinLossChart } from "@/api";
import { getAgentAnnouncement, getAnnouncement } from "@/api";
import { Announcement } from "@/app/(dashboard)/announcement";
import { DataOverview } from "@/app/(dashboard)/data-overview";
import { QuickAccess } from "@/app/(dashboard)/quick-access";
import type { ChartConfig } from "@/components/ui/chart";
import { getSession } from "@/session";
import { TZDate } from "@date-fns/tz";
import { format, fromUnixTime } from "date-fns";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";

import { add, startOfDay, sub } from "date-fns";
import { AnnouncementDialog } from "./announcement-dialog";
import { DataOverviewFlow } from "./data-overview-flow";
import { DayChart } from "./day-chart";
import { Salutations } from "./salutations";
import { TimeWrapper } from "./time-wrapper";
import { WeekChart } from "./week-chart";

// 计算客户端所在时区时间
function timezoneOffsetToString(offset: number) {
  // getTimezoneOffset 返回的是相反数，所以要取反
  // 例如:日本是 +9:00，getTimezoneOffset 返回 -540
  const absOffset = Math.abs(offset);

  // 计算小时和分钟
  const hours = Math.floor(absOffset / 60);
  const minutes = absOffset % 60;

  // 判断正负号
  // 注意：getTimezoneOffset 返回的符号与实际时区符号相反
  const sign = offset <= 0 ? "+" : "-";

  // 格式化小时和分钟，保证是两位数
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // 返回格式化的字符串
  return `${sign}${formattedHours}:${formattedMinutes}`;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await getSession();
  const permissions = session?.permissions;
  const t = await getTranslations();
  await connection();
  const params = await searchParams;

  const now = new TZDate().withTimeZone(
    timezoneOffsetToString(Number(params?.tz)),
  );
  console.info("now-====", now);
  const start = startOfDay(now).getTime();
  const end = startOfDay(add(now, { days: 1 })).getTime();
  const oneWeekAgo = sub(start, { days: 7 }).getTime();

  const cookie = await cookies();
  const isFirstLogin = cookie?.get("isFirstLogin")?.value;

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
  gameChartData?.agentBaccaratAmountReport?.forEach(
    ({ gameName, memberBetAmount }, index) => {
      const color = Object.values(chartConfig)[index]?.color;
      bjlBetAmountData.push({
        game: gameName || "",
        data: Number(memberBetAmount),
        fill: color,
      });
    },
  );
  gameChartData?.agentBaccaratBetNumReport?.forEach(
    ({ gameName, betNum }, index) => {
      const color = Object.values(chartConfig)[index]?.color;
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
      mainData: bjlTrendingBetAmountData || [],
      subData: bjlTrendingBetNumData || [],
    },
  };
  const weekChart2Text = {
    title: t("chart.gdDataTrending"),
    tab: [t("chart.cashflow"), t("chart.headcount")],
    type: "game",
    data: {
      mainData: gdTrendingBetAmountData || [],
      subData: gdTrendingBetNumData || [],
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
      mainData: rechargeData || [],
      subData: withdrawData || [],
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
      <TimeWrapper />
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
          <Suspense>
            <WeekChart textConfig={weekChart1Text} />
          </Suspense>
        </div>
        <div className="grid gap-2 rounded bg-card p-4">
          <Suspense>
            <WeekChart textConfig={weekChart2Text} />
          </Suspense>
        </div>
        {permissions?.includes("admin_stat") && (
          <>
            <div className="grid gap-2 rounded bg-card p-4">
              <Suspense>
                <WeekChart textConfig={weekChart4Text} />
              </Suspense>
            </div>
            <div className="grid gap-2 rounded bg-card p-4">
              <Suspense>
                <WeekChart textConfig={weekChart4Text} />
              </Suspense>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 w-[280px] min-[2400px]:w-[560px]">
        {permissions?.includes("admin_stat") ? (
          <Suspense>
            <DataOverviewFlow />
          </Suspense>
        ) : (
          <Suspense>
            <DataOverview />
          </Suspense>
        )}
        <QuickAccess />
        <Suspense>
          <Announcement data={announcementOwnData || { list: [] }} />
        </Suspense>
      </div>
      <Suspense>
        <AnnouncementDialog
          data={announcementData || { list: [] }}
          isFirstLogin={isFirstLogin || "false"}
        />
      </Suspense>
    </>
  );
}
