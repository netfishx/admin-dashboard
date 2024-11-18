import { getAgentAnnouncement } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
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
    <Suspense
      fallback={
        <div className="bg-background py-2">
          <Skeleton className="h-9 w-full opacity-25" />
          <Skeleton className="h-9 w-full opacity-25" />
          <Skeleton className="h-9 w-full opacity-25" />
          <Skeleton className="h-9 w-full opacity-25" />
        </div>
      }
    >
      <List data={data} />
    </Suspense>
  );
}
