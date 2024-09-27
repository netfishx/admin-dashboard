"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export function A() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">About</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>About ......</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
