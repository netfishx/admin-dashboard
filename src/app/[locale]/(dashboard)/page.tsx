import Announcement from "./announcement";
import DataOverview from "./data-overview";
import DayChart from "./day-chart";
import QuickAccess from "./quick-access";
import Salutations from "./salutations";
import { useTranslations } from "next-intl";

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
      <div className="w-full flex flex-col h-full gap-2">
        <Salutations user={userInfo} />
        <div className="flex gap-2">
          <DayChart title={(t("chart.todayCashflow"))} />
          <DayChart title={(t("chart.todayActiveUsers"))}/>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[280px]">
        <DataOverview />
        <QuickAccess />
        <Announcement />
      </div>
    </>
  );
}
