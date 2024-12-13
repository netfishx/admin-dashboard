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
          <TableCell colSpan={2} className="text-center h-40">
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
          <TableHead className="min-w-32 w-1/2">{t("ratio")}</TableHead>
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
    <div className="flex flex-col w-full p-4 bg-background flex-1">
      <div className="border rounded-sm">
        <Suspense>
          <TableWrapper />
        </Suspense>
      </div>
    </div>
  );
}
