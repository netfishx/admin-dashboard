import { Suspense } from "react";
import { List } from "./list";
import { ListFilter } from "./list-filter";

function CommonWrapper() {
  return (
    <>
      <ListFilter />
      <List /> 
    </>
  );
}

export default function GundanPage() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={null}>
        <CommonWrapper />
      </Suspense>
    </div>
  );
}
