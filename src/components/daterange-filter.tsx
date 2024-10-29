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
  subWeeks,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQueryStates } from "nuqs";
import { useEffect, useState } from "react";

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangeFilterProps {
  onChange?: (range: { from: number; to: number }) => void;
  quickSetBtn?: string[];
}

const TODAY = "today";
const YESTERDAY = "yesterday";
const WEEK = "week";
const LASTWEEK = "lastweek";
const MONTH = "month";
const LASTMONTH = "lastmonth";

function DateRangeFilter(props: DateRangeFilterProps) {
  const {
    onChange,
    quickSetBtn = [TODAY, YESTERDAY, WEEK, LASTWEEK, MONTH, LASTMONTH],
  } = props;
  const t = useTranslations("report.orderlist");
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });

  const today = new Date();
  const [, setTime] = useQueryStates({
    startTime: { parse: Number, default: startOfDay(today).getTime() },
    endTime: { parse: Number, default: endOfDay(today).getTime() },
  });

  useEffect(() => {
    setTime({
      startTime: startOfDay(today).getTime(),
      endTime: endOfDay(today).getTime(),
    });
  }, []);

  const formatDateRange = (range: DateRange): { from: number; to: number } => {
    return {
      from: startOfDay(range.from).getTime(),
      to: range.to
        ? endOfDay(range.to).getTime()
        : endOfDay(range.from).getTime(),
    };
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    const formattedRange = formatDateRange(range);
    onChange?.(formattedRange);
  };

  const handleQuickSelect = (type: string) => {
    const today = new Date();
    let from: Date;
    let to: Date;

    switch (type) {
      case TODAY: {
        from = startOfDay(today);
        to = endOfDay(today);
        break;
      }
      case YESTERDAY: {
        const yesterday = subDays(today, 1);
        from = startOfDay(yesterday);
        to = endOfDay(yesterday);
        break;
      }
      case WEEK: {
        from = startOfWeek(today, { weekStartsOn: 1 });
        to = endOfDay(today);
        break;
      }
      case LASTWEEK: {
        const lastWeek = subWeeks(today, 1);
        from = startOfWeek(lastWeek, { weekStartsOn: 1 });
        to = endOfWeek(lastWeek, { weekStartsOn: 1 });
        break;
      }
      case MONTH: {
        from = startOfMonth(today);
        to = endOfDay(today);
        break;
      }
      case LASTMONTH: {
        const lastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1,
        );
        from = startOfMonth(lastMonth);
        to = endOfMonth(lastMonth);
        break;
      }
      default:
        return;
    }

    const range = { from, to };
    setDateRange(range);
    const formattedRange = formatDateRange(range);
    onChange?.(formattedRange);
  };

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
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "yyyy-MM-dd")} ~{" "}
                  {format(dateRange.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(dateRange.from, "yyyy-MM-dd")
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
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => handleDateRangeChange(range as DateRange)}
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

export default DateRangeFilter;
