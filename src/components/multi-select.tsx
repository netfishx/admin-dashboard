"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, MoreHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: Option[];
  onChange: (selected: number[]) => void;
};

export function MultiSelect({ options, onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const toggleOption = (index: number) => {
    const newSelectedIndices = selectedIndices.includes(index)
      ? selectedIndices.filter((i) => i !== index)
      : [...selectedIndices, index].sort((a, b) => a - b);
    setSelectedIndices(newSelectedIndices);
    onChange(newSelectedIndices);
  };
  const translations = useTranslations();

  const removeOption = (indexToRemove: number) => {
    const newSelectedIndices = selectedIndices.filter(
      (index) => index !== indexToRemove,
    );
    setSelectedIndices(newSelectedIndices);
    onChange(newSelectedIndices);
  };

  const visibleTags = 2;
  const hiddenTags = selectedIndices.length - visibleTags;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className="w-[240px] justify-between hover:bg-transparent"
        >
          <div className="flex items-center gap-1 overflow-hidden">
            {selectedIndices.slice(0, visibleTags).map((index) => (
              <div
                key={index}
                className="flex max-w-[100px] items-center gap-1 rounded-sm bg-muted px-1 py-0.5 text-sm"
              >
                <span className="truncate">{options[index].label}</span>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <span
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(index);
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {options[index].label}</span>
                </span>
              </div>
            ))}
            {hiddenTags > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center rounded-sm bg-muted px-1 py-0.5 text-sm">
                      <MoreHorizontal className="h-3 w-3" />
                      <span className="ml-1">+{hiddenTags}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {selectedIndices
                        .slice(visibleTags)
                        .map((i) => options[i].label)
                        .join(", ")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {selectedIndices.length === 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                {translations("placeholderSelect")}
              </span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <div className="max-h-[240px] overflow-auto">
          {options.map((option, index) => {
            const isSelected = selectedIndices.includes(index);
            return (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <div
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-muted",
                  isSelected && "bg-muted",
                )}
                onClick={() => toggleOption(index)}
              >
                {option.label}
                {isSelected && <Check className="h-4 w-4 text-primary" />}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
