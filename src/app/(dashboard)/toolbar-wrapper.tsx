import { getSession } from "@/session";
import { use } from "react";
import { Toolbar } from "./toolbar";

export function ToolbarWrapper() {
  const user = use(getSession());
  return (
    <Toolbar
      username={user?.username ?? ""}
      inviteCode={user?.inviteCode ?? ""}
    />
  );
}
