import { getBaccaratGameConfig } from "@/api";
import { FlyOrderForm } from "@/app/(dashboard)/games/flyorder/form";
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
import { FlyOrderTable } from "./table";

async function TableBodyWrapper() {
  const res = await getBaccaratGameConfig();
  return (
    <FlyOrderTable data={res.data?.filter((item) => item.status === 1) ?? []} />
  );
}

async function TableWrapper() {
  const t = await getTranslations("games.flyorder");
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead>{t("name")}</TableHead>
          <TableHead className="w-32 text-center">{t("switch")}</TableHead>
        </TableRow>
      </TableHeader>
      <Suspense
        fallback={
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <TableRow key={i}>
                <TableCell colSpan={2}>
                  <Skeleton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        }
      >
        <TableBodyWrapper />
      </Suspense>
    </Table>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center bg-background p-4">
        <FlyOrderForm />
      </div>
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm">
          <Suspense fallback={null}>
            <TableWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
