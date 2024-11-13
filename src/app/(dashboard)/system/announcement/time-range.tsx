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

export function TimeRange({
  onDateRangeChange,
  range,
}: {
  onDateRangeChange: (startStr: string, endStr: string) => void;
  range: [string, string];
}) {
  const t = useTranslations("system.announcement");
  const toDate = (input: string) => {
    // biome-ignore lint/performance/useTopLevelRegex: <explanation>
    if (/^\d+$/.test(input)) {
      return new Date(Number(input));
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      // 含有非数字字符的字符串，认为是日期字符串
      return new Date(input.replace(" ", "T"));
    }
  };
  // 使用 range 初始化 dateRange
  const initialDateRange =
    range[0] && range[1]
      ? {
          from: toDate(range[0]),
          to: toDate(range[1]),
        }
      : {
          from: startOfDay(Date.now()),
          to: endOfDay(Date.now()),
        };
  const initialStartTime =
    range[0] && range[1]
      ? {
          hours: toDate(range[0]).getHours(),
          minutes: toDate(range[0]).getMinutes(),
          seconds: toDate(range[0]).getSeconds(),
        }
      : { hours: 0, minutes: 0, seconds: 0 };
  const initialEndTime =
    range[0] && range[1]
      ? {
          hours: toDate(range[1]).getHours(),
          minutes: toDate(range[1]).getMinutes(),
          seconds: toDate(range[1]).getSeconds(),
        }
      : { hours: 23, minutes: 59, seconds: 59 };

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);

  function handleDateRangeChange(range: { from: Date; to: Date } | undefined) {
    if (range) {
      setDateRange(range);
    }
  }
  useEffect(() => {
    onDateRangeChange(
      formatDateWithTime(dateRange?.from, startTime),
      formatDateWithTime(dateRange?.to, endTime),
    );
  }, [dateRange, startTime, endTime, onDateRangeChange]);

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
              <>
                {formatDateWithTime(dateRange.from, startTime)}
                {dateRange.to &&
                  ` ~ ${formatDateWithTime(dateRange.to, endTime)}`}
              </>
            ) : (
              <span>{t("selectTime")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(value) =>
                value &&
                handleDateRangeChange(value as { from: Date; to: Date })
              }
              numberOfMonths={1}
            />
            <div className="mt-4 pl-10">
              <div className="mb-4">
                <p className="mb-2 text-sm font-medium">{t("startTime")}</p>
                <div className="flex gap-2">
                  <Select
                    defaultValue={startTime.hours.toString()}
                    value={startTime.hours.toString()}
                    onValueChange={(value) =>
                      handleTimeChange("start", "hours", value)
                    }
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder={t("hours")} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={Math.random()} value={i.toString()}>
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
                      <SelectValue placeholder={t("minutes")} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem key={Math.random()} value={i.toString()}>
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
                      <SelectValue placeholder={t("seconds")} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem key={Math.random()} value={i.toString()}>
                          {i.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">{t("endTime")}</p>
                <div className="flex gap-2">
                  <Select
                    defaultValue={endTime.hours.toString()}
                    value={endTime.hours.toString()}
                    onValueChange={(value) =>
                      handleTimeChange("end", "hours", value)
                    }
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder={t("hours")} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={Math.random()} value={i.toString()}>
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
                      <SelectValue placeholder={t("minutes")} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem key={Math.random()} value={i.toString()}>
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
                      <SelectValue placeholder={t("seconds")} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem key={Math.random()} value={i.toString()}>
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
