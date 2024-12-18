"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { formatNumber } from "@/lib/utils";

export default function TruncatedAmount({ amount }: { amount: number }) {
  const truncateNumber = (num: number) => {
    const formattedNum = formatNumber(num);
    return formattedNum.length > 10
      ? `${formattedNum.slice(0, 10)}...`
      : formattedNum;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p className="text-xs">{truncateNumber(amount)}</p>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            arrowPadding={-100}
            avoidCollisions
            className="p-1 text-[10px]"
          >
            <p>{formatNumber(amount)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
