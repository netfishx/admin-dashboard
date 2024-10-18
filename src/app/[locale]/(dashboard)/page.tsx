import Welcome from './welcome';
import DataOverview from './data-overview';
import QuickAccess from './quick-access';
import { getI18n } from "@/locales/server";
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
    <div className="flex-1 flex w-full">
      {/* <div>{t("hello")}</div> */}
      <Welcome user={userInfo} />
      <div>
        <Announcement />
        <DataOverview />
        <QuickAccess />
      </div>
      
    </div>
  );
}
