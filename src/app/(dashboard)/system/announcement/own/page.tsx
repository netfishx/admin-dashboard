import { getAnnouncement } from "@/api";
import { Suspense } from "react";
import { List } from "./list";

export default async function Own({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const search = await searchParams;
  const { data } = await getAnnouncement({
    size: search.size ?? 10,
    page: search.page ?? 1,
  });
  const announcementDicts = [
    {
      key: "0",
      value: "平台公告",
    },
    {
      key: "1",
      value: "代理公告",
    },
    {
      key: "2",
      value: "大厅公告",
    },
    {
      key: "3",
      value: "房间公告",
    },
  ];
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <List data={data} announcementDicts={announcementDicts} />
      </Suspense>
    </>
  );
}
