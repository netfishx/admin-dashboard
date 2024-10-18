import type { ReactNode } from "react";
import { Navbar } from "./navbar";
import { SideBar } from "./sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen overflow-hidden flex">
      <SideBar />
      <main className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 flex gap-2 p-2 bg-accent">{children}</div>
      </main>
    </div>
  );
}
