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
import {} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

export function ListFilter() {
  const t = useTranslations("report.member");
  const [supplierId, setSupplierId] = useQueryState("supplierId");
  const [gameId, setGameId] = useQueryState("gameId");
  const handleReset = () => {
    setSupplierId("");
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* First row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("gameId")}</Label>
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
          <Label>开奖日期</Label>
          <DateRangeFilter
            enableTimeSelect
            startTimeText="openStartTime"
            endTimeText="openEndTime"
          />
        </div>
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("memberId")}</Label>
          <Input
            value={supplierId ?? ""}
            onChange={(e) => setSupplierId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
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
          <Button>{t("search")}</Button>
        </div>
      </div>
    </div>
  );
}
