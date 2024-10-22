import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { ReactNode } from "react";
import { SideBar } from "./sidebar";
import { Toolbar } from "./toolbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen overflow-hidden flex">
      <SideBar />
      <main className="flex-1 flex flex-col">
        <Toolbar />
        <div className="flex-1 bg-accent">
          <ScrollArea className="h-[calc(100dvh-2.5rem)] w-[calc(100dvw-14rem)] min-[2400px]:w-w-[calc(100dvw-24rem)]">
            <div className="flex gap-2 p-2 h-full">{children}</div>
            <ScrollBar orientation="horizontal" />
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
