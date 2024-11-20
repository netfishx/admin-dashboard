import { getOreFeeList } from "@/api";
import { Suspense } from "react";
import { AddBtn } from "./add-btn";
import { List } from "./list";
export default async function Own() {
  const { data } = await getOreFeeList();
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <AddBtn />
      <Suspense>
        <List data={data} />
      </Suspense>
    </div>
  );
}
