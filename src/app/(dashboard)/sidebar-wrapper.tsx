import { getReviceOrder } from "@/api";
import { use } from "react";
import { SideBar } from "./sidebar";

export function SidebarWrapper() {
  const res = use(getReviceOrder());
  return <SideBar status={res.data?.status} />;
}
