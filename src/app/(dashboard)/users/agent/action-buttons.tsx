"use client";

import type { AgentData } from "@/api";
import { Button } from "@/components/ui/button";
import {
  agentIdAtom,
  changeLogModalAtom,
  gameSettingModalAtom,
  limitModalAtom,
  loginLogModalAtom,
  rebateModalAtom,
  userInfoModalAtom,
} from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TransferMoneyModal } from "./transfer-money-modal";

export default function Action({ data }: { data: AgentData }) {
  const t = useTranslations("users.agents");
  const [transferMoneyModal, setTransferMoneyModal] = useState(false);

  // 用户信息 弹窗
  const setUserInfoModal = useSetAtom(userInfoModalAtom);
  // 游戏设置 弹窗
  const setGameSettingModal = useSetAtom(gameSettingModalAtom);
  // 限额设置 弹窗
  const setLimitModal = useSetAtom(limitModalAtom);
  // 返水设置 弹窗
  const setRebateModal = useSetAtom(rebateModalAtom);
  // 登录日志 弹窗
  const setLoginLogModal = useSetAtom(loginLogModalAtom);
  // 变更日志 弹窗
  const setChangeLogModal = useSetAtom(changeLogModalAtom);
  // 代理ID
  const setAgentId = useSetAtom(agentIdAtom);
  return (
    <>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setAgentId(data.id);
          setUserInfoModal(true);
        }}
      >
        {t("userInfo")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setTransferMoneyModal(true);
        }}
      >
        {t("transferMoney")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setAgentId(data.id);
          setGameSettingModal(true);
        }}
      >
        {t("gamesSetting")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setAgentId(data.id);
          setLimitModal(true);
        }}
      >
        {t("limitSetting")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setAgentId(data.id);
          setRebateModal(true);
        }}
      >
        {t("rebateSetting")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setAgentId(data.id);
          setLoginLogModal(true);
        }}
      >
        {t("loginLog")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setAgentId(data.id);
          setChangeLogModal(true);
        }}
      >
        {t("changeLog")}
      </Button>
      <TransferMoneyModal
        open={transferMoneyModal}
        onOpenChange={setTransferMoneyModal}
        editData={data}
      />
    </>
  );
}
