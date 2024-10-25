import React, { useState } from 'react';
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

const DateRangeFilter = ({ onChange }) => {
  const t = useTranslations("report.orderlist");
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date()
  });
  const [activeButton, setActiveButton] = useState('today');

  // 格式化日期为 YYYY-MM-DD HH:mm:ss
  const formatDateRange = (range) => {
    if (!range || !range.from) return null;

    return {
      from: format(startOfDay(range.from), "yyyy-MM-dd HH:mm:ss"),
      to: range.to ? format(endOfDay(range.to), "yyyy-MM-dd HH:mm:ss") : format(endOfDay(range.from), "yyyy-MM-dd HH:mm:ss")
    };
  };

  // 处理日期范围变化
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setActiveButton(null);
    const formattedRange = formatDateRange(range);
    onChange?.(formattedRange);
  };

  // 处理快捷按钮点击
  const handleQuickSelect = (type) => {
    const today = new Date();
    let from = new Date();
    let to = new Date();

    switch (type) {
      case 'today':
        from = today;
        to = today;
        break;
      case 'yesterday':
        from = new Date(today.setDate(today.getDate() - 1));
        to = new Date(from);
        break;
      case 'week':
        from = startOfWeek(today, { weekStartsOn: 1 }); // 从周一开始
        to = new Date();
        break;
      case 'lastWeek': {
        // 获取上周的日期范围
        const lastWeek = subWeeks(today, 1); // 获取上周的某一天
        from = startOfWeek(lastWeek, { weekStartsOn: 1 }); // 上周一
        to = endOfWeek(lastWeek, { weekStartsOn: 1 }); // 上周日
        break;
      }
      case 'month':
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        to = new Date();
        break;
      case 'lastMonth':
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        to = new Date(today.getFullYear(), today.getMonth(), 0);
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
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateRangeChange}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      <div className="flex gap-2">
        <Button
          variant={activeButton === 'today' ? 'default' : 'outline'}
          onClick={() => handleQuickSelect('today')}
          size="sm"
        >
          {t("today")}
        </Button>
        <Button
          variant={activeButton === 'yesterday' ? 'default' : 'outline'}
          onClick={() => handleQuickSelect('yesterday')}
          size="sm"
        >
          {t("yesterday")}
        </Button>
        <Button
          variant={activeButton === 'week' ? 'default' : 'outline'}
          onClick={() => handleQuickSelect('week')}
          size="sm"
        >
          {t("week")}
        </Button>
        <Button
          variant={activeButton === 'lastWeek' ? 'default' : 'outline'}
          onClick={() => handleQuickSelect('lastWeek')}
          size="sm"
        >
          {t("lastweek")}
        </Button>
        <Button
          variant={activeButton === 'month' ? 'default' : 'outline'}
          onClick={() => handleQuickSelect('month')}
          size="sm"
        >
          {t("month")}
        </Button>
        <Button
          variant={activeButton === 'lastMonth' ? 'default' : 'outline'}
          onClick={() => handleQuickSelect('lastMonth')}
          size="sm"
        >
          {t("lastmonth")}
        </Button>
      </div>
    </div>
  );
};

export default DateRangeFilter;