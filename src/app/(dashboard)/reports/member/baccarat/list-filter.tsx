"use client";
import { getAllGames } from "@/api";
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

import { startOfDay } from "date-fns";
import { endOfDay } from "date-fns";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";

export function ListFilter({
  hasSearchPermission,
}: { hasSearchPermission: boolean }) {
  const t = useTranslations("report.member");
  const [parentAgentId, setParentAgentId] = useQueryState("parentAgentId", {
    defaultValue: "",
  });
  const [gameId, setGameId] = useQueryState("gameId", {
    defaultValue: "",
  });
  const [memberId, setMemberId] = useQueryState("memberId", {
    defaultValue: "",
  });

  const [memberType, setMemberType] = useQueryState("memberType", {
    defaultValue: "all",
  });

  const dateRangeFilterReset = useRef<
    ((start: number, end: number) => void) | null
  >(null);
  const handleDateRangeFilterReset = () => {
    const start = startOfDay(new Date()).getTime();
    const end = endOfDay(new Date()).getTime();
    dateRangeFilterReset.current?.(start, end);
  };

  const handleReset = () => {
    setParentAgentId("");
    setGameId("");
    setMemberId("");
    setMemberType("all");
    handleDateRangeFilterReset();
  };

  const router = useRouter();
  const handleSearch = () => {
    router.refresh();
  };

  const [gameList, setGameList] = useState<GameInfo[]>([]);
  useEffect(() => {
    getAllGames().then((res) => {
      setGameList(res.data ?? []);
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* First row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("gameName")}</Label>
          <Select
            value={gameId ?? ""}
            onValueChange={(value) => setGameId(value)}
            defaultValue="1"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              {gameList.map((game) => (
                <SelectItem key={game.gameId} value={game.gameId.toString()}>
                  {game.gameName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Label>{t("openTime")}</Label>
          <DateRangeFilter
            enableTimeSelect={false}
            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
            reset={(resetFn) => (dateRangeFilterReset.current = resetFn)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("memberId")}</Label>
          <Input
            value={memberId ?? ""}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>

      {/* Second row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center">
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
              <SelectItem value="1">直属会员</SelectItem>
              <SelectItem value="2">非直属会员</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {hasSearchPermission && (
          <div className="flex gap-4 items-center">
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
      <div className="flex gap-4 justify-end items-center">
        <div className="flex gap-2 items-center">
          <Button
            className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            onClick={handleReset}
          >
            {t("reset")}
          </Button>
          <Button onClick={handleSearch}>{t("search")}</Button>
          <Button>{t("download")}</Button>
        </div>
      </div>
    </div>
  );
}
