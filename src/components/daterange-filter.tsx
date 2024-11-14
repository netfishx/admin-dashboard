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
import { useSearchParams } from "next/navigation";
import { parseAsInteger, useQueryStates } from "nuqs";
import { memo, startTransition, useCallback, useEffect, useMemo } from "react";
import type { DateRange } from "react-day-picker";

export const today = new Date();

type rangeType =
  | "today"
  | "yesterday"
  | "week"
  | "lastweek"
  | "month"
  | "lastmonth";

// 缓存时间选项
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

export const times = {
  startTime: startOfDay(today).getTime(),
  endTime: endOfDay(today).getTime(),
};

// 提取 TimeSelect 为独立组件
const TimeSelect = memo(
  ({
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

    const hourOptions = useMemo(
      () => (
        <SelectContent>
          {TIME_OPTIONS.hours.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      ),
      [],
    );

    const minuteOptions = useMemo(
      () => (
        <SelectContent>
          {TIME_OPTIONS.minutes.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      ),
      [],
    );

    const secondOptions = useMemo(
      () => (
        <SelectContent>
          {TIME_OPTIONS.seconds.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      ),
      [],
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
          {hourOptions}
        </Select>
        <Select
          value={currentMinute}
          onValueChange={(value) => handleChange("minutes", value)}
        >
          <SelectTrigger className="w-16">
            <SelectValue />
          </SelectTrigger>
          {minuteOptions}
        </Select>
        <Select
          value={currentSecond}
          onValueChange={(value) => handleChange("seconds", value)}
        >
          <SelectTrigger className="w-16">
            <SelectValue />
          </SelectTrigger>
          {secondOptions}
        </Select>
      </div>
    );
  },
);

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
  onChange = () => {},
}: {
  quickSetBtn?: rangeType[];
  enableTimeSelect?: boolean;
  startTimeText?: string;
  endTimeText?: string;
  onChange?: (dateRange: any) => void;
}) {
  const t = useTranslations("report.orderlist");
  const searchParams = useSearchParams();

  // 从 URL 参数中获取 startTime 和 endTime 值
  const startTimeFromUrl = searchParams.get(startTimeText);
  const endTimeFromUrl = searchParams.get(endTimeText);

  const [dateRange, setDateRange] = useQueryStates({
    [startTimeText]: parseAsInteger
      .withDefault(
        startTimeFromUrl
          ? Number.parseInt(startTimeFromUrl, 10)
          : startOfDay(today).getTime(),
      )
      .withOptions({ clearOnDefault: false }),
    [endTimeText]: parseAsInteger
      .withDefault(
        endTimeFromUrl
          ? Number.parseInt(endTimeFromUrl, 10)
          : endOfDay(today).getTime(),
      )
      .withOptions({ clearOnDefault: false }),
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setDateRange({
      [startTimeText]: startTimeFromUrl
        ? Number.parseInt(startTimeFromUrl, 10)
        : startOfDay(today).getTime(),
      [endTimeText]: endTimeFromUrl
        ? Number.parseInt(endTimeFromUrl, 10)
        : endOfDay(today).getTime(),
    });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    startTransition(async () => {
      onChange?.({
        [startTimeText]: dateRange[startTimeText],
        [endTimeText]: dateRange[endTimeText],
      });
    });
  }, [dateRange[startTimeText], dateRange[endTimeText]]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleQuickSelect = useCallback(
    (type: string) => {
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
      onChange?.({
        [startTimeText]: from.getTime(),
        [endTimeText]: to.getTime(),
      });
    },
    [setDateRange, onChange],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleTimeChange = useCallback(
    (
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
        onChange?.(updatedRange);
        return updatedRange;
      });
    },
    [dateRange[startTimeText], dateRange[endTimeText], setDateRange, onChange],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleDateRangeChange = useCallback(
    (range?: DateRange) => {
      if (range) {
        const startDate = range.from
          ? set(range.from, {
              hours: new Date(dateRange[startTimeText]).getHours(),
              minutes: new Date(dateRange[startTimeText]).getMinutes(),
              seconds: new Date(dateRange[startTimeText]).getSeconds(),
            })
          : undefined;

        const endDate = range.to
          ? set(endOfDay(range.to), {
              hours: new Date(dateRange[endTimeText]).getHours(),
              minutes: new Date(dateRange[endTimeText]).getMinutes(),
              seconds: new Date(dateRange[endTimeText]).getSeconds(),
            })
          : undefined;

        setDateRange({
          [startTimeText]: startDate?.getTime(),
          [endTimeText]: endDate?.getTime(),
        });
        onChange?.({
          [startTimeText]: startDate?.getTime(),
          [endTimeText]: endDate?.getTime(),
        });
      }
    },
    [dateRange[startTimeText], dateRange[endTimeText], setDateRange],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const formattedDateRange = useMemo(() => {
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
  }, [dateRange[startTimeText], dateRange[endTimeText], t, enableTimeSelect]);

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{formattedDateRange}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-2">
            <Calendar
              autoFocus
              mode="range"
              selected={{
                from: new Date(dateRange[startTimeText]),
                to: new Date(dateRange[endTimeText]),
              }}
              onSelect={handleDateRangeChange}
              numberOfMonths={1}
            />
            {enableTimeSelect && dateRange[startTimeText] && (
              <TimeSelect
                type="start"
                date={dateRange[startTimeText]}
                onTimeChange={handleTimeChange}
              />
            )}
            {enableTimeSelect && dateRange[endTimeText] && (
              <TimeSelect
                type="end"
                date={dateRange[endTimeText]}
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
