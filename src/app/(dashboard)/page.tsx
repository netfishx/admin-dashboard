import { useTranslations } from "next-intl";

import { Announcement } from "@/app/(dashboard)/announcement";
import { DataOverview } from "@/app/(dashboard)/data-overview";
import { DayChart } from "@/app/(dashboard)/day-chart";
import { QuickAccess } from "@/app/(dashboard)/quick-access";
import { Salutations } from "@/app/(dashboard)/salutations";
import { WeekChart } from "@/app/(dashboard)/week-chart";

export default function DashboardPage() {
  const t = useTranslations();
  const userInfo = {
    name: "张三",
    data: {
      value1: 111111,
      value2: 222222,
      value3: 333333,
      value4: 444444,
    },
  };
  const weekChart1Text = {
    title: t("chart.bjlDataTrending"),
    tab: [t("chart.cashflow"), t("chart.headcount")],
    data: [
      {
        name: "2024-10-21",
        data: 4000,
      },
      {
        name: "2024-10-22",
        data: 32000,
      },
      {
        name: "2024-10-23",
        data: 20000,
      },
      {
        name: "2024-10-24",
        data: 42780,
      },
      {
        name: "2024-10-25",
        data: 1890,
      },
      {
        name: "2024-10-26",
        data: 52390,
      },
      {
        name: "2024-10-27",
        data: 3490,
      },
    ],
  };
  const weekChart2Text = {
    title: t("chart.gdDataTrending"),
    tab: [t("chart.cashflow"), t("chart.headcount")],
    data: [
      {
        name: "2024-10-21",
        data: 4000,
      },
      {
        name: "2024-10-22",
        data: 32000,
      },
      {
        name: "2024-10-23",
        data: 20000,
      },
      {
        name: "2024-10-24",
        data: 42780,
      },
      {
        name: "2024-10-25",
        data: 1890,
      },
      {
        name: "2024-10-26",
        data: 52390,
      },
      {
        name: "2024-10-27",
        data: 3490,
      },
    ],
  };
  const weekChart3Text = {
    title: t("chart.memberDataTrending"),
    tab: [t("chart.addMember"), t("chart.memberLoginTimes")],
    data: [
      {
        name: "2024-10-21",
        data: 4000,
      },
      {
        name: "2024-10-22",
        data: 32000,
      },
      {
        name: "2024-10-23",
        data: 20000,
      },
      {
        name: "2024-10-24",
        data: 42780,
      },
      {
        name: "2024-10-25",
        data: 1890,
      },
      {
        name: "2024-10-26",
        data: 52390,
      },
      {
        name: "2024-10-27",
        data: 3490,
      },
    ],
  };
  const weekChart4Text = {
    title: t("chart.moneyDataTrending"),
    tab: [t("chart.topup"), t("chart.withdraw")],
    data: [
      {
        name: "2024-10-21",
        data: 4000,
      },
      {
        name: "2024-10-22",
        data: 32000,
      },
      {
        name: "2024-10-23",
        data: 20000,
      },
      {
        name: "2024-10-24",
        data: 42780,
      },
      {
        name: "2024-10-25",
        data: 1890,
      },
      {
        name: "2024-10-26",
        data: 52390,
      },
      {
        name: "2024-10-27",
        data: 3490,
      },
    ],
  };
  return (
    <>
      <div className="flex-1 flex flex-col gap-2">
        <Salutations user={userInfo} />
        <div className="grid grid-cols-2 gap-2">
          <DayChart title={t("chart.todayCashflow")} />
          <DayChart title={t("chart.todayActiveUsers")} />
        </div>
        <div className="grid gap-2 rounded bg-card p-4">
          <WeekChart textConfig={weekChart1Text} />
        </div>
        <div className="grid gap-2 rounded bg-card p-4">
          <WeekChart textConfig={weekChart2Text} />
        </div>
        <div className="grid gap-2 rounded bg-card p-4">
          <WeekChart textConfig={weekChart3Text} />
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
