import { getI18n } from "@/locales/server";
import Announcement from "./announcement";
import DataOverview from "./data-overview";
import QuickAccess from "./quick-access";
import Salutations from "./salutations";

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
    <>
      {/* <div>{t("hello")}</div> */}
      <Salutations user={userInfo} />
      <div>
        <Announcement />
        <DataOverview />
        <QuickAccess />
      </div>
    </>
  );
}
