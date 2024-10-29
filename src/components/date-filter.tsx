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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface DateRangeFilterProps {
  onChange?: (range: { from: string; to: string } | null) => void;
  quickSetBtn?: string[]
}

const DateFilter: React.FC<DateRangeFilterProps> = ({ onChange, quickSetBtn = ['today', 'yesterday'] }) => {
  const t = useTranslations("report.periodlist");
  const [date, setDate] = React.useState<Date>(new Date())
  const [activeButton, setActiveButton] = useState<string | null>('today');

  // Handle quick select button click
  const handleQuickSelect = (type: string) => {
    const today = new Date();
    let selectedDate = today;

    switch (type) {
      case 'today':
        selectedDate = today;
        break;
        case 'yesterday':
        selectedDate = new Date(today.setDate(today.getDate() - 1))
        break;
      default:
        break;
    }
    setDate(selectedDate);
    setActiveButton(type);
  };
  
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            >
            <CalendarIcon />
            {date ? format(date, "yyyy-MM-dd") : <span>{t("pickdate")}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date: Date | undefined) => date && setDate(date)}
            required={false}
          />
        </PopoverContent>
      </Popover>
      <div className="flex gap-2">
        {quickSetBtn?.map((type: string) => (
          <Button
            key={type}
            variant={activeButton === type ? 'default' : 'outline'}
            onClick={() => handleQuickSelect(type)}
          >
            {t(type?.toString())}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DateFilter;
