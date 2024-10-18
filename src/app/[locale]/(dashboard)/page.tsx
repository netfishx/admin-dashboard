import Salutations from './salutations';
import DataOverview from './data-overview';
import QuickAccess from './quick-access';
import { getI18n } from "@/locales/server";
import Announcement from "./announcement";

export default function DashboardPage() {
  const t = getI18n();
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
      <Salutations user={userInfo} />
      <div className='flex flex-col gap-2'>
        <DataOverview />
        <QuickAccess />
        <Announcement />
      </div>
      
    </div>
  );
}
