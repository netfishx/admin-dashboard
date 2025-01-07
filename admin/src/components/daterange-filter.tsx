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
  endOfMonth,
  endOfWeek,
  format,
  set,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { parseAsBoolean, parseAsInteger, useQueryState } from "nuqs";
import { startTransition, useCallback, useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
type rangeType =
  | "today"
  | "yesterday"
  | "week"
  | "lastweek"
  | "month"
  | "lastmonth";

// Cached time options
const TIME_OPTIONS = {
  hours: Array.from({ length: 24 }, (_, i) => ({
    value: i.toString().padStart(2, "0"),
    label: i.toString().padStart(2, "0"),
  })),
  minutes: Array.from({ length: 60 }, (_, i) => ({
    value: i.toString().padStart(2, "0"),
    label: i.toString().padStart(2, "0"),
  })),
  seconds: Array.from({ length: 60 }, (_, i) => ({
    value: i.toString().padStart(2, "0"),
    label: i.toString().padStart(2, "0"),
  })),
};

const TimeSelect = ({
  type,
  date,
  onTimeChange,
}: {
  type: "start" | "end";
  date: number;
  onTimeChange: (
    type: "start" | "end",
    timeUnit: "hours" | "minutes" | "seconds",
    value: string,
  ) => void;
}) => {
  const currentDate = new Date(date);
  const currentHour = currentDate.getHours().toString().padStart(2, "0");
  const currentMinute = currentDate.getMinutes().toString().padStart(2, "0");
  const currentSecond = currentDate.getSeconds().toString().padStart(2, "0");
  const t = useTranslations("report.orderlist");

  const handleChange = useCallback(
    (timeUnit: "hours" | "minutes" | "seconds", value: string) => {
      onTimeChange(type, timeUnit, value);
    },
    [type, onTimeChange],
  );

  return (
    <div className="flex items-center gap-2 p-2">
      <span className="text-foreground/80 text-sm">
        {type === "start" ? t("startTime") : t("endTime")}
      </span>
      <Select
        value={currentHour}
        onValueChange={(value) => handleChange("hours", value)}
      >
        <SelectTrigger className="w-16">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TIME_OPTIONS.hours.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={currentMinute}
        onValueChange={(value) => handleChange("minutes", value)}
      >
        <SelectTrigger className="w-16">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TIME_OPTIONS.minutes.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={currentSecond}
        onValueChange={(value) => handleChange("seconds", value)}
      >
        <SelectTrigger className="w-16">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TIME_OPTIONS.seconds.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

TimeSelect.displayName = "TimeSelect";

export function DateRangeFilter({
  quickSetBtn = [
    "today",
    "yesterday",
    "week",
    "lastweek",
    "month",
    "lastmonth",
  ],
  enableTimeSelect = true,
  startTimeText = "startTime",
  endTimeText = "endTime",
  isSearch = true, // true： 来自于搜索组件， false： 来自于表单
  formDateRange, // 表单里传过来的日期范围
  onDateRangeChange,
  disabled = false,
}: {
  quickSetBtn?: rangeType[];
  enableTimeSelect?: boolean;
  startTimeText?: string;
  endTimeText?: string;
  isSearch?: boolean;
  formDateRange?: { from: number; to: number };
  onDateRangeChange?: (startTime: number, endTime: number) => void;
  disabled?: boolean;
}) {
  const t = useTranslations("report.orderlist");
  const today = new Date();

  const [startTimeUrl, setStartTimeUrl] = useQueryState(
    startTimeText,
    parseAsInteger.withDefault(0),
  );
  const [endTimeUrl, setEndTimeUrl] = useQueryState(
    endTimeText,
    parseAsInteger.withDefault(0),
  );
  const [startTimeForm, setStartTimeForm] = useState(formDateRange?.from ?? 0);
  const [endTimeForm, setEndTimeForm] = useState(formDateRange?.to ?? 0);

  const startTime = isSearch ? startTimeUrl : startTimeForm;
  const endTime = isSearch ? endTimeUrl : endTimeForm;
  const setStartTime = isSearch ? setStartTimeUrl : setStartTimeForm;
  const setEndTime = isSearch ? setEndTimeUrl : setEndTimeForm;
  const [isSettledEmpty, setIsSettledEmpty] = useQueryState(
    "isSettledEmpty",
    parseAsBoolean.withDefault(false),
  );

  const router = useTransitionRouter();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    startTransition(async () => {
      // 来源于报表的搜索并且不允许日期为空时
      if (!(startTime && endTime) && isSearch && !isSettledEmpty) {
        const today = new Date();
        await Promise.all([
          setStartTime(startOfDay(today).getTime()),
          setEndTime(endOfDay(today).getTime()),
        ]);
        router.refresh();
      }
    });
  }, [
    startTime,
    endTime,
    isSearch,
    isSettledEmpty,
    startTimeText,
    endTimeText,
  ]);

  useEffect(() => {
    onDateRangeChange?.(startTime, endTime);
  }, [startTime, endTime, onDateRangeChange]);

  const handleQuickSelect = (type: string) => {
    let from: Date;
    let to: Date;

    switch (type) {
      case "today": {
        from = startOfDay(today);
        to = endOfDay(today);
        break;
      }
      case "yesterday": {
        const yesterday = subDays(today, 1);
        from = startOfDay(yesterday);
        to = endOfDay(yesterday);
        break;
      }
      case "week": {
        from = startOfWeek(today, { weekStartsOn: 1 });
        to = endOfWeek(today, { weekStartsOn: 1 });
        break;
      }
      case "lastweek": {
        const lastWeek = subWeeks(today, 1);
        from = startOfWeek(lastWeek, { weekStartsOn: 1 });
        to = endOfWeek(lastWeek, { weekStartsOn: 1 });
        break;
      }
      case "month": {
        from = startOfMonth(today);
        to = endOfMonth(today);
        break;
      }
      case "lastmonth": {
        const lastMonth = subMonths(today, 1);
        from = startOfMonth(lastMonth);
        to = endOfMonth(lastMonth);
        break;
      }
      default:
        return;
    }

    setStartTime(from.getTime());
    setEndTime(to.getTime());
  };

  const handleTimeChange = (
    type: "start" | "end",
    timeUnit: "hours" | "minutes" | "seconds",
    value: string,
  ) => {
    const currentDate =
      type === "start" ? new Date(startTime) : new Date(endTime);

    const newDate = set(currentDate, {
      [timeUnit]: Number.parseInt(value, 10),
    });

    if (type === "start") {
      setStartTime(newDate.getTime());
      onDateRangeChange?.(newDate.getTime(), endTime);
    } else {
      setEndTime(newDate.getTime());
      onDateRangeChange?.(startTime, newDate.getTime());
    }
  };

  const handleDateRangeChange = (range?: DateRange) => {
    let from = range?.from;
    let to = range?.to;
    // 如果开始时间和结束时间相同，则设置为当天的00:00:00到23:59:59
    if (from && to && from.getTime() === to.getTime()) {
      setStartTime(startOfDay(from).getTime());
      setEndTime(endOfDay(to).getTime());
      return;
    }

    if (from?.getTime() === 0) {
      from = today;
    }

    if (from && to && from.getTime() > to.getTime()) {
      const temp = from;
      from = to;
      to = temp;
    }

    const startDate = from
      ? set(from, {
          hours: new Date(startTime).getHours(),
          minutes: new Date(startTime).getMinutes(),
          seconds: new Date(startTime).getSeconds(),
        })
      : undefined;

    const endDate = to
      ? set(to, {
          hours: new Date(endTime).getHours(),
          minutes: new Date(endTime).getMinutes(),
          seconds: new Date(endTime).getSeconds(),
        })
      : undefined;

    setStartTime(startDate?.getTime() ?? 0);
    setEndTime(endDate?.getTime() ?? 0);
    setIsSettledEmpty(!range);

    onDateRangeChange?.(startDate?.getTime() ?? 0, endDate?.getTime() ?? 0);
  };

  const formattedDateRange = () => {
    if (!startTime) {
      return t("choicedate");
    }

    if (!endTime) {
      return format(startTime, "yyyy-MM-dd HH:mm:ss");
    }

    return enableTimeSelect
      ? `${format(startTime, "yyyy-MM-dd HH:mm:ss")} ~ ${format(
          endTime,
          "yyyy-MM-dd HH:mm:ss",
        )}`
      : `${format(startTime, "yyyy-MM-dd")} ~ ${format(endTime, "yyyy-MM-dd")}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !startTime && "text-muted-foreground",
              enableTimeSelect ? "w-100" : "w-70",
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-2">
            <Calendar
              autoFocus
              mode="range"
              selected={
                startTime && endTime
                  ? {
                      from: new Date(startTime),
                      to: new Date(endTime),
                    }
                  : undefined
              }
              onSelect={handleDateRangeChange}
              defaultMonth={startTime ? new Date(startTime) : today}
            />
            {enableTimeSelect && (
              <TimeSelect
                type="start"
                date={startTime || startOfDay(today).getTime()}
                onTimeChange={handleTimeChange}
              />
            )}
            {enableTimeSelect && (
              <TimeSelect
                type="end"
                date={endTime || endOfDay(today).getTime()}
                onTimeChange={handleTimeChange}
              />
            )}
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex gap-2">
        {quickSetBtn?.map((type) => (
          <Button size="sm" key={type} onClick={() => handleQuickSelect(type)}>
            {t(type)}
          </Button>
        ))}
      </div>
    </div>
  );
}
