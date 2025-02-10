import { getDefaultGameConfig } from "@/api";
import { RebateForm } from "@/app/(dashboard)/games/rebate/form";
import { RebateTable } from "@/app/(dashboard)/games/rebate/table";
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
  const res = await getDefaultGameConfig();
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
          <TableHead className="w-1/2 min-w-32">
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
  const t = useTranslations("games.rebate");
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between bg-background p-4">
        <RebateForm />
      </div>
      <div className="flex flex-1 flex-col gap-4 bg-background p-4">
        <div className="rounded-sm border">
          <Suspense>
            <TableWrapper />
          </Suspense>
        </div>
        <div className="text-primary/80 text-sm before:mr-1 before:content-['*']">
          {t("tips")}
        </div>
      </div>
    </div>
  );
}
