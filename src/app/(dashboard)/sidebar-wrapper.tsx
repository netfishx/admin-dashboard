import { getReviceOrder } from "@/api";
import { SideBar } from "@/app/(dashboard)/sidebar";
import { getSession } from "@/session";
import { use } from "react";

export function SidebarWrapper() {
  const res = use(getReviceOrder());
  const session = use(getSession());
  return (
    <SideBar
      status={res.data?.status}
      permissions={session?.permissions ?? []}
    />
  );
}
