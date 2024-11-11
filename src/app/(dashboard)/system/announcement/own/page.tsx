import { getAnnouncement } from "@/api";
import { Suspense } from "react";
import { List } from "./list";

export default async function Own({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const search = await searchParams;
  const { data } = await getAnnouncement({
    pageSize: Number(search.size ?? 10),
    pageNum: Number(search.page ?? 1),
    startTime: String(search.startTime ?? ""),
    endTime: String(search.endTime ?? ""),
  });

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <List data={data} />
      </Suspense>
    </>
  );
}
