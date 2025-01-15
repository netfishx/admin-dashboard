"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { ReportDownloadBtn } from "@/components/report-download-btn";
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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname, useSearchParams } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function RatioForm({ gameList }: { gameList: GameInfo[] }) {
  const t = useTranslations("report.agent");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });
  const [gameId, setGameId] = useQueryState("gameId", {
    defaultValue: "all",
  });
  const [agentOrHouseOwnerId, setAgentOrHouseOwnerId] = useQueryState(
    "agentOrHouseOwnerId",
    {
      defaultValue: "",
    },
  );

  const [parentAgentId, setParentAgentId] = useQueryState("parentAgentId", {
    defaultValue: "",
  });
  const router = useTransitionRouter();

  const handleSearch = () => {
    if (dateRange.startTime && dateRange.endTime) {
      startTransition(() => router.refresh());
    } else {
      toast.error(t("selectDate"));
    }
  };

  const handleReset = () => {
    router.replace("/reports/agent/baccarat/ratio");
  };

  const pathname = usePathname();

  return (
    <div className="bg-background flex flex-col gap-2 p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("gameName")}</Label>
          <Select
            value={gameId ?? ""}
            onValueChange={(value) => setGameId(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent className="w-36">
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
          <DateRangeFilter enableTimeSelect={false} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("agentOrOwnerId")}</Label>
          <Input
            value={agentOrHouseOwnerId ?? ""}
            className="w-52"
            onChange={(e) => setAgentOrHouseOwnerId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("uperagentID")}</Label>
          <Input
            value={parentAgentId ?? ""}
            className="w-52"
            onChange={(e) => setParentAgentId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
          <ReportDownloadBtn searchParams={searchParams} pathname={pathname} />
          <Button variant="outline" onClick={handleReset}>
            {t("reset")}
          </Button>
          <Button onClick={handleSearch} disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {t("search")}
          </Button>
        </div>
      </div>
    </div>
  );
}
