import { getGameConfig } from "@/api";
import { RebateForm } from "@/app/(dashboard)/games/rebate/form";
import { RebateTable } from "@/app/(dashboard)/games/rebate/table";
import {} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { Suspense } from "react";

async function TableBodyWrapper() {
  const res = await getGameConfig();
  return (
    <RebateTable data={res.data?.filter((item) => item.status === 1) ?? []} />
  );
}

function TableWrapper() {
  const t = useTranslations("games.rebate");
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead>{t("name")}</TableHead>
          <TableHead className="min-w-32 w-1/2">
            {t("rebate")}
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
        <RebateForm />
      </div>
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm">
          <Suspense>
            <TableWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
