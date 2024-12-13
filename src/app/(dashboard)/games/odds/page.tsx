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

async function TableBodyWrapper({
  gameId,
  hasAdminPermission,
}: { gameId?: number; hasAdminPermission: boolean }) {
  if (!gameId) {
    const res = await getBaccaratGameConfig();
    gameId = res.data?.filter((item) => item.status === 1)?.[0]?.gameId ?? 0;
  }
  const res = await getGameOdds({ gameId });
  return (
    <OddsTable list={res.data ?? []} hasAdminPermission={hasAdminPermission} />
  );
}

function TableWrapper({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const t = useTranslations("games.odds");
  const { gameId } = use(searchParams);
  const hasAdminPermission = use(hasPermission("sync_odds"));
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead className="w-32">{t("smallType")}</TableHead>
          <TableHead className="w-32">{t("odds")}</TableHead>
          <TableHead className="w-40">{t("min")}</TableHead>
          <TableHead className="w-72">
            {t("max")}
            {!hasAdminPermission && (
              <span className="text-destructive">{t("tip")}</span>
            )}
          </TableHead>
          <TableHead className="w-72">
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
        <TableBodyWrapper
          gameId={gameId ? Number(gameId) : undefined}
          hasAdminPermission={hasAdminPermission}
        />
      </Suspense>
    </Table>
  );
}

export default function Page({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-2 bg-background p-4">
        <Suspense fallback={<OddsForm list={[]} dict={[]} permissions={[]} />}>
          <FormWrapper />
        </Suspense>
      </div>
      <div className="p-4 bg-background flex-1">
        <div className="border rounded-sm">
          <Suspense>
            <TableWrapper searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
