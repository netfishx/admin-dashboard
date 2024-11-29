import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { List } from "./list";

export default function PersonalSecurityPage() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="bg-background py-2">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        <List />
      </Suspense>
    </div>
  );
}
