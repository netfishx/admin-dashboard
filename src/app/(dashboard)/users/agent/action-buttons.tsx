"use client";

import { getGameConfig } from "@/api";
import { Button } from "@/components/ui/button";
import type { AgentData } from "@/lib/types";
import {
  agentDataAtom,
  agentIdAtom,
  changeLogModalAtom,
  gameSettingDataAtom,
  gameSettingModalAtom,
  loginLogModalAtom,
  rebateDataAtom,
  rebateModalAtom,
  transferMoneyModalAtom,
  userInfoModalAtom,
} from "@/store";
import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";

export default function Action({
  data,
  permissions,
}: {
  data: AgentData;
  permissions: string[];
}) {
  const t = useTranslations("users.agents");

  // 用户信息 弹窗
  const setUserInfoModal = useSetAtom(userInfoModalAtom);
  // 转账 弹窗
  const setTransferMoneyModal = useSetAtom(transferMoneyModalAtom);
  // 游戏设置 弹窗
  const setGameSettingModal = useSetAtom(gameSettingModalAtom);
  const setGameSettingData = useSetAtom(gameSettingDataAtom);
  // 返水设置 弹窗
  const setRebateModal = useSetAtom(rebateModalAtom);
  const setRebateData = useSetAtom(rebateDataAtom);
  // 登录日志 弹窗
  const setLoginLogModal = useSetAtom(loginLogModalAtom);
  // 变更日志 弹窗
  const setChangeLogModal = useSetAtom(changeLogModalAtom);
  // 代理ID
  const setAgentId = useSetAtom(agentIdAtom);
  // 代理 数据
  const setAgentData = useSetAtom(agentDataAtom);
  const [gameConfigIsPending, startGetGameConfig] = useTransition();
  const [rebateIsPending, startGetRebate] = useTransition();
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          setAgentData(data);
          setAgentId(data.id);
          setUserInfoModal(true);
        }}
      >
        {t("userInfo")}
      </Button>
      {permissions.includes("agent_transfer") && (
        <Button
          variant="ghost"
          size="sm"
          className="px-2 text-sm text-primary hover:text-primary/80"
          onClick={() => {
            setAgentData(data);
            setTransferMoneyModal(true);
          }}
        >
          {t("transferMoney")}
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        disabled={gameConfigIsPending}
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          startGetGameConfig(async () => {
            setAgentId(data.id);
            const {
              code,
              data: config,
              message,
            } = await getGameConfig(data.id);
            if (code === 0) {
              setGameSettingData(config);
            } else {
              toast.error(message);
            }
            setGameSettingModal(true);
          });
        }}
      >
        {gameConfigIsPending && <Loader2 className="animate-spin" />}
        {t("gamesSetting")}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          setAgentId(data.id);
          setRebateModal(true);
        }}
      >
        {t("rebateSetting")}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          setAgentId(data.id);
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
          setAgentId(data.id);
          setChangeLogModal(true);
        }}
      >
        {t("changeLog")}
      </Button>
    </>
  );
}
