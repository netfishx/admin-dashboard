"use client";

import { LoginLogModal } from "@/app/(dashboard)/users/components/login-log-modal";
import { subaccountIdAtom } from "@/store";
import { useAtomValue } from "jotai";

export function LoginLogModalWrapper() {
  const id = useAtomValue(subaccountIdAtom);
  return <LoginLogModal id={id} type="AGENT" />;
}
