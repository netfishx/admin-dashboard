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
import { startOfDay } from "date-fns";
import { endOfDay } from "date-fns";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useRef } from "react";
export function ListFilter({
  hasSearchPermission,
}: { hasSearchPermission: boolean }) {
  const t = useTranslations("report.agent");
  const router = useRouter();
  const [agentId, setAgentId] = useQueryState("agentId", {
    defaultValue: "",
  });
  const [roomId, setRoomId] = useQueryState("roomId", {
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
    setAgentId("");
    setRoomId("all");
    handleDateRangeFilterReset();
  };

  const handleSearch = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      {/* First row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label>{t("pickdate")}</Label>
          <DateRangeFilter
            enableTimeSelect
            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
            reset={(resetFn) => (dateRangeFilterReset.current = resetFn)}
          />
        </div>
        {hasSearchPermission && (
          <div className="flex gap-4 items-center">
            <Label className="shrink-0">{t("agentID")}</Label>
            <Input
              value={agentId ?? ""}
              onChange={(e) => setAgentId(e.target.value)}
              placeholder={t("placeholderinput")}
            />
          </div>
        )}
      </div>

      {/* Second row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Label className="shrink-0">{t("roomType")}</Label>
          <Select
            value={roomId ?? ""}
            onValueChange={(value) => setRoomId(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("placeholderselect")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              <SelectItem value="1">{t("gameHall")}</SelectItem>
              <SelectItem value="2">{t("club")}</SelectItem>
            </SelectContent>
          </Select>
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
          <Button onClick={handleSearch}>{t("search")}</Button>
          <Button>{t("download")}</Button>
        </div>
      </div>
    </div>
  );
}
