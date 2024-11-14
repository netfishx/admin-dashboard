"use client";

import { agentIdAtom } from "@/store";
import { useAtomValue } from "jotai";
import { ChangeLogModal } from "./change-log-modal";
import { GameSettingModal } from "./game-setting-modal";
import { LimitModal } from "./limit-modal";
import { LoginLogModal } from "./login-log-modal";
import { RebateModal } from "./rebate-modal";
import { UserInfoModal } from "./user-info-modal";
export function Modals() {
  const agentId = useAtomValue(agentIdAtom);
  return (
    <>
      <LoginLogModal id={agentId} type="AGENT" />
      <UserInfoModal />
      <GameSettingModal />
      <LimitModal />
      <RebateModal />
      <ChangeLogModal targetUserId={agentId} appType="AGENT" />
    </>
  );
}
