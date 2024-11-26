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
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryStates } from "nuqs";
import { memo, startTransition, useCallback, useEffect, useMemo } from "react";
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

// Extracted TimeSelect as a separate component
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
  reset,
}: {
  quickSetBtn?: rangeType[];
  enableTimeSelect?: boolean;
  startTimeText?: string;
  endTimeText?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onChange?: (dateRange: any) => void;
  reset?: (resetFn: (start: number, end: number) => void) => void;
}) {
  const today = new Date();
  const t = useTranslations("report.orderlist");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [dateRange, setDateRange] = useQueryStates({
    [startTimeText]: parseAsInteger.withDefault(0),
    [endTimeText]: parseAsInteger.withDefault(0),
  });

  // Move the initialization logic to useEffect
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const startTimeFromUrl = searchParams.get(startTimeText);
    const endTimeFromUrl = searchParams.get(endTimeText);

    const initialStartTime = startTimeFromUrl
      ? Number.parseInt(startTimeFromUrl, 10)
      : startOfDay(today).getTime();

    const initialEndTime = endTimeFromUrl
      ? Number.parseInt(endTimeFromUrl, 10)
      : endOfDay(today).getTime();

    setDateRange({
      [startTimeText]: initialStartTime,
      [endTimeText]: initialEndTime,
    });
    if (!startTimeFromUrl || !endTimeFromUrl) {
      router.refresh();
    }
  }, []);

  const resetDateRange = (start: number, end: number) => {
    setDateRange({
      [startTimeText]: start,
      [endTimeText]: end,
    });
    onChange?.({
      [startTimeText]: start,
      [endTimeText]: end,
    });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (reset) {
      reset(resetDateRange);
    }
  }, [reset]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    startTransition(async () => {
      onChange?.({
        [startTimeText]: dateRange[startTimeText],
        [endTimeText]: dateRange[endTimeText],
      });
    });
  }, [dateRange[startTimeText], dateRange[endTimeText]]);

  const handleClear = () => {
    setDateRange(null);
    onChange?.(null);
  };

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
        let from = range.from;

        if (from?.getTime() === 0) {
          from = today;
        }

        const startDate = from
          ? set(from, {
              hours: new Date(dateRange[startTimeText]).getHours(),
              minutes: new Date(dateRange[startTimeText]).getMinutes(),
              seconds: new Date(dateRange[startTimeText]).getSeconds(),
            })
          : undefined;

        const endDate = range.to
          ? set(range.to, {
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
      } else {
        handleClear();
      }
    },
    [dateRange[startTimeText], dateRange[endTimeText], setDateRange],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const formattedDateRange = useMemo(() => {
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
  }, [dateRange]);

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
            {formattedDateRange}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-2">
            <Calendar
              autoFocus
              mode="range"
              selected={
                dateRange
                  ? {
                      from: new Date(dateRange[startTimeText]),
                      to: new Date(dateRange[endTimeText]),
                    }
                  : undefined
              }
              onSelect={handleDateRangeChange}
              numberOfMonths={1}
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
