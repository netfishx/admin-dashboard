import { getAnnouncement } from "@/api";
import { endOfDay, startOfDay } from "date-fns";
import { Suspense } from "react";
import { List } from "./list";

export default async function All({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const search = await searchParams;
  const now = performance.now();
  const start = search.startTime ?? startOfDay(now).getTime();
  const end = search.endTime ?? endOfDay(now).getTime();

  const { data } = await getAnnouncement({
    pageSize: Number(search.pageSize ?? 10),
    pageNum: Number(search.pageNum ?? 1),
    userId: (search.userId ?? "") as string,
    startTime: start as string,
    endTime: end as string,
  });
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <List data={data} />
      </Suspense>
    </>
  );
}
