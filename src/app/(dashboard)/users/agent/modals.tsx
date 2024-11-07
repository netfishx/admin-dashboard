import { GameSettingModal } from "./game-setting-modal";
import { LoginLogModal } from "./login-log-modal";
import { UserInfoModal } from "./user-info-modal";
export function Modals() {
  return (
    <>
      <LoginLogModal />
      <UserInfoModal />
      <GameSettingModal />
    </>
  );
}
