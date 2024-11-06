"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  endOfDay,
  format,
  setHours,
  setMinutes,
  setSeconds,
  startOfDay,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

export const today = new Date();
export const times = {
  startTime: startOfDay(today).getTime(),
  endTime: endOfDay(today).getTime(),
};

export function DateRangeModal({
  onDateRangeChange,
}: { onDateRangeChange: (startDateTime: string) => void }) {
  const t = useTranslations("report.orderlist");

  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfDay(today),
    to: endOfDay(today),
  });
  const [startTime, setStartTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [endTime, setEndTime] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  useEffect(() => {
    setDateRange({
      from: startOfDay(today),
      to: endOfDay(today),
    });
  }, []);

  function handleDateRangeChange(range: DateRange | undefined) {
    if (range) {
      setDateRange(range);
    }
  }

  function handleTimeChange(
    type: "start" | "end",
    field: "hours" | "minutes" | "seconds",
    value: string,
  ) {
    const timeState = type === "start" ? startTime : endTime;
    const setTimeState = type === "start" ? setStartTime : setEndTime;
    setTimeState({ ...timeState, [field]: Number.parseInt(value) });
  }

  const formatDateWithTime = (
    date: Date | undefined,
    time: { hours: number; minutes: number; seconds: number },
  ) => {
    if (!date) {
      return "";
    }
    const dateWithTime = setSeconds(
      setMinutes(setHours(date, time.hours), time.minutes),
      time.seconds,
    );
    onDateRangeChange(format(dateWithTime, "yyyy-MM-dd HH:mm:ss"));
    return format(dateWithTime, "yyyy-MM-dd HH:mm:ss");
  };

  return (
    <div className="flex items-center gap-2 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-[360px]",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {formatDateWithTime(dateRange.from, startTime)} ~{" "}
                  {formatDateWithTime(dateRange.to, endTime)}
                </>
              ) : (
                formatDateWithTime(dateRange.from, startTime)
              )
            ) : (
              <span>{t("choicedate")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={1}
            />
            <div className="mt-4 pl-10">
              <div className="mb-4">
                <p className="mb-2 text-sm font-medium">开始时间</p>
                <div className="flex gap-2">
                  <Select
                    defaultValue={startTime.hours.toString()}
                    value={startTime.hours.toString()}
                    onValueChange={(value) =>
                      handleTimeChange("start", "hours", value)
                    }
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="时" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    defaultValue={startTime.minutes.toString()}
                    value={startTime.minutes.toString()}
                    onValueChange={(value) =>
                      handleTimeChange("start", "minutes", value)
                    }
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="分" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    defaultValue={startTime.seconds.toString()}
                    value={startTime.seconds.toString()}
                    onValueChange={(value) =>
                      handleTimeChange("start", "seconds", value)
                    }
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="秒" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">结束时间</p>
                <div className="flex gap-2">
                  <Select
                    defaultValue={endTime.hours.toString()}
                    value={endTime.hours.toString()}
                    onValueChange={(value) =>
                      handleTimeChange("end", "hours", value)
                    }
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="时" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    defaultValue={endTime.minutes.toString()}
                    value={endTime.minutes.toString()}
                    onValueChange={(value) =>
                      handleTimeChange("end", "minutes", value)
                    }
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="分" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    defaultValue={endTime.seconds.toString()}
                    value={endTime.seconds.toString()}
                    onValueChange={(value) =>
                      handleTimeChange("end", "seconds", value)
                    }
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="秒" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
