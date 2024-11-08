import { getGameConfig } from "@/api";
import { RatioForm } from "@/app/(dashboard)/games/ratio/form";
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
import { RatioTable } from "./table";

async function TableBodyWrapper() {
  const res = await getGameConfig();
  return (
    <RatioTable data={res.data?.filter((item) => item.status === 1) ?? []} />
  );
}

async function TableWrapper() {
  const t = await getTranslations("games.ratio");
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead>{t("name")}</TableHead>
          <TableHead className="min-w-32 w-1/2">
            {t("ratio")}
            <span className="text-destructive">{t("tip")}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <Suspense
        fallback={
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <TableRow key={i}>
                <TableCell colSpan={2}>
                  <Skeleton className="w-full h-6" />
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
      <div className="flex justify-between items-center bg-background py-2 px-4">
        <RatioForm />
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
