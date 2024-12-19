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
import { useRouter } from "next/navigation";
import {
  parseAsBoolean,
  parseAsInteger,
  useQueryState,
  useQueryStates,
} from "nuqs";
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
      <span className="text-sm text-gray-500">
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
  const [dateRangeUrl, setDateRangeUrl] = useQueryStates({
    [startTimeText]: parseAsInteger.withDefault(0),
    [endTimeText]: parseAsInteger.withDefault(0),
  });
  const [dateRangeForm, setDateRangeForm] = useState({
    [startTimeText]: formDateRange?.from ?? 0,
    [endTimeText]: formDateRange?.to ?? 0,
  });

  const dateRange = isSearch ? dateRangeUrl : dateRangeForm;
  const setDateRange = isSearch ? setDateRangeUrl : setDateRangeForm;
  const [isSettledEmpty, setIsSettledEmpty] = useQueryState(
    "isSettledEmpty",
    parseAsBoolean.withDefault(false),
  );

  const router = useRouter();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    startTransition(async () => {
      // 来源于报表的搜索并且不允许日期为空时
      if (
        !(dateRange[startTimeText] && dateRange[endTimeText]) &&
        isSearch &&
        !isSettledEmpty
      ) {
        const today = new Date();
        await setDateRange({
          [startTimeText]: startOfDay(today).getTime(),
          [endTimeText]: endOfDay(today).getTime(),
        });
        router.refresh();
      }
    });
  }, [dateRange, isSearch, isSettledEmpty, startTimeText, endTimeText]);

  useEffect(() => {
    onDateRangeChange?.(dateRange[startTimeText], dateRange[endTimeText]);
  }, [dateRange, onDateRangeChange, startTimeText, endTimeText]);

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

    setDateRange({
      [startTimeText]: from.getTime(),
      [endTimeText]: to.getTime(),
    });
  };

  const handleTimeChange = (
    type: "start" | "end",
    timeUnit: "hours" | "minutes" | "seconds",
    value: string,
  ) => {
    const currentDate =
      type === "start"
        ? new Date(dateRange[startTimeText])
        : new Date(dateRange[endTimeText]);

    const newDate = set(currentDate, {
      [timeUnit]: Number.parseInt(value, 10),
    });

    setDateRange((prev) => {
      const updatedRange = {
        ...prev,
        [type === "start" ? startTimeText : endTimeText]: newDate.getTime(),
      };
      return updatedRange;
    });
  };

  const handleDateRangeChange = (range?: DateRange) => {
    if (range) {
      let from = range.from;
      let to = range.to;
      // 如果开始时间和结束时间相同，则设置为当天的00:00:00到23:59:59
      if (from && to && from.getTime() === to.getTime()) {
        return setDateRange({
          [startTimeText]: startOfDay(from).getTime(),
          [endTimeText]: endOfDay(to).getTime(),
        });
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
            hours: new Date(dateRange[startTimeText]).getHours(),
            minutes: new Date(dateRange[startTimeText]).getMinutes(),
            seconds: new Date(dateRange[startTimeText]).getSeconds(),
          })
        : undefined;

      const endDate = to
        ? set(to, {
            hours: new Date(dateRange[endTimeText]).getHours(),
            minutes: new Date(dateRange[endTimeText]).getMinutes(),
            seconds: new Date(dateRange[endTimeText]).getSeconds(),
          })
        : undefined;

      setDateRange({
        [startTimeText]: startDate?.getTime() ?? 0,
        [endTimeText]: endDate?.getTime() ?? 0,
      });
      setIsSettledEmpty(false);
    } else {
      setIsSettledEmpty(true);
      setDateRange({
        [startTimeText]: 0,
        [endTimeText]: 0,
      });
    }
  };

  const formattedDateRange = () => {
    if (!dateRange) {
      return t("choicedate");
    }

    if (!dateRange[startTimeText]) {
      return t("choicedate");
    }

    if (!dateRange[endTimeText]) {
      return format(dateRange[startTimeText], "yyyy-MM-dd HH:mm:ss");
    }

    return enableTimeSelect
      ? `${format(dateRange[startTimeText], "yyyy-MM-dd HH:mm:ss")} ~ ${format(
          dateRange[endTimeText],
          "yyyy-MM-dd HH:mm:ss",
        )}`
      : `${format(dateRange[startTimeText], "yyyy-MM-dd")} ~ ${format(
          dateRange[endTimeText],
          "yyyy-MM-dd",
        )}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
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
                dateRange[startTimeText] && dateRange[endTimeText]
                  ? {
                      from: new Date(dateRange[startTimeText]),
                      to: new Date(dateRange[endTimeText]),
                    }
                  : undefined
              }
              onSelect={handleDateRangeChange}
              numberOfMonths={1}
              defaultMonth={
                dateRange[startTimeText]
                  ? new Date(dateRange[startTimeText])
                  : today
              }
            />
            {enableTimeSelect && (
              <TimeSelect
                type="start"
                date={dateRange[startTimeText] || startOfDay(today).getTime()}
                onTimeChange={handleTimeChange}
              />
            )}
            {enableTimeSelect && (
              <TimeSelect
                type="end"
                date={dateRange[endTimeText] || endOfDay(today).getTime()}
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
