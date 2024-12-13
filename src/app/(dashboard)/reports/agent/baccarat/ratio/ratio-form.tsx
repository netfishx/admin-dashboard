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

export function RatioForm({ gameList }: { gameList: GameInfo[] }) {
  const t = useTranslations("report.agent");
  const [isPending, startTransition] = useTransition();
  const [isDownload, startDownload] = useTransition();
  const searchParams = useSearchParams();
  const [gameId, setGameId] = useQueryState("gameId", {
    defaultValue: "all",
  });
  const [agentId, setagentId] = useQueryState("agentId", {
    defaultValue: "",
  });
  const [houseOwnerId, setHouseOwnerId] = useQueryState("houseOwnerId", {
    defaultValue: "",
  });
  const [parentAgentId, setParentAgentId] = useQueryState("parentAgentId", {
    defaultValue: "",
  });
  const router = useRouter();

  const handleReset = () => {
    router.replace(
      `/reports/agent/baccarat/ratio?startTime=${startOfDay(new Date()).getTime()}&endTime=${endOfDay(new Date()).getTime()}`,
    );
  };

  return (
    <div className="flex flex-col gap-2 bg-background p-4">
      {/* 第一行 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("gameName")}</Label>
          <Select
            value={gameId ?? ""}
            onValueChange={(value) => setGameId(value)}
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
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("drawtime")}</Label>
          <DateRangeFilter />
        </div>
      </div>

      {/* 第二行 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("agentID")}</Label>
          <Input
            value={agentId ?? ""}
            onChange={(e) => setagentId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("roomeownerID")}</Label>
          <Input
            value={houseOwnerId ?? ""}
            onChange={(e) => setHouseOwnerId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("uperagentID")}</Label>
          <Input
            value={parentAgentId ?? ""}
            onChange={(e) => setParentAgentId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <Button
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleReset}
          >
            {t("reset")}
          </Button>
          <Button
            onClick={() => startTransition(() => router.refresh())}
            disabled={isPending}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("search")}
          </Button>
          <Button
            disabled={isDownload}
            onClick={() =>
              startDownload(() => makeDownload(searchParams, 100003))
            }
          >
            {isDownload && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("download")}
          </Button>
        </div>
      </div>
    </div>
  );
}
