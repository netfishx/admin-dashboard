import { getBaccaratGames, getSupplierList } from "@/api";
import { Add } from "@/app/(dashboard)/games/supplier/add";
import { SupplierForm } from "@/app/(dashboard)/games/supplier/form";
import { SupplierTable } from "@/app/(dashboard)/games/supplier/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

async function AddButtonWrapper() {
  const res = await getBaccaratGames();
  const suppliers = await getSupplierList();
  return <Add games={res.data ?? []} suppliers={suppliers.data ?? []} />;
}

export default function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background p-4">
            <Skeleton className="w-full h-9 opacity-20" />
          </div>
        }
      >
        <SupplierForm />
      </Suspense>
      <div className="p-2 bg-background flex-1 flex flex-col gap-2">
        <div className="flex justify-end">
          <Suspense>
            <AddButtonWrapper />
          </Suspense>
        </div>
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
            <SupplierTable searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
