import { ScrollArea } from "@/components/ui/scroll-area";
import { type ReactNode, Suspense } from "react";
import { SidebarWrapper } from "./sidebar-wrapper";
import { Toolbar } from "./toolbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen overflow-hidden flex">
      <Suspense fallback={null}>
        <SidebarWrapper />
      </Suspense>
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
