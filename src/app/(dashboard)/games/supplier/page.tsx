import { getSupplierGames, getSupplierList } from "@/api";
import { Add } from "@/app/(dashboard)/games/supplier/add";
import { SupplierForm } from "@/app/(dashboard)/games/supplier/form";
import {
  SupplierTable,
  SupplierTableHeader,
} from "@/app/(dashboard)/games/supplier/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Suspense } from "react";

async function AddButtonWrapper() {
  const res = await getSupplierGames();
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
            <Skeleton className="w-full h-9" />
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
              <Table>
                <SupplierTableHeader />
                <TableBody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <TableRow key={i}>
                      <TableCell colSpan={7}>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            }
          >
            <SupplierTable searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
