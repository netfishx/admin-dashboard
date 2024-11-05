import { SidebarWrapper } from "@/app/(dashboard)/sidebar-wrapper";
import { ToolbarWrapper } from "@/app/(dashboard)/toolbar-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type ReactNode, Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full h-screen overflow-hidden flex">
      <Suspense fallback={null}>
        <SidebarWrapper />
      </Suspense>
      <main className="flex-1 flex flex-col">
        <Suspense fallback={null}>
          <ToolbarWrapper />
        </Suspense>
        <div className="flex-1 bg-accent">
          <ScrollArea className="h-[calc(100dvh-2.5rem)]">
            <div className="flex gap-2 p-2 h-full">{children}</div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
