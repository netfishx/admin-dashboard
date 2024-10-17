import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen overflow-hidden bg-red-50 flex flex-col gap-4 items-center justify-center">
      {children}
    </div>
  );
}
