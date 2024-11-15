import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Form } from "./form";
import { RechargeTable } from "./table";
export default function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background py-2 px-4">
            <Skeleton className="w-full h-9 opacity-20" />
          </div>
        }
      >
        <Form />
      </Suspense>
      <div className="p-2 bg-background flex-1 flex flex-col gap-2">
        <div className="border rounded-sm">
          <Suspense
            fallback={
              <div className="flex flex-col gap-4 p-4">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-2/3 h-6" />
              </div>
            }
          >
            <RechargeTable searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
