"use client";

import { Button } from "@/components/ui/button";
import type { MemberList } from "@/lib/types";
import { changeLogModalAtom, loginLogModalAtom, memberIdAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export default function Action({ data }: { data: MemberList }) {
  const t = useTranslations("users.members");
  // 会员ID
  const setMemberId = useSetAtom(memberIdAtom);
  // 登录日志 弹窗
  const setLoginLogModal = useSetAtom(loginLogModalAtom);
  // 变更日志 弹窗
  const setChangeLogModal = useSetAtom(changeLogModalAtom);
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("userInfo")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("ratio")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("increaseCredit")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("decreaseCredit")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("deleteCredit")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("limitSetting")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
      >
        {t("rebate")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm"
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
        className="text-primary hover:text-primary/80 text-sm"
        onClick={() => {
          console.info(data);
          setMemberId(data.id);
          setChangeLogModal(true);
        }}
      >
        {t("changeLog")}
      </Button>
    </>
  );
}
