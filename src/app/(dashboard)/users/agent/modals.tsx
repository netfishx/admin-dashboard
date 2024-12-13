"use client";

import { agentIdAtom } from "@/store";
import { useAtomValue } from "jotai";
import { ChangeLogModal } from "../components/change-log-modal";
import { LoginLogModal } from "../components/login-log-modal";
import { RebateModal } from "../components/rebate-modal";
import { GameSettingModal } from "./game-setting-modal";
import { TransferMoneyModal } from "./transfer-money-modal";
import { UserInfoModal } from "./user-info-modal";

export function Modals() {
  const agentId = useAtomValue(agentIdAtom);
  return (
    <>
      <LoginLogModal id={agentId} type="AGENT" />
      <UserInfoModal />
      <GameSettingModal />
      <RebateModal userId={agentId} />
      <ChangeLogModal targetUserId={agentId} appType="AGENT" />
      <TransferMoneyModal />
    </>
  );
}
