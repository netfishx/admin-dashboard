import { getSupplierList } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Add } from "./add";
import { SupplierEditDialog } from "./dialog";
import { EditButton } from "./edit";
import { SupplierForm } from "./form";

export default async function Page({
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
            <Add />
          </Suspense>
        </div>
        <div className="border rounded-sm">
          <Table>
            <SupplierTableHeader />
            <Suspense fallback={<TbodySkeleton />}>
              <SupplierTable searchParams={searchParams} />
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
        <TableHead className="min-w-64">{t("supplierId")}</TableHead>
        <TableHead>{t("supplierUsername")}</TableHead>
        <TableHead>{t("supplierName")}</TableHead>
        <TableHead>{t("remark")}</TableHead>
        <TableHead>{t("status")}</TableHead>
        <TableHead className="w-24 text-center">{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

async function SupplierTable({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const translation = await getTranslations();
  const t = await getTranslations("users.supplier");
  const { pageNum, pageSize } = await searchParams;
  const { data } = await getSupplierList({
    pageNum: Number(pageNum),
    pageSize: Number(pageSize),
  });
  return (
    <TableBody>
      {data?.list && data?.list.length > 0 ? (
        data.list.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.nickname}</TableCell>
            <TableCell>{item.remark}</TableCell>
            <TableCell>{t(`statusLabel.${item.status}`)}</TableCell>
            <TableCell className="w-24 text-center">
              <EditButton data={item} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="text-center">
            {translation("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

function TbodySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <TableRow key={index}>
          <TableCell colSpan={6}>
            <Skeleton className="w-full h-4" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
