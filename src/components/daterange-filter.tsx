import React, { useEffect, useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, startOfDay, endOfDay, subWeeks, startOfWeek, endOfWeek } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface DateRangeFilterProps {
  onChange?: (range: { from: string; to: string } | null) => void;
}

const TODAY = "today"
const YESTERDAY = "yesterday"
const WEEK = "week"
const LASTWEEK = "lastweek"
const MONTH = "month"
const LASTMONTH = "lastmonth"

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onChange }) => {
  const t = useTranslations("report.orderlist");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const [activeButton, setActiveButton] = useState<string | null>('today');

  useEffect(() => {
    handleQuickSelect(TODAY)
  }, [])

  // Format date range to YYYY-MM-DD HH:mm:ss
  const formatDateRange = (range: DateRange) => {
    if (!range || !range.from) return null;

    return {
      from: format(startOfDay(range.from), "yyyy-MM-dd HH:mm:ss"),
      to: range.to ? format(endOfDay(range.to), "yyyy-MM-dd HH:mm:ss") : format(endOfDay(range.from), "yyyy-MM-dd HH:mm:ss"),
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
      case TODAY:
        from = today;
        to = today;
        break;
      case YESTERDAY:
        from = new Date(today.setDate(today.getDate() - 1));
        to = new Date(from);
        break;
      case WEEK:
        from = startOfWeek(today, { weekStartsOn: 1 });
        to = new Date();
        break;
      case LASTWEEK: {
        const lastWeek = subWeeks(today, 1);
        from = startOfWeek(lastWeek, { weekStartsOn: 1 });
        to = endOfWeek(lastWeek, { weekStartsOn: 1 });
        break;
      }
      case MONTH:
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        to = new Date();
        break;
      case LASTMONTH:
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        to = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        break;
    }

    const range = { from, to };
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
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "yyyy-MM-dd")} ~ {format(dateRange.to, "yyyy-MM-dd")}
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
            onSelect={handleDateRangeChange as any}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      <div className="flex gap-2">
        {[TODAY, YESTERDAY, WEEK, LASTWEEK, MONTH, LASTMONTH].map(type => (
          <Button
            key={type}
            variant={activeButton === type ? 'default' : 'outline'}
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
