import { ChangeLogModal } from "./change-log-modal";
import { GameSettingModal } from "./game-setting-modal";
import { LimitModal } from "./limit-modal";
import { LoginLogModal } from "./login-log-modal";
import { RebateModal } from "./rebate-modal";
import { UserInfoModal } from "./user-info-modal";
export function Modals() {
  return (
    <>
      <LoginLogModal />
      <UserInfoModal />
      <GameSettingModal />
      <LimitModal />
      <RebateModal />
      <ChangeLogModal />
    </>
  );
}
