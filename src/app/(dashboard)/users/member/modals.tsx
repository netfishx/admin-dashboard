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

export function Modals() {
  const memberId = useAtomValue(memberIdAtom);

  return (
    <>
      <RatioModal key={`RatioModal-${memberId}`} />
      <LimitModal userId={memberId} key={`LimitModal-${memberId}`} />
      <RebateModal userId={memberId} key={`RebateModal-${memberId}`} />
      <LoginLogModal
        id={memberId}
        type="MEMBER"
        key={`LoginLogModal-${memberId}`}
      />
      <ChangeLogModal targetUserId={memberId} appType="MEMBER" />
      <IncreaseCreditModal key={`IncreaseCreditModal-${memberId}`} />
      <DecreaseCreditModal key={`DecreaseCreditModal-${memberId}`} />
      <DeleteCreditModal key={`DeleteCreditModal-${memberId}`} />
    </>
  );
}
