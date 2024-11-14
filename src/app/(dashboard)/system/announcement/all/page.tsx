import { getAnnouncement } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import { endOfDay, startOfDay } from "date-fns";
import { Suspense } from "react";
import { List } from "./list";

export default async function All({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const search = await searchParams;
  const now = Date.now();
  const start = search.startTime ?? startOfDay(now).getTime();
  const end = search.endTime ?? endOfDay(now).getTime();

  const { data } = await getAnnouncement({
    pageSize: Number(search.pageSize ?? 10),
    pageNum: Number(search.pageNum ?? 1),
    userId: (search.userId ?? "") as string,
    startTime: Number(start),
    endTime: Number(end),
  });
  return (
    <Suspense
      fallback={
        <div className="bg-background py-2">
          <Skeleton className="h-9 w-full opacity-25" />
        </div>
      }
    >
      <List data={data} />
    </Suspense>
  );
}
