
import Form from "./form";
import List from "./list";
import TopTabs from "./top-tabs";

export default async function Page({ searchParams }: any) {
  // const params = await searchParams;
  // const data = await agentBaccaratReport(params);
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
