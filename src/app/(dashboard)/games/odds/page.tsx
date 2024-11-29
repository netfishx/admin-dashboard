import { getBaccaratGameConfig, getGameList, getGameOdds } from "@/api";
import { OddsForm } from "@/app/(dashboard)/games/odds/form";
import { OddsTable } from "@/app/(dashboard)/games/odds/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSession, hasPermission } from "@/session";
import { useTranslations } from "next-intl";
import { Suspense, use } from "react";

async function FormWrapper() {
  const [list, dict] = await Promise.all([
    getBaccaratGameConfig(),
    getGameList(1),
  ]);
  const session = await getSession();
  return (
    <OddsForm
      list={list.data?.filter((item) => item.status === 1) ?? []}
      dict={dict.data ?? []}
      permissions={session?.permissions ?? []}
    />
  );
}

async function TableBodyWrapper({ gameId }: { gameId?: number }) {
  if (!gameId) {
    const res = await getBaccaratGameConfig();
    gameId = res.data?.filter((item) => item.status === 1)?.[0]?.gameId ?? 0;
  }
  const res = await getGameOdds({ gameId });
  return <OddsTable list={res.data ?? []} />;
}

function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const t = useTranslations("games.odds");
  const { gameId } = use(searchParams);
  const hasAdminPermission = use(hasPermission("sync_odds"));
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead className="min-w-24">{t("smallType")}</TableHead>
          <TableHead className="text-center w-32">{t("odds")}</TableHead>
          <TableHead className="text-center min-w-40">{t("min")}</TableHead>
          <TableHead className="text-center min-w-72">
            {t("max")}
            {!hasAdminPermission && (
              <span className="text-destructive">{t("tip")}</span>
            )}
          </TableHead>
          <TableHead className="text-center min-w-72">
            {t("total")}
            {!hasAdminPermission && (
              <span className="text-destructive">{t("tip")}</span>
            )}
          </TableHead>
        </TableRow>
      </TableHeader>
      <Suspense
        fallback={
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <TableRow key={i}>
                <TableCell colSpan={5}>
                  <Skeleton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        }
      >
        <TableBodyWrapper gameId={gameId ? Number(gameId) : undefined} />
      </Suspense>
    </Table>
  );
}

export default function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center bg-background p-4">
        <Suspense fallback={<Skeleton className="w-full h-9" />}>
          <FormWrapper />
        </Suspense>
      </div>
      <div className="p-2 bg-background flex-1">
        <div className="border rounded-sm">
          <Suspense>
            <TableWrapper searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
