import { getReceiveOrder } from "@/api";
import { SideBar } from "@/app/(dashboard)/sidebar";
import { getSession } from "@/session";
import { connection } from "next/server";

export async function SidebarWrapper() {
  await connection();
  const session = await getSession();
  const permissions = session?.permissions ?? [];
  const hasReceiveOrderPermission = permissions.includes("revice_order");
  let status = false;
  if (hasReceiveOrderPermission) {
    const res = await getReceiveOrder();
    status = res.data?.receiveStatus ?? false;
  }
  return (
    <SideBar
      status={status}
      permissions={permissions}
      hasReceiveOrderPermission={hasReceiveOrderPermission}
    />
  );
}
