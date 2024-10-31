import Form from "./form";
import List from "./list";
import TopTabs from "./top-tabs";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <TopTabs />
      {/* 筛选条件 */}
      <Form />
      {/* 表格 */}
      <List />
    </div>
  );
}
