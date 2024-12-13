import { getBaccaratGames, getSupplierConfigs, getSupplierList } from "@/api";
import { Add } from "@/app/(dashboard)/games/supplier/add";
import { SupplierDialog } from "@/app/(dashboard)/games/supplier/dialog";
import { SupplierForm } from "@/app/(dashboard)/games/supplier/form";
import {
  SupplierTable,
  SupplierTableHeader,
} from "@/app/(dashboard)/games/supplier/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Suspense } from "react";

async function DialogWrapper() {
  const games = await getBaccaratGames();
  const suppliers = await getSupplierList();
  const supplierConfigs = await getSupplierConfigs();
  return (
    <SupplierDialog
      games={
        games.data?.filter(
          (i) => !supplierConfigs.data?.some((j) => j.gameId === i.gameId),
        ) ?? []
      }
      suppliers={suppliers.data ?? []}
    />
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense>
        <DialogWrapper />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex items-center justify-between bg-background p-4">
            <Skeleton className="h-9 w-full" />
          </div>
        }
      >
        <SupplierForm />
      </Suspense>
      <div className="flex flex-1 flex-col gap-4 bg-background p-4">
        <div className="flex justify-end">
          <Add />
        </div>
        <div className="rounded-sm border">
          <Suspense
            fallback={
              <Table className="table-fixed">
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
