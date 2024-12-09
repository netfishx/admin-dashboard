import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { List } from "./list";

export default function PersonalSecurityPage() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div>
            <div className="bg-background py-2">
              <div className="flex flex-col gap-2">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            </div>
            <div className="bg-background py-2 mt-2">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </div>
            </div>
          </div>
        }
      >
        <List />
      </Suspense>
    </div>
  );
}
