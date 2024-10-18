import { getI18n } from "@/locales/server";
import DataOverview from "./DataOverview";
import QuickAccess from "./QuickAccess";
import Welcome from "./Welcome";
import Announcement from "./announcement";

export default async function DashboardPage() {
  const t = await getI18n();
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
    <div className="flex-1">
      <div>{t("hello")}</div>
      <Announcement />
      <Welcome user={userInfo} />
      <DataOverview />
      <QuickAccess />
    </div>
  );
}
