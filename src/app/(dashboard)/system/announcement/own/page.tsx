import { getAgentAnnouncement } from "@/api";
import { Suspense } from "react";
import { List } from "./list";

export default async function Own({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const search = await searchParams;
  const { data } = await getAgentAnnouncement({
    pageSize: Number(search.pageSize ?? 10),
    pageNum: Number(search.pageNum ?? 1),
    level: 0,
  });

  return (
    <div className="flex flex-col w-full h-full">
      <div className=" flex-1 flex flex-col">
        <Suspense>
          <List data={data} />
        </Suspense>
      </div>
    </div>
  );
}
