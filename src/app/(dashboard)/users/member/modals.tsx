"use client";

import { memberIdAtom } from "@/store";
import { useAtomValue } from "jotai";
import { ChangeLogModal } from "../agent/change-log-modal";
import { LoginLogModal } from "../agent/login-log-modal";
export function Modals() {
  const memberId = useAtomValue(memberIdAtom);

  return (
    <>
      <LoginLogModal id={memberId} type="MEMBER" />
      <ChangeLogModal targetUserId={memberId} appType="MEMBER" />
    </>
  );
}
