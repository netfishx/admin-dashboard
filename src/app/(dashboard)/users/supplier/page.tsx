import { getSupplierList } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Add } from "./add";
import { SupplierEditDialog } from "./dialog";
import { SupplierForm } from "./form";
import { SupplierTable, TbodySkeleton } from "./table-wrapper";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const { id, username } = await searchParams;
  const { data } = await getSupplierList({
    id: id as string,
    username: username as string,
  });
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense
        fallback={
          <div className="flex justify-between items-center bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <SupplierForm />
      </Suspense>
      <div className="p-2 bg-background flex-1 flex flex-col gap-2">
        <div className="flex justify-end">
          <Suspense>
            <Add />
          </Suspense>
        </div>
        <div className="border rounded-sm">
          <Table className="table-fixed">
            <SupplierTableHeader />
            <Suspense fallback={<TbodySkeleton />}>
              <SupplierTable data={data} />
            </Suspense>
          </Table>
        </div>
      </div>
      <SupplierEditDialog />
    </div>
  );
}

async function SupplierTableHeader() {
  "use cache";
  const t = await getTranslations("users.supplier");
  return (
    <TableHeader>
      <TableRow className="bg-muted">
        <TableHead className="w-64">{t("supplierId")}</TableHead>
        <TableHead className="w-40">{t("supplierUsername")}</TableHead>
        <TableHead className="w-40">{t("supplierName")}</TableHead>
        <TableHead className="w-40">{t("remark")}</TableHead>
        <TableHead className="w-20">{t("status")}</TableHead>
        <TableHead className="w-24 text-center">{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
