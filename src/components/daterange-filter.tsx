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
import { parseAsInteger, useQueryStates } from "nuqs";
import { memo, startTransition, useCallback, useEffect, useMemo } from "react";
import type { DateRange } from "react-day-picker";

export const today = new Date();
export const times = {
  startTime: startOfDay(today).getTime(),
  endTime: endOfDay(today).getTime(),
};

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

    // 使用 useMemo 缓存 SelectContent 内容
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
  enableTimeSelect = true, // 新增的属性
}: {
  quickSetBtn?: rangeType[];
  enableTimeSelect?: boolean;
}) {
  const t = useTranslations("report.orderlist");

  const [dateRange, setDateRange] = useQueryStates({
    startTime: parseAsInteger
      .withDefault(startOfDay(today).getTime())
      .withOptions({
        clearOnDefault: false,
      }),
    endTime: parseAsInteger.withDefault(endOfDay(today).getTime()).withOptions({
      clearOnDefault: false,
    }),
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    startTransition(async () => {
      await setDateRange({
        startTime: startOfDay(today).getTime(),
        endTime: endOfDay(today).getTime(),
      });
    });
  }, []);

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
      setDateRange({ startTime: from.getTime(), endTime: to.getTime() });
    },
    [setDateRange],
  );

  const handleTimeChange = useCallback(
    (
      type: "start" | "end",
      timeUnit: "hours" | "minutes" | "seconds",
      value: string,
    ) => {
      const currentDate =
        type === "start"
          ? new Date(dateRange.startTime)
          : new Date(dateRange.endTime);

      const newDate = set(currentDate, {
        [timeUnit]: Number.parseInt(value, 10),
      });

      setDateRange((prev) => ({
        ...prev,
        [type === "start" ? "startTime" : "endTime"]: newDate.getTime(),
      }));
    },
    [dateRange.startTime, dateRange.endTime, setDateRange],
  );

  const handleDateRangeChange = useCallback(
    (range?: DateRange) => {
      if (range) {
        const startDate = range.from
          ? set(range.from, {
              hours: new Date(dateRange.startTime).getHours(),
              minutes: new Date(dateRange.startTime).getMinutes(),
              seconds: new Date(dateRange.startTime).getSeconds(),
            })
          : undefined;

        const endDate = range.to
          ? set(endOfDay(range.to), {
              hours: new Date(dateRange.endTime).getHours(),
              minutes: new Date(dateRange.endTime).getMinutes(),
              seconds: new Date(dateRange.endTime).getSeconds(),
            })
          : undefined;

        setDateRange({
          startTime: startDate?.getTime(),
          endTime: endDate?.getTime(),
        });
      }
    },
    [dateRange.startTime, dateRange.endTime, setDateRange],
  );

  const formattedDateRange = useMemo(() => {
    if (!dateRange?.startTime) {
      return t("choicedate");
    }

    if (!dateRange.endTime) {
      return format(dateRange.startTime, "yyyy-MM-dd HH:mm:ss");
    }

    return enableTimeSelect
      ? `${format(dateRange.startTime, "yyyy-MM-dd HH:mm:ss")} ~ ${format(
          dateRange.endTime,
          "yyyy-MM-dd HH:mm:ss",
        )}`
      : `${format(dateRange.startTime, "yyyy-MM-dd")} ~ ${format(
          dateRange.endTime,
          "yyyy-MM-dd",
        )}`;
  }, [dateRange?.startTime, dateRange?.endTime, t, enableTimeSelect]);

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
                from: new Date(dateRange?.startTime),
                to: new Date(dateRange?.endTime),
              }}
              onSelect={handleDateRangeChange}
              numberOfMonths={1}
            />
            {enableTimeSelect && dateRange?.startTime && (
              <TimeSelect
                type="start"
                date={dateRange.startTime}
                onTimeChange={handleTimeChange}
              />
            )}
            {enableTimeSelect && dateRange?.endTime && (
              <TimeSelect
                type="end"
                date={dateRange.endTime}
                onTimeChange={handleTimeChange}
              />
            )}
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex gap-2">
        {quickSetBtn?.map((type) => (
          <Button key={type} onClick={() => handleQuickSelect(type)}>
            {t(type)}
          </Button>
        ))}
      </div>
    </div>
  );
}
