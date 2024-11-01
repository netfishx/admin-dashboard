import { ScrollArea } from "@/components/ui/scroll-area";
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
          <ScrollArea className="h-[calc(100dvh-2.5rem)]">
            <div className="flex gap-2 p-2 h-full">{children}</div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
