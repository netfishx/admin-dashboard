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
  endOfWeek,
  format,
  startOfDay,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface DateRangeFilterProps {
  onChange?: (range: { from: number; to: number } | null) => void;
  quickSetBtn?: string[];
}

const TODAY = "today";
const YESTERDAY = "yesterday";
const WEEK = "week";
const LASTWEEK = "lastweek";
const MONTH = "month";
const LASTMONTH = "lastmonth";

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  onChange,
  quickSetBtn = [TODAY, YESTERDAY, WEEK, LASTWEEK, MONTH, LASTMONTH],
}) => {
  const t = useTranslations("report.orderlist");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const [activeButton, setActiveButton] = useState<string | null>("today");

  // Format date range to timestamps
  const formatDateRange = (range: DateRange): { from: number; to: number } | null => {
    if (!range || !range.from) return null;

    return {
      from: startOfDay(range.from).getTime(),
      to: range.to ? endOfDay(range.to).getTime() : endOfDay(range.from).getTime(),
    };
  };

  // Handle date range change
  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    setActiveButton(null);
    const formattedRange = formatDateRange(range);
    onChange?.(formattedRange);
  };

  // Handle quick select button click
  const handleQuickSelect = (type: string) => {
    const today = new Date();
    let from = new Date();
    let to = new Date();

    switch (type) {
      case TODAY: {
        from = today;
        to = today;
        break;
      }
      case YESTERDAY: {
        from = new Date(today.setDate(today.getDate() - 1));
        to = new Date(from);
        break;
      }
      case WEEK: {
        from = startOfWeek(today, { weekStartsOn: 1 });
        to = new Date();
        break;
      }
      case LASTWEEK: {
        const lastWeek = subWeeks(today, 1);
        from = startOfWeek(lastWeek, { weekStartsOn: 1 });
        to = endOfWeek(lastWeek, { weekStartsOn: 1 });
        break;
      }
      case MONTH: {
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        to = new Date();
        break;
      }
      case LASTMONTH: {
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        to = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      }
      default:
        break;
    }
    const range: DateRange = { from, to };
    setDateRange(range);
    setActiveButton(type);
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
            defaultMonth={dateRange?.from ?? undefined}
            selected={dateRange as any}
            onSelect={(range) => handleDateRangeChange(range as DateRange)}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      <div className="flex gap-2">
        {quickSetBtn?.map((type) => (
          <Button
            key={type}
            variant={"outline"}
            onClick={() => handleQuickSelect(type)}
          >
            {t(type)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DateRangeFilter;
