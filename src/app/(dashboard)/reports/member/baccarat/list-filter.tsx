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

import { startOfDay } from "date-fns";
import { endOfDay } from "date-fns";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useTransition } from "react";

export function ListFilter({
  hasSearchPermission,
  gameList,
}: {
  hasSearchPermission: boolean;
  gameList: GameInfo[];
}) {
  const t = useTranslations("report.member");
  const [isPending, startTransition] = useTransition();
  const [isDownload, startDownload] = useTransition();
  const searchParams = useSearchParams();
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

  const handleReset = () => {
    router.replace(
      `/reports/member/baccarat?startTime=${startOfDay(new Date()).getTime()}&endTime=${endOfDay(new Date()).getTime()}`,
    );
  };

  const router = useRouter();
  const handleSearch = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2 bg-background px-4 py-2">
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
            <Label className="shrink-0">{t("superAgentId")}</Label>
            <Input
              value={parentAgentId ?? ""}
              onChange={(e) => setParentAgentId(e.target.value)}
              placeholder={t("placeholderinput")}
            />
          </div>
        )}
      </div>

      {/* Last row */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <Button
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleReset}
          >
            {t("reset")}
          </Button>
          <Button
            onClick={() => startTransition(handleSearch)}
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {t("search")}
          </Button>
          <Button
            disabled={isDownload}
            onClick={() =>
              startDownload(() => makeDownload(searchParams, 100004))
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
