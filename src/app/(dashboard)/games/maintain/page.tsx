import { MaintainForm } from "@/app/(dashboard)/games/maintain/form";
import { MaintainTableWrapper } from "@/app/(dashboard)/games/maintain/table-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <MaintainForm />
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm">
          <Suspense
            fallback={
              <div className="flex flex-col gap-4 p-4">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            }
          >
            <MaintainTableWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
