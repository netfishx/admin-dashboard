"use client";

import type { AgentData } from "@/api";
import { Button } from "@/components/ui/button";
import { agentIdAtom, loginLogModalAtom, userInfoModalAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChangeLogModal } from "./change-log-modal";
import { GameSettingModal } from "./game-setting-modal";
import { LimitModal } from "./limit-modal";
import { RebateModal } from "./rebate-modal";
import { TransferMoneyModal } from "./transfer-money-modal";

export default function Action({ data }: { data: AgentData }) {
  const t = useTranslations("users.agents");
  const [transferMoneyModal, setTransferMoneyModal] = useState(false);
  const [gameSettingModal, setGameSettingModal] = useState(false);
  const [limitModal, setLimitModal] = useState(false);
  const [rebateModal, setRebateModal] = useState(false);
  // const [loginLogModal, setLoginLogModal] = useState(false);
  const [changeLogModal, setChangeLogModal] = useState(false);

  // 用户信息
  const setUserInfoModal = useSetAtom(userInfoModalAtom);

  // 登录日志
  const setLoginLogModal = useSetAtom(loginLogModalAtom);
  const setAgentId = useSetAtom(agentIdAtom);
  return (
    <>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setAgentId(data.userId);
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
          setGameSettingModal(true);
        }}
      >
        {t("gamesSetting")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setLimitModal(true);
        }}
      >
        {t("limitSetting")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setRebateModal(true);
        }}
      >
        {t("rebateSetting")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
          setAgentId(data.userId);
          setLoginLogModal(true);
        }}
      >
        {t("loginLog")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
        onClick={() => {
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
      <GameSettingModal
        open={gameSettingModal}
        onOpenChange={setGameSettingModal}
      />
      <LimitModal open={limitModal} onOpenChange={setLimitModal} />
      <RebateModal open={rebateModal} onOpenChange={setRebateModal} />
      <ChangeLogModal open={changeLogModal} onOpenChange={setChangeLogModal} />
    </>
  );
}
