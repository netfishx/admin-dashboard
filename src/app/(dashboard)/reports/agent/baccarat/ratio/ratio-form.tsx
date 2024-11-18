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
import { endOfDay } from "date-fns";
import { startOfDay } from "date-fns";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useRef } from "react";

export function RatioForm() {
  const t = useTranslations("report.agent");
  const [gameId, setGameId] = useQueryState("gameId");
  const [agentId, setagentId] = useQueryState("agentId");
  const [houseOwnerId, setHouseOwnerId] = useQueryState("houseOwnerId");
  const [parentAgentId, setParentAgentId] = useQueryState("parentAgentId");
  const router = useRouter();
  const dateRangeFilterReset = useRef<
    ((start: number, end: number) => void) | null
  >(null);
  const handleDateRangeFilterReset = () => {
    const start = startOfDay(new Date()).getTime();
    const end = endOfDay(new Date()).getTime();
    dateRangeFilterReset.current?.(start, end);
  };

  const handleReset = () => {
    setGameId("");
    setagentId("");
    setHouseOwnerId("");
    setParentAgentId("");
    handleDateRangeFilterReset();
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* 第一行 */}
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
              <SelectItem value="1">百家乐01</SelectItem>
              <SelectItem value="2">百家乐02</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("drawtime")}</Label>
          <DateRangeFilter
            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
            reset={(resetFn) => (dateRangeFilterReset.current = resetFn)}
          />
        </div>
      </div>

      {/* 第二行 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("agentID")}</Label>
          <Input
            value={agentId ?? ""}
            onChange={(e) => setagentId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("roomeownerID")}</Label>
          <Input
            value={houseOwnerId ?? ""}
            onChange={(e) => setHouseOwnerId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("uperagentID")}</Label>
          <Input
            value={parentAgentId ?? ""}
            onChange={(e) => setParentAgentId(e.target.value)}
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
          <Button onClick={() => router.refresh()}>{t("search")}</Button>
          <Button>{t("download")}</Button>
        </div>
      </div>
    </div>
  );
}
