"use client";

import { memberIdAtom } from "@/store";
import { useAtomValue } from "jotai";
import { ChangeLogModal } from "../components/change-log-modal";
import { LimitModal } from "../components/limit-modal";
import { LoginLogModal } from "../components/login-log-modal";
import { RebateModal } from "../components/rebate-modal";
import { DecreaseCreditModal } from "./decrease-credit-modal";
import { DeleteCreditModal } from "./delete-credit-modal";
import { IncreaseCreditModal } from "./increase-credit-modal";
import { RatioModal } from "./ratio-modal";
import { UserInfoModal } from "./user-info-modal";

export function Modals() {
  const memberId = useAtomValue(memberIdAtom);

  return (
    <>
      <UserInfoModal />
      <RatioModal />
      <LimitModal userId={memberId} />
      <RebateModal userId={memberId} />
      <LoginLogModal id={memberId} type="MEMBER" />
      <ChangeLogModal targetUserId={memberId} appType="MEMBER" />
      <IncreaseCreditModal />
      <DecreaseCreditModal />
      <DeleteCreditModal />
    </>
  );
}
