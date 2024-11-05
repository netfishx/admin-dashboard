import { getAnnouncement } from "@/api";
import { Suspense } from "react";
import { List } from "./list";

export default async function All({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const search = await searchParams;
  const { data } = await getAnnouncement({
    size: search.size ?? 10,
    page: search.page ?? 1,
  });
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <List data={data} />
      </Suspense>
    </>
  );
}
