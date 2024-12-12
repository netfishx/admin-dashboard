import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { List } from "./list";
import { SecurityProgress } from "./progress";

export default function PersonalSecurityPage() {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <Suspense
        fallback={
          <>
            <SecurityProgress />
            <div className="bg-background flex-1 p-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
              </div>
            </div>
          </>
        }
      >
        <List />
      </Suspense>
    </div>
  );
}
