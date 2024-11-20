import { getWithdrawFeeList } from "@/api";
import { Suspense } from "react";
import { List } from "./list";
export default async function Own() {
  const { data } = await getWithdrawFeeList();
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <Suspense>
        <List data={data} />
      </Suspense>
    </div>
  );
}
