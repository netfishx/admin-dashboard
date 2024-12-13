"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { exportClick } from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GameType } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function Form({ list }: { list: GameType[] }) {
  const t = useTranslations("report.periodlist");
  const searchParams = useSearchParams();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isReset, startReset] = useTransition();
  const [isSearch, startSearch] = useTransition();
  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });
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
  >(
    list?.[0]?.list?.map((item) => ({
      gameId: item.gameId,
      gameIdLabel: item.gameIdLabel,
    })),
  );

  const [gameTypeList, setGameTypeList] =
    useState<{ gameType: number; gameTypeLabel: string }[]>(list);

  function search() {
    if (!dateRange.startTime || !dateRange.endTime) {
      toast.error(t("selectDateRange"));
    } else {
      startSearch(router.refresh);
    }
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="bg-background p-2">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-2">
              <Label className="shrink-0">{t("issueNumber")}</Label>
              <Input
                placeholder={t("placeholderinput")}
                value={issueNumber ?? ""}
                onChange={(e) => setIssueNumber(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="shrink-0">{t("openTime")}</Label>
              <DateRangeFilter
                quickSetBtn={["today", "yesterday"]}
                enableTimeSelect={false}
              />
            </div>
          </div>
        </div>
        <div className="float-right flex items-center gap-2 p-2">
          <Button
            variant="outline"
            disabled={isReset}
            onClick={() => {
              startReset(() => {
                router.replace("/reports/period");
              });
            }}
          >
            {isReset && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("reset")}
          </Button>
          <Button onClick={search} disabled={isSearch}>
            {isSearch ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t("search")}
          </Button>
          <Button
            onClick={() => {
              startTransition(async () => {
                const params = {
                  exportButtonCode: 100001,
                  queryParams: JSON.stringify(
                    Object.fromEntries(
                      new URLSearchParams(searchParams.toString()),
                    ),
                  ),
                };
                const { code, message } = await exportClick(params);
                if (code === 0) {
                  toast.success(message);
                } else {
                  toast.error(message);
                }
              });
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
