import { getSupplierList } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Add } from "./add";
import { SupplierEditDialog } from "./dialog";
import { SupplierForm } from "./form";
import { SupplierTable, TbodySkeleton } from "./table-wrapper";

async function SupplierTableWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const { id, username } = await searchParams;
  const { data } = await getSupplierList({
    id: id as string,
    username: username as string,
  });
  return <SupplierTable data={data} />;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Suspense
        fallback={
          <div className="flex items-center justify-between bg-background p-4">
            <Skeleton />
          </div>
        }
      >
        <SupplierForm />
      </Suspense>
      <div className="flex flex-1 flex-col gap-2 bg-background p-4">
        <div className="flex justify-end">
          <Suspense>
            <Add />
          </Suspense>
        </div>
        <div className="rounded-sm border">
          <Table className="table-fixed">
            <SupplierTableHeader />

            <Suspense fallback={<TbodySkeleton />}>
              <SupplierTableWrapper searchParams={searchParams} />
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
        <TableHead className="w-40">{t("supplierId")}</TableHead>
        <TableHead className="w-40">{t("supplierUsername")}</TableHead>
        <TableHead className="w-40">{t("supplierName")}</TableHead>
        <TableHead className="w-40">{t("remark")}</TableHead>
        <TableHead className="w-24 text-center">{t("status")}</TableHead>
        <TableHead className="w-24 text-center">{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
