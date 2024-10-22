import { useTranslations } from "next-intl";
import Announcement from "./announcement";
import DataOverview from "./data-overview";
import DayChart from "./day-chart";
import QuickAccess from "./quick-access";
import { Salutations } from "./salutations";

export default function DashboardPage() {
  const t = useTranslations();
  const userInfo = {
    name: "张三",
    data: {
      value1: 1,
      value2: 2,
      value3: 3,
      value4: 4,
    },
  };
  return (
    <>
      <div className="flex-1 flex flex-col h-full gap-2">
        <Salutations user={userInfo} />
        <div className="grid grid-cols-2 gap-2">
          <DayChart title={t("chart.todayCashflow")} />
          <DayChart title={t("chart.todayActiveUsers")} />
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
