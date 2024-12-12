"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GameInfo } from "@/lib/types";
import { makeDownload } from "@/lib/utils";
import { endOfDay } from "date-fns";
import { startOfDay } from "date-fns";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useTransition } from "react";

export function MemberForm({ gameList }: { gameList: GameInfo[] }) {
  const t = useTranslations("report.agent");
  const router = useRouter();
  const [gameName, setGameName] = useQueryState("gameId", {
    defaultValue: "all",
  });
  const [leastlevelID, setLeastlevelID] = useQueryState("agentId", {
    defaultValue: "",
  });
  const [isPending, startTransition] = useTransition();
  const [isDownload, startDownload] = useTransition();
  const searchParams = useSearchParams();

  const handleReset = () => {
    router.replace(
      `/reports/agent/baccarat/member?startTime=${startOfDay(new Date()).getTime()}&endTime=${endOfDay(new Date()).getTime()}`,
    );
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* 第一行 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("gameName")}</Label>
          <Select
            value={gameName ?? ""}
            onValueChange={(value) => setGameName(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              {gameList.map((game) => (
                <SelectItem key={game.gameId} value={game.gameId.toString()}>
                  {game.gameName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("drawtime")}</Label>
          <DateRangeFilter />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("agentID")}</Label>
          <Input
            value={leastlevelID ?? ""}
            onChange={(e) => setLeastlevelID(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>

      <div className="flex gap-4 justify-end items-center">
        <div className="flex gap-2 items-center">
          <Button
            className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            onClick={handleReset}
          >
            {t("reset")}
          </Button>
          <Button
            disabled={isPending}
            onClick={() => startTransition(() => router.refresh())}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t("search")}
          </Button>
          <Button
            disabled={isDownload}
            onClick={() =>
              startDownload(() => makeDownload(searchParams, 100002))
            }
          >
            {isDownload && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("download")}
          </Button>
        </div>
      </div>
    </div>
  );
}
