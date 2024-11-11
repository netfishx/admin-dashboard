"use client";
import { restoreGameOdds, syncGameOdds, updateGameOdds } from "@/api";
import { EditNumber } from "@/components/edit-number";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GameConfig, GameType } from "@/lib/types";
import { changedOddsLimitAtom, limitAtom, oddsAtom } from "@/store";
import Big from "big.js";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";
import { toast } from "sonner";

export function OddsForm({
  list,
  dict,
}: { list: GameConfig[]; dict: GameType[] }) {
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
  >("odds");
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
              ? "0"
              : Big(odds[key]).add(num).toString(),
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
                  : result.gt(upperLimit ?? Number.POSITIVE_INFINITY)
                    ? upperLimit
                    : result.toNumber(),
              },
            ];
          }),
        ),
      );
    }
  }

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
    const res = await updateGameOdds({
      gameId: game.gameId ? Number(game.gameId) : list[0].gameId,
      list: changedList.map((key) => ({
        oddsType: Number(key.split("-")[0]),
        betType: Number(key.split("-")[1]),
        odds: odds[key],
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
      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("type")}</Label>
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
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("name")}</Label>
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
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("batch")}</Label>
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
              <SelectItem value="odds">{t("odds")}</SelectItem>
              <SelectItem value="minBet">{t("min")}</SelectItem>
              <SelectItem value="maxBet">{t("max")}</SelectItem>
              <SelectItem value="maxBetPeriod">{t("total")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("column")}</Label>
          <EditNumber step={step} setStep={setStep} handleEdit={handleEdit} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleSync}>
          {t("sync")}
        </Button>
        <Button variant="destructive" onClick={handleRestore}>
          {t("reset")}
        </Button>
        <Button onClick={handleSave}>{t("save")}</Button>
      </div>
    </>
  );
}
