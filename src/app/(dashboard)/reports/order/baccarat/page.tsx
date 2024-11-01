import { Suspense } from "react";
import { List } from "./list";
import { ListFilter } from "./list-filter";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={null}>
        <ListFilter />
      </Suspense>
      <List />
    </div>
  );
}
