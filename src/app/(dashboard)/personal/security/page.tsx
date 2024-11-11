import { Suspense } from "react";
import { List } from "./list";
export default function PersonalSecurityPage() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <List />
      </Suspense>
    </div>
  );
}
