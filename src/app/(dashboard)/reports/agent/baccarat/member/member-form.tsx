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
import { makeDownload } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

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
  const searchParams = useSearchParams();

  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });

  const handleReset = () => {
    router.replace("/reports/agent/baccarat/member");
  };

  const handleSearch = () => {
    if (dateRange.startTime && dateRange.endTime) {
      startTransition(() => router.refresh());
    } else {
      toast.error(t("selectDate"));
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-background p-4">
      {/* 第一行 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("drawtime")}</Label>
          <DateRangeFilter enableTimeSelect={false} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="shrink-0">{t("agentID")}</Label>
          <Input
            value={leastlevelID ?? ""}
            onChange={(e) => setLeastlevelID(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <ReportDownloadBtn
            handleDownload={() => makeDownload(searchParams, 100002)}
          />
          <Button variant="outline" onClick={handleReset}>
            {t("reset")}
          </Button>
          <Button disabled={isPending} onClick={handleSearch}>
            {isPending ? <Loader2 className="animate-spin" /> : null}
            {t("search")}
          </Button>
        </div>
      </div>
    </div>
  );
}
