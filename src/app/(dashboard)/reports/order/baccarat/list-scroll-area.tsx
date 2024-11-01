"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { sidebarAtom } from "@/store";
import { useAtomValue } from "jotai";
import type { ReactNode } from "react";

export default function ListScrollArea({ children }: { children: ReactNode }) {
  const isOpened = useAtomValue(sidebarAtom);
  return (
    <ScrollArea
      className={cn(
        isOpened ? "w-[calc(100dvw-16rem)]" : "w-[calc(100dvw-5rem)]",
      )}
    >
      {children}
    </ScrollArea>
  );
}
