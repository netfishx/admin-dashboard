"use client";
import { restoreGameOdds, syncGameOdds, updateGameOdds } from "@/api";
import { EditNumber } from "@/components/edit-number";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { GameConfig, GameType } from "@/lib/types";
import {
  changedOddsLimitAtom,
  limitAtom,
  oddsAtom,
  verifyLimitAtom,
} from "@/store";
import Big from "big.js";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { useState, useTransition } from "react";
import { toast } from "sonner";

function SyncButton({ onClick }: { onClick: () => void }) {
  const t = useTranslations("games.odds");
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending} variant="outline">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {t("sync")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("syncTitle")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={() => startTransition(onClick)}>
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function RestoreButton({ onClick }: { onClick: () => void }) {
  const t = useTranslations("games.odds");
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending} variant="destructive">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {t("reset")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("restoreTitle")}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={() => startTransition(onClick)}>
            {translations("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function SaveButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  const t = useTranslations("games.odds");
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending || disabled}
      onClick={() => startTransition(onClick)}
    >
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {t("save")}
    </Button>
  );
}

export function OddsForm({
  list,
  dict,
  permissions,
}: {
  list: GameConfig[];
  dict: GameType[];
  permissions: string[];
}) {
  const t = useTranslations("games.odds");
  const router = useRouter();

  const [game, setGame] = useQueryStates(
    {
      gameType: parseAsString.withDefault(dict[0]?.gameType.toString() ?? ""),
      gameId: parseAsString.withDefault(list[0]?.gameId?.toString() ?? ""),
    },
    { shallow: false, clearOnDefault: false },
  );
  const [field, setField] = useState<
    "odds" | "minBet" | "maxBet" | "maxBetPeriod"
  >(permissions.includes("sync_odds") ? "odds" : "minBet");
  const stepLimit = field === "odds" ? 0.001 : 1;
  const [step, setStep] = useState(1);

  const [odds, setOdds] = useAtom(oddsAtom);
  const [changedList, setChangedList] = useAtom(changedOddsLimitAtom);
  const [limit, setLimit] = useAtom(limitAtom);

  function handleEdit(num: number) {
    setChangedList(Object.keys(odds));
    if (field === "odds") {
      setOdds(
        Object.fromEntries(
          Object.keys(odds).map((key) => [
            key,
            Big(odds[key]).add(num).lt(0)
              ? 0
              : Big(odds[key]).add(num).toNumber(),
          ]),
        ),
      );
    } else {
      setLimit(
        Object.fromEntries(
          Object.keys(limit).map((key) => {
            const upperLimit =
              field === "maxBetPeriod"
                ? limit[key].maxBetPeriodLimit
                : limit[key].maxBetLimit;
            const result = Big(limit[key][field] ?? 0).add(num);

            return [
              key,
              {
                ...limit[key],
                [field]: result.lt(1)
                  ? 1
                  : upperLimit
                    ? result.gt(upperLimit)
                      ? upperLimit
                      : result.toNumber()
                    : result.toNumber(),
              },
            ];
          }),
        ),
      );
    }
  }
  const verifyLimit = useAtomValue(verifyLimitAtom);

  async function handleSync() {
    const res = await syncGameOdds({
      gameId: game.gameId ? Number(game.gameId) : list[0].gameId,
    });
    if (res.code === 0) {
      toast.success(res.message ?? "");
    } else {
      toast.error(res.message ?? "");
    }
  }

  async function handleSave() {
    if (changedList.length === 0) {
      return;
    }
    const res = await updateGameOdds({
      gameId: game.gameId ? Number(game.gameId) : list[0].gameId,
      list: changedList.map((key) => ({
        oddsType: Number(key.split("-")[0]),
        betType: Number(key.split("-")[1]),
        odds: odds[key]?.toString(),
        ...limit[key],
      })),
    });
    if (res.code === 0) {
      toast.success(res.message ?? "");
      router.refresh();
    } else {
      toast.error(res.message ?? "");
    }
  }

  async function handleRestore() {
    const res = await restoreGameOdds({
      gameId: game.gameId ? Number(game.gameId) : list[0].gameId,
    });
    if (res.code === 0) {
      toast.success(res.message ?? "");
      router.refresh();
    } else {
      toast.error(res.message ?? "");
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("type")}</Label>
          {dict.length === 0 ? (
            <Skeleton className="h-9 w-36" />
          ) : (
            <Select defaultValue={dict[0]?.gameType.toString()} disabled>
              <SelectTrigger className="w-36">
                <SelectValue placeholder={t("placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {dict.map((item) => (
                  <SelectItem
                    key={item.gameType}
                    value={item.gameType.toString()}
                  >
                    {item.gameTypeLabel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("name")}</Label>
          {dict.length === 0 ? (
            <Skeleton className="h-9 w-36" />
          ) : (
            <Select
              value={game?.gameId ?? undefined}
              onValueChange={(value) => {
                setGame({
                  gameType: game.gameType,
                  gameId: value,
                });
              }}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder={t("placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {list.map((item) => (
                  <SelectItem key={item.gameId} value={item.gameId.toString()}>
                    {item.gameName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("batch")}</Label>
          {permissions.length === 0 ? (
            <Skeleton className="h-9 w-40" />
          ) : (
            <Select
              value={field}
              onValueChange={(value) =>
                setField(value as "odds" | "minBet" | "maxBet" | "maxBetPeriod")
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder={t("placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {permissions.includes("sync_odds") && (
                  <SelectItem value="odds">{t("odds")}</SelectItem>
                )}
                <SelectItem value="minBet">{t("min")}</SelectItem>
                <SelectItem value="maxBet">{t("max")}</SelectItem>
                <SelectItem value="maxBetPeriod">{t("total")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("column")}</Label>
          <EditNumber
            step={step}
            setStep={setStep}
            handleEdit={handleEdit}
            limit={stepLimit}
          />
        </div>
      </div>
      <div className="ml-auto flex gap-2">
        {permissions.length === 0 && <Skeleton className="h-9 w-80" />}
        {permissions.includes("sync_odds") && (
          <SyncButton onClick={handleSync} />
        )}
        {permissions.includes("restore_odds") && (
          <RestoreButton onClick={handleRestore} />
        )}
        {permissions.includes("edit_odds") && (
          <SaveButton onClick={handleSave} disabled={!verifyLimit} />
        )}
      </div>
    </>
  );
}
