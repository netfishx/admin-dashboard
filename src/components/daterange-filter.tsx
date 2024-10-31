import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { } from "next/navigation";
import { parseAsInteger, useQueryStates } from "nuqs";
import { useEffect } from "react";
import type { DateRange } from "react-day-picker";

export const today = new Date();
export const times = {
  startTime: startOfDay(today).getTime(),
  endTime: endOfDay(today).getTime(),
}

type rangeType =
  | "today"
  | "yesterday"
  | "week"
  | "lastweek"
  | "month"
  | "lastmonth";

export function DateRangeFilter({
  quickSetBtn = [
    "today",
    "yesterday",
    "week",
    "lastweek",
    "month",
    "lastmonth",
  ],
}: {
  quickSetBtn?: rangeType[];
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
    setDateRange({
      startTime: startOfDay(today).getTime(),
      endTime: endOfDay(today).getTime(),
    });
  }, []);

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
    setDateRange({ startTime: from.getTime(), endTime: to.getTime() });
  };

  function handleDateRangeChange(range?: DateRange) {
    if (range) {
      setDateRange({
        startTime: range.from?.getTime(),
        endTime: range.to ? endOfDay(range.to).getTime() : undefined,
      });
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-[280px]",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.startTime ? (
              dateRange.endTime ? (
                <>
                  {format(dateRange.startTime, "yyyy-MM-dd")} ~{" "}
                  {format(dateRange.endTime, "yyyy-MM-dd")}
                </>
              ) : (
                format(dateRange.startTime, "yyyy-MM-dd")
              )
            ) : (
              <span>{t("choicedate")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            autoFocus
            mode="range"
            selected={{
              from: new Date(dateRange?.startTime),
              to: new Date(dateRange?.endTime),
            }}
            onSelect={(range) => handleDateRangeChange(range)}
            numberOfMonths={1}
          />
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
