"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import { getGameList } from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState, useTransition } from "react";
export function Form() {
  const t = useTranslations("report.periodlist");

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // const [gameType, setGameType] = useQueryState(
  //   "gameType",
  //   parseAsString.withDefault("61").withOptions({ clearOnDefault: false }),
  // );
  const [gameType, setGameType] = useQueryState("gameType", {
    defaultValue: "61",
  });
  const [gameId, setGameId] = useQueryState("gameId", {
    defaultValue: "all",
  });
  const [issueNumber, setIssueNumber] = useQueryState("issueNumber", {
    defaultValue: "",
  });
  const [gameIdList, setGameIdList] = useState<
    { gameId: number; gameIdLabel: string }[]
  >([]);
  const [gameTypeList, setGameTypeList] = useState<
    { gameType: number; gameTypeLabel: string }[]
  >([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getGameList(1).then((res) => {
      setGameTypeList(res.data ?? []);
      const gameIdList = res.data?.[0]?.list?.map((item) => ({
        gameId: item.gameId,
        gameIdLabel: item.gameIdLabel,
      }));
      setGameIdList(gameIdList ?? []);
    });
  }, []);
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-background">
        <div className="flex justify-between items-center  py-2 px-4">
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("gameType")}</Label>
              <Select defaultValue={gameType} disabled>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder={t("placeholderselect")} />
                </SelectTrigger>
                <SelectContent>
                  {gameTypeList?.map((item) => (
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
              <Label className="shrink-0">{t("gameId")}</Label>
              <Select
                value={gameId}
                onValueChange={(value) => setGameId(value)}
                defaultValue="all"
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder={t("placeholderselect")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all")}</SelectItem>
                  {gameIdList?.map((item) => (
                    <SelectItem
                      key={item.gameId}
                      value={item.gameId.toString()}
                    >
                      {item.gameIdLabel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("issueNumber")}</Label>
              <Input
                placeholder={t("placeholderinput")}
                value={issueNumber ?? ""}
                onChange={(e) => setIssueNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="shrink-0">{t("openTime")}</Label>
              <DateRangeFilter
                quickSetBtn={["today", "yesterday"]}
                enableTimeSelect={false}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center float-right p-2">
          <Button variant="outline">{t("reset")}</Button>
          <Button onClick={() => router.refresh()}>{t("search")}</Button>
          <Button
            onClick={() => {
              startTransition(router.refresh);
            }}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t("download")}
          </Button>
        </div>
      </div>
    </div>
  );
}
