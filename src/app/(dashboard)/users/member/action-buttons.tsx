"use client";

import { Button } from "@/components/ui/button";
import type { MemberList } from "@/lib/types";
import {
  changeLogModalAtom,
  decreaseCreditModalAtom,
  deleteCreditModalAtom,
  increaseCreditModalAtom,
  limitModalAtom,
  loginLogModalAtom,
  memberIdAtom,
  memberInfoDataAtom,
  memberInfoModalAtom,
  ratioModalAtom,
  rebateModalAtom,
} from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export default function Action({
  data,
  permissions,
}: {
  data: MemberList;
  permissions: string[] | undefined;
}) {
  const t = useTranslations("users.members");
  // 会员ID
  const setMemberId = useSetAtom(memberIdAtom);
  // 会员信息数据
  const setMemberInfoData = useSetAtom(memberInfoDataAtom);
  // 会员信息 弹窗
  const setMemberInfoModal = useSetAtom(memberInfoModalAtom);
  // 占成 弹窗
  const setRatioModal = useSetAtom(ratioModalAtom);
  // 增加授信 弹窗
  const setIncreaseCreditModal = useSetAtom(increaseCreditModalAtom);
  // 减少授信 弹窗
  const setDecreaseCreditModal = useSetAtom(decreaseCreditModalAtom);
  // 销账 弹窗
  const setDeleteCreditModal = useSetAtom(deleteCreditModalAtom);
  // 限额 弹窗
  const setLimitModal = useSetAtom(limitModalAtom);
  // 退水 弹窗
  const setRebateModal = useSetAtom(rebateModalAtom);
  // 登录日志 弹窗
  const setLoginLogModal = useSetAtom(loginLogModalAtom);
  // 变更日志 弹窗
  const setChangeLogModal = useSetAtom(changeLogModalAtom);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          setMemberInfoData(data);
          setMemberInfoModal(true);
        }}
      >
        {t("userInfo")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          setMemberId(data.id);
          setRatioModal(true);
        }}
      >
        {t("ratio")}
      </Button>

      {permissions?.includes("edit_credit") && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-sm text-primary hover:text-primary/80"
            onClick={() => {
              setMemberId(data.id);
              setMemberInfoData(data);
              setIncreaseCreditModal(true);
            }}
          >
            {t("increaseCredit")}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-sm text-primary hover:text-primary/80"
            onClick={() => {
              setMemberId(data.id);
              setMemberInfoData(data);
              setDecreaseCreditModal(true);
            }}
          >
            {t("decreaseCredit")}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-sm text-primary hover:text-primary/80"
            onClick={() => {
              setMemberId(data.id);
              setMemberInfoData(data);
              setDeleteCreditModal(true);
            }}
          >
            {t("deleteCredit")}
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        size="sm"
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          setMemberId(data.id);
          setLimitModal(true);
        }}
      >
        {t("limitSetting")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          setMemberId(data.id);
          setRebateModal(true);
        }}
      >
        {t("rebate")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          setMemberId(data.id);
          setLoginLogModal(true);
        }}
      >
        {t("loginLog")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          setMemberId(data.id);
          setChangeLogModal(true);
        }}
      >
        {t("changeLog")}
      </Button>
    </>
  );
}
