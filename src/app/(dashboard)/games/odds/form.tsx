"use client";
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
import { useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";

export function OddsForm({
  list,
  dict,
}: { list: GameConfig[]; dict: GameType[] }) {
  const t = useTranslations("games.odds");

  const [game, setGame] = useQueryStates(
    {
      gameType: parseAsString.withDefault(dict[0]?.gameType.toString() ?? ""),
      gameId: parseAsString.withDefault(list[0]?.gameId?.toString() ?? ""),
    },
    { shallow: false, clearOnDefault: false },
  );

  const [step, setStep] = useState(1);

  function handleEdit(num: number) {}
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
          <Select defaultValue="1">
            <SelectTrigger className="w-40">
              <SelectValue placeholder={t("placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">{t("odds")}</SelectItem>
              <SelectItem value="2">{t("min")}</SelectItem>
              <SelectItem value="3">{t("max")}</SelectItem>
              <SelectItem value="4">{t("total")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("column")}</Label>
          <EditNumber step={step} setStep={setStep} handleEdit={handleEdit} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">{t("sync")}</Button>
        <Button variant="destructive">{t("reset")}</Button>
        <Button>{t("save")}</Button>
      </div>
    </>
  );
}
