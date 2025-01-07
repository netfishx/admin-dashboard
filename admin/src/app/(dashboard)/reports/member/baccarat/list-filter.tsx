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
import { memberListBaccaratAgentIdAtom } from "@/store";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { toast } from "sonner";

export function ListFilter({
  hasSearchPermission,
  gameList,
}: {
  hasSearchPermission: boolean;
  gameList: GameInfo[];
}) {
  const t = useTranslations("report.member");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useTransitionRouter();
  const [, setMemberListBaccaratAgentId] = useAtom(
    memberListBaccaratAgentIdAtom,
  );
  const [parentAgentId, setParentAgentId] = useQueryState("parentAgentId", {
    defaultValue: "",
  });
  const [gameId, setGameId] = useQueryState("gameId", {
    defaultValue: "all",
  });
  const [memberId, setMemberId] = useQueryState("memberId", {
    defaultValue: "",
  });

  const [memberType, setMemberType] = useQueryState("memberType", {
    defaultValue: "all",
  });

  const [dateRange] = useQueryStates({
    startTime: parseAsInteger,
    endTime: parseAsInteger,
  });

  const handleReset = () => {
    router.replace("/reports/member/baccarat");
  };

  const handleSearch = () => {
    if (dateRange.startTime && dateRange.endTime) {
      setMemberListBaccaratAgentId(parentAgentId);
      startTransition(() => router.refresh());
    } else {
      toast.error(t("selectDate"));
    }
  };

  return (
    <div className="bg-background flex flex-col gap-2 px-4 py-2">
      {/* First row */}
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
          <Label>{t("openTime")}</Label>
          <DateRangeFilter enableTimeSelect={false} />
        </div>
        <div className="flex items-center gap-4">
          <Label className="shrink-0">{t("memberId")}</Label>
          <Input
            className="w-52"
            value={memberId ?? ""}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>

      {/* Second row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <Label className="shrink-0">{t("memberType")}</Label>
          <Select
            value={memberType ?? ""}
            onValueChange={(value) => setMemberType(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="1">{t("directMember")}</SelectItem>
              <SelectItem value="2">{t("nonDirectMember")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {hasSearchPermission && (
          <div className="flex items-center gap-4">
            <Label className="shrink-0">{t("agentId")}</Label>
            <Input
              value={parentAgentId ?? ""}
              className="w-52"
              onChange={(e) => setParentAgentId(e.target.value)}
              placeholder={t("placeholderinput")}
            />
          </div>
        )}
      </div>

      {/* Last row */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <ReportDownloadBtn
            handleDownload={() => makeDownload(searchParams, 100004)}
          />
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
