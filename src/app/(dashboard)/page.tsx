import { getTranslations } from "next-intl/server";

import {
  getAnnouncement,
  getFundList,
  getMemberChartList,
  getSameOrSeniorAnno,
  getTodayFundList,
  getTodayWinLoss,
  getTodayWinLossChart,
  getUserBasicInfo,
} from "@/api";
import { Announcement } from "@/app/(dashboard)/announcement";
import { QuickAccess } from "@/app/(dashboard)/quick-access";
import type { ChartConfig } from "@/components/ui/chart";
import { getSession } from "@/session";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { cookies } from "next/headers";
import { Suspense } from "react";

import type { FundList, MemberChartList, TodayGameReport } from "@/lib/types";
import { add, startOfDay, sub } from "date-fns";
import { AnnouncementDialog } from "./announcement-dialog";
import { DataOverview } from "./data-overview";
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
  const params = await searchParams;
  const now = new TZDate().withTimeZone(
    timezoneOffsetToString(Number(params?.tz)),
  );
  const start = startOfDay(now).getTime();
  const end = startOfDay(add(now, { days: 1 })).getTime();
  const oneWeekAgo = sub(start, { days: 7 }).getTime();

  return (
    <>
      <TimeWrapper />
      <div className="flex-1 flex flex-col gap-2">
        {permissions?.includes("admin_stat") && (
          <div className="grid gap-2">
            <Suspense fallback={<div className="p-4 rounded bg-card h-24" />}>
              <SalutationsWrapper start={start} end={end} />
            </Suspense>
          </div>
        )}
        <Suspense
          fallback={
            <>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded bg-card h-40 lg:h-48 xl:h-72" />
                <div className="rounded bg-card h-40 lg:h-48 xl:h-72" />
              </div>
              <div className="grid gap-2">
                <div className="p-4 rounded bg-card h-40 lg:h-48 xl:h-72" />
                <div className="p-4 rounded bg-card h-40 lg:h-48 xl:h-72" />
              </div>
            </>
          }
        >
          <ChartWrapper start={start} end={end} oneWeekAgo={oneWeekAgo} />
        </Suspense>
      </div>
      <div className="flex flex-col gap-2 w-[280px] min-[2400px]:w-[560px]">
        {permissions?.includes("admin_stat") ? (
          <Suspense>
            <DataOverviewFlowWrapper start={start} end={end} />
          </Suspense>
        ) : (
          <Suspense>
            <DataOverviewWrapper />
          </Suspense>
        )}
        <QuickAccess />
        <Suspense>
          {/* 普通代理：上级公告， admin：本级公告  */}
          <AnnouncementWrapper />
        </Suspense>
      </div>
      <Suspense>
        {/* 普通代理：上级公告， admin：全平台 */}
        <AnnouncementDialogWrapper />
      </Suspense>
    </>
  );
}

async function SalutationsWrapper({
  start,
  end,
}: { start: number; end: number }) {
  const { data: todayWinLossData } = await getTodayWinLoss({
    startTime: start,
    endTime: end,
  });
  return <Salutations data={todayWinLossData} />;
}

async function DayChartWrapper({
  amountReport,
  betNumReport,
}: {
  amountReport: TodayGameReport["agentBaccaratAmountReport"];
  betNumReport: TodayGameReport["agentBaccaratBetNumReport"];
}) {
  const t = await getTranslations();

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
  const bjlBetAmountData: { game: string; data: number; fill: string }[] = [];
  // 今日百家乐人次
  const bjlActiveUsersData: {
    game: string;
    data: number;
    fill: string;
  }[] = [];

  amountReport?.forEach(({ gameName, memberBetAmount }, index) => {
    const color = Object.values(chartConfig)[index]?.color;
    bjlBetAmountData.push({
      game: gameName || "",
      data: Number(memberBetAmount),
      fill: color,
    });
  });
  betNumReport?.forEach(({ gameName, betNum }, index) => {
    const color = Object.values(chartConfig)[index]?.color;
    bjlActiveUsersData.push({
      game: gameName || "",
      data: Number(betNum),
      fill: color,
    });
  });
  return (
    <>
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
    </>
  );
}
async function WeekChartWrapper({
  baccaratData,
  pokerData,
  memberData,
  fundData,
}: {
  baccaratData: TodayGameReport["dailyBaccaratReport"];
  pokerData: TodayGameReport["dailyPokerReport"];
  memberData: MemberChartList;
  fundData: FundList;
}) {
  const t = await getTranslations();
  const session = await getSession();
  const permissions = session?.permissions;

  // 百家乐流水
  const bjlTrendingBetAmountData: { name: string; data: number }[] = [];
  // 百家乐人次
  const bjlTrendingBetNumData: { name: string; data: number }[] = [];
  // 掼蛋流水
  const gdTrendingBetAmountData: { name: string; data: number }[] = [];
  // 掼蛋人次
  const gdTrendingBetNumData: { name: string; data: number }[] = [];
  baccaratData?.forEach(({ day, memberBetAmount, betNum }) => {
    const formattedDay = format(day, "yyyy-MM-dd");

    bjlTrendingBetAmountData.push({
      name: formattedDay,
      data: Number(memberBetAmount),
    });

    bjlTrendingBetNumData.push({
      name: formattedDay,
      data: Number(betNum),
    });
  });

  pokerData?.forEach(({ day, totaSettledAmount, issueAmount }) => {
    const formattedDay = format(day, "yyyy-MM-dd");

    gdTrendingBetAmountData.push({
      name: formattedDay,
      data: Number(totaSettledAmount),
    });

    gdTrendingBetNumData.push({
      name: formattedDay,
      data: Number(issueAmount),
    });
  });
  // member

  const registerData: { name: string; data: number }[] = [];
  const loginData: { name: string; data: number }[] = [];
  memberData?.forEach(({ day, registerCount, loginCount }) => {
    const formattedDay = format(day, "yyyy-MM-dd");
    registerData.push({
      name: formattedDay,
      data: Number(registerCount),
    });

    loginData.push({
      name: formattedDay,
      data: Number(loginCount),
    });
  });
  // 充提

  const rechargeData: { name: string; data: number }[] = [];
  const withdrawData: { name: string; data: number }[] = [];
  fundData?.fundList?.forEach(({ day, rechargeAmount, withdrawAmount }) => {
    const formattedDay = format(day, "yyyy-MM-dd");

    rechargeData.push({
      name: formattedDay,
      data: Number(rechargeAmount),
    });

    withdrawData.push({
      name: formattedDay,
      data: Number(withdrawAmount),
    });
  });
  const weekChart1Config = {
    title: t("chart.bjlDataTrending"),
    tab: [t("chart.cashflow"), t("chart.headcount")],
    type: "game",
    data: {
      mainData: bjlTrendingBetAmountData || [],
      subData: bjlTrendingBetNumData || [],
    },
  };
  const weekChart2Config = {
    title: t("chart.gdDataTrending"),
    tab: [t("chart.cashflow"), t("chart.headcount")],
    type: "game",
    data: {
      mainData: gdTrendingBetAmountData || [],
      subData: gdTrendingBetNumData || [],
    },
  };

  const weekChart3Config = {
    title: t("chart.memberDataTrending"),
    tab: [t("chart.addMember"), t("chart.memberLoginTimes")],
    type: "member",
    data: {
      mainData: registerData || [],
      subData: loginData || [],
    },
  };
  const weekChart4Config = {
    title: t("chart.moneyDataTrending"),
    tab: [t("chart.topup"), t("chart.withdraw")],
    type: "fund",
    data: {
      mainData: rechargeData || [],
      subData: withdrawData || [],
    },
  };

  return (
    <>
      <div className="flex-1 flex flex-col gap-2">
        <div className="grid gap-2 rounded bg-card p-4">
          <Suspense>
            <WeekChart chartConfig={weekChart1Config} />
          </Suspense>
        </div>
        <div className="grid gap-2 rounded bg-card p-4">
          <Suspense>
            <WeekChart chartConfig={weekChart2Config} />
          </Suspense>
        </div>
        {permissions?.includes("admin_stat") && (
          <>
            <div className="grid gap-2 rounded bg-card p-4">
              <Suspense>
                <WeekChart chartConfig={weekChart3Config} />
              </Suspense>
            </div>
            <div className="grid gap-2 rounded bg-card p-4">
              <Suspense>
                <WeekChart chartConfig={weekChart4Config} />
              </Suspense>
            </div>
          </>
        )}
      </div>
    </>
  );
}

async function ChartWrapper({
  start,
  end,
  oneWeekAgo,
}: { start: number; end: number; oneWeekAgo: number }) {
  const { data: gameChartData } = await getTodayWinLossChart({
    startTime: start,
    endTime: end,
    beforeEndTime: oneWeekAgo,
    size: 6,
  });
  const { data: memberChartData } = await getMemberChartList({
    startTime: oneWeekAgo,
    endTime: end,
  });
  const { data: fundListData } = await getFundList({
    startTime: oneWeekAgo,
    endTime: end,
  });

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <DayChartWrapper
          amountReport={gameChartData?.agentBaccaratAmountReport || []}
          betNumReport={gameChartData?.agentBaccaratBetNumReport || []}
        />
      </div>
      <WeekChartWrapper
        baccaratData={gameChartData.dailyBaccaratReport || []}
        pokerData={gameChartData.dailyPokerReport || []}
        memberData={memberChartData || []}
        fundData={fundListData || { fundList: [] }}
      />
    </>
  );
}

async function DataOverviewFlowWrapper({
  start,
  end,
}: { start: number; end: number }) {
  const { data } = await getTodayFundList({
    startTime: start,
    endTime: end,
  });
  return (
    <DataOverviewFlow
      data={
        data || {
          rechargeAmount: 0,
          withdrawAmount: 0,
          creditAmount: 0,
          lendAmount: 0,
        }
      }
    />
  );
}

async function DataOverviewWrapper() {
  const { data } = await getUserBasicInfo();
  return (
    <DataOverview
      data={
        data || {
          totalBalanceMoney: 0,
          usableBalanceMoney: 0,
          gameFreezeMoney: 0,
          withdrawFreezeMoney: 0,
          totalCreditMoney: 0,
          memberToBeRepaidMoney: 0,
        }
      }
    />
  );
}

async function AnnouncementWrapper() {
  const session = await getSession();
  const permissions = session?.permissions;
  //  // 右下角：
  // 普通代理：上级公告， admin：本级公告
  const { data: announcementSubData } = permissions?.includes("admin_stat")
    ? await getSameOrSeniorAnno({
        pageSize: 5,
        pageNum: 1,
        level: 0,
      })
    : await getSameOrSeniorAnno({
        pageSize: 5,
        pageNum: 1,
        level: 1,
      });
  return <Announcement data={announcementSubData || { list: [] }} />;
}

async function AnnouncementDialogWrapper() {
  const session = await getSession();
  const permissions = session?.permissions;
  const cookie = await cookies();
  const isFirstLogin = cookie?.get("isFirstLogin")?.value;

  // 弹窗：
  // 普通代理：上级公告， admin：全平台
  const { data: announcementData } = permissions?.includes("admin_stat")
    ? await getAnnouncement({
        pageSize: 5,
        pageNum: 1,
      })
    : await getSameOrSeniorAnno({
        pageSize: 5,
        pageNum: 1,
        level: 1,
      });

  return (
    <AnnouncementDialog
      data={announcementData || { list: [] }}
      isFirstLogin={isFirstLogin || "false"}
    />
  );
}
