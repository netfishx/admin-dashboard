"use client";
import { DateRangeFilter } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { startOfDay } from "date-fns";
import { endOfDay } from "date-fns";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useRef } from "react";

export function ListFilter() {
  const t = useTranslations("report.agent");
  const [agentId, setAgentId] = useQueryState("agentId");
  const [roomId, setRoomId] = useQueryState<string[]>("roomId", {
    defaultValue: [],
    parse: (value) => value.split(",").filter(Boolean),
    serialize: (value) => value.join(","),
  });

  const roomTypes = [
    { id: "baccarat", label: "游戏大厅" },
    { id: "guandan", label: "俱乐部" },
  ];

  const handleRoomTypeChange = (roomType: string, checked: boolean) => {
    const currentTypes = roomId || [];
    if (checked) {
      setRoomId([...currentTypes, roomType].filter(Boolean));
    } else {
      setRoomId(currentTypes.filter((type) => type !== roomType));
    }
  };

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
    setRoomId([]);
    handleDateRangeFilterReset();
  };

  const isRoomTypeSelected = (roomType: string) => {
    return (roomId || []).includes(roomType);
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
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("agentID")}</Label>
          <Input
            value={agentId ?? ""}
            onChange={(e) => setAgentId(e.target.value)}
            placeholder={t("placeholderinput")}
          />
        </div>
      </div>

      {/* Second row */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center">
          <Label className="shrink-0">{t("roomType")}</Label>
          {roomTypes.map((room) => (
            <div key={room.id} className="flex items-center space-x-2">
              <Checkbox
                id={room.id}
                checked={isRoomTypeSelected(room.id)}
                onCheckedChange={(checked) =>
                  handleRoomTypeChange(room.id, checked as boolean)
                }
              />
              <label
                htmlFor={room.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {room.label}
              </label>
            </div>
          ))}
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
