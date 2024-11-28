import { getSameOrSeniorAnno } from "@/api";
import { Suspense } from "react";
import { List } from "../components/list";

// 上级公告
export default async function All({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const search = await searchParams;

  const { data } = await getSameOrSeniorAnno({
    pageSize: Number(search.pageSize ?? 10),
    pageNum: Number(search.pageNum ?? 1),
    level: 1, // 上级
  });
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="p-2 bg-background flex-1 flex flex-col gap-2">
        <Suspense>
          <List data={data} />
        </Suspense>
      </div>
    </div>
  );
}
