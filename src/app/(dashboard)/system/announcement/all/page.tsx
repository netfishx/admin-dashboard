import { getAnnouncement } from "@/api";
import { Suspense } from "react";
import { List } from "./list";

export default async function All({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const search = await searchParams;
  const { data } = await getAnnouncement({
    pageSize: Number(search.pageSize ?? 10),
    pageNum: Number(search.pageNum ?? 1),
    userId: (search.userId ?? "") as string,
    startTime: (search.startTime ?? "") as string,
    endTime: (search.endTime ?? "") as string,
    language: "cn",
  });
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <List data={data} />
      </Suspense>
    </>
  );
}
