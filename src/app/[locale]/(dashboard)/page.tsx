import Announcement from "./announcement";
import DataOverview from "./data-overview";
import QuickAccess from "./quick-access";
import Salutations from "./salutations";

export default function DashboardPage() {
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
      <Salutations user={userInfo} />
      <div className="flex flex-col gap-2">
        <DataOverview />
        <QuickAccess />
        <Announcement />
      </div>
    </>
  );
}
