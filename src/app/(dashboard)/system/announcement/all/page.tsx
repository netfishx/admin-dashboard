import { getAnnouncement } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import { endOfDay, startOfDay } from "date-fns";
import { Suspense } from "react";
import { Form } from "./form";
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
    userId: (search.userId ?? "") as string, // 代理传这个
    startTime: Number(start),
    endTime: Number(end),
  });
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      {/* form: admin permission */}
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background py-2 px-4">
            <Skeleton className="w-full h-9 opacity-20" />
            <Skeleton className="w-full h-9 opacity-20" />
            <Skeleton className="w-full h-9 opacity-20" />
          </div>
        }
      >
        <Form />
      </Suspense>
      <div className="p-2 bg-background flex-1 flex flex-col gap-2">
        <Suspense
          fallback={
            <div className="flex flex-col gap-4 p-4">
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-2/3 h-6" />
            </div>
          }
        >
          <List data={data} />
        </Suspense>
      </div>
    </div>
  );
}
