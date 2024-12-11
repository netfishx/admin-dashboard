import { SidebarWrapper } from "@/app/(dashboard)/sidebar-wrapper";
import { ToolbarWrapper } from "@/app/(dashboard)/toolbar-wrapper";
import { type ReactNode, Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full h-screen overflow-hidden flex">
      <Suspense fallback={<div className="w-56 min-[2400px]:w-96 border-r" />}>
        <SidebarWrapper />
      </Suspense>
      <main className="flex-1 flex flex-col overflow-hidden">
        <Suspense
          fallback={
            <div className="w-full h-10 flex justify-between border-b px-2 shrink-0" />
          }
        >
          <ToolbarWrapper />
        </Suspense>
        <div className="bg-accent overflow-y-auto flex gap-2 p-2">
          {children}
        </div>
      </main>
    </div>
  );
}
