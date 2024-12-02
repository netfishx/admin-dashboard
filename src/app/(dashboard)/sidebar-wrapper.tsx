import { getReviceOrder } from "@/api";
import { SideBar } from "@/app/(dashboard)/sidebar";
import { getSession } from "@/session";
import { connection } from "next/server";

export async function SidebarWrapper() {
  await connection();
  const res = getReviceOrder();
  const session = await getSession();
  return <SideBar reviceOrder={res} permissions={session?.permissions ?? []} />;
}
