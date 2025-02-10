import { getDefaultGameConfig } from "@/api";
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

async function TableBodyWrapper() {
  const res = await getDefaultGameConfig();
  const list = res.data?.filter((item) => item.status === 1) ?? [];
  const t = await getTranslations();
  return (
    <TableBody>
      {list.length > 0 ? (
        list.map((item) => (
          <TableRow key={item.gameId}>
            <TableCell>{item.gameName}</TableCell>
            <TableCell className="flex items-center gap-2">
              {item.maxPercent ?? 0}%
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={2} className="h-48 text-center">
            {t("noData")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

async function TableWrapper() {
  const t = await getTranslations("games.ratio");
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead>{t("name")}</TableHead>
          <TableHead className="w-1/2 min-w-32">{t("ratio")}</TableHead>
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
    <div className="flex w-full flex-1 flex-col bg-background p-4">
      <div className="rounded-sm border">
        <Suspense>
          <TableWrapper />
        </Suspense>
      </div>
    </div>
  );
}
