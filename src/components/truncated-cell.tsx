"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TruncatedCell({
  value,
}: {
  value: string;
}) {
  const truncateValue = (value: string) => {
    if (!value) {
      return "";
    }

    const str = String(value);
    return str.length > 20 ? `${str.slice(0, 20)}...` : str;
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p>{truncateValue(value)}</p>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            avoidCollisions
            className="p-1 text-[10px]"
          >
            <p>{value}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
