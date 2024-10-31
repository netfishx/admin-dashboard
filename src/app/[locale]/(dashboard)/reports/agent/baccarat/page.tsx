import { agentBaccaratReport } from "@/api";
import Form from "./form";
import List from "./list";
import TopTabs from "./top-tabs";

export default async function Page({ searchParams }: any) {
  const params = await searchParams;
  console.log(params, 'params');

  const data = await agentBaccaratReport(params);
  console.log(data, 'data');
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
