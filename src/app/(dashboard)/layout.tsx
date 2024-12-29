import { SidebarWrapper } from "@/app/(dashboard)/sidebar-wrapper";
import { ToolbarWrapper } from "@/app/(dashboard)/toolbar-wrapper";
import { type ReactNode, Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Suspense fallback={<div className="w-56 border-r min-[2400px]:w-96" />}>
        <SidebarWrapper />
      </Suspense>
      <main className="flex flex-1 flex-col overflow-hidden">
        <Suspense
          fallback={
            <div className="flex h-10 w-full shrink-0 justify-between border-b px-2" />
          }
        >
          <ToolbarWrapper />
        </Suspense>
        <div className="bg-accent flex h-full gap-2 overflow-y-auto p-2">
          {children}
        </div>
      </main>
    </div>
  );
}
