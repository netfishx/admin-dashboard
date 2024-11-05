import { getReviceOrder } from "@/api";
import { SideBar } from "@/app/(dashboard)/sidebar";
import { use } from "react";

export function SidebarWrapper() {
  const res = use(getReviceOrder());
  return <SideBar status={res.data?.status} />;
}
