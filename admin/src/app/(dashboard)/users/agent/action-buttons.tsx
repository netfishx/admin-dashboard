"use client";

import {
  getAgentLoginLog,
  getChangeLog,
  getGameConfig,
  getUserBasicInfo,
} from "@/api";
import { Button } from "@/components/ui/button";
import type { AgentData } from "@/lib/types";
import {
  agentDataAtom,
  agentIdAtom,
  availableAmountAtom,
  changeLogDataAtom,
  changeLogModalAtom,
  gameSettingDataAtom,
  gameSettingModalAtom,
  loginLogDataAtom,
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
  const setLoginLogData = useSetAtom(loginLogDataAtom);
  // 变更日志 弹窗
  const setChangeLogModal = useSetAtom(changeLogModalAtom);
  const setChangeLogData = useSetAtom(changeLogDataAtom);
  // 代理ID
  const setAgentId = useSetAtom(agentIdAtom);
  // 代理 数据
  const setAgentData = useSetAtom(agentDataAtom);
  const [gameConfigIsPending, startGetGameConfig] = useTransition();
  const [rebateIsPending, startGetRebate] = useTransition();
  const [loginLogIsPending, startGetLoginLog] = useTransition();
  const [changeLogIsPending, startGetChangeLog] = useTransition();
  const [transferMoneyIsPending, startGetTransferMoney] = useTransition();
  const setAvailableAmount = useSetAtom(availableAmountAtom);
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 px-2 text-sm"
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
          disabled={transferMoneyIsPending}
          className="text-primary hover:text-primary/80 px-2 text-sm"
          onClick={() => {
            startGetTransferMoney(async () => {
              setAgentData(data);
              const { code, data: info, message } = await getUserBasicInfo();
              if (code === 0) {
                setAvailableAmount(Number(info?.usableBalanceMoney ?? 0));
              } else {
                toast.error(message);
              }
              setTransferMoneyModal(true);
            });
          }}
        >
          {transferMoneyIsPending && <Loader2 className="animate-spin" />}
          {t("transferMoney")}
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        disabled={gameConfigIsPending}
        className="text-primary hover:text-primary/80 px-2 text-sm"
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
        disabled={rebateIsPending}
        className="text-primary hover:text-primary/80 px-2 text-sm"
        onClick={() => {
          startGetRebate(async () => {
            setAgentId(data.id);
            const {
              code,
              data: config,
              message,
            } = await getGameConfig(data.id);
            if (code === 0) {
              setRebateData(config);
            } else {
              toast.error(message);
            }
            setRebateModal(true);
          });
        }}
      >
        {rebateIsPending && <Loader2 className="animate-spin" />}
        {t("rebateSetting")}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        disabled={loginLogIsPending}
        className="text-primary hover:text-primary/80 px-2 text-sm"
        onClick={() => {
          startGetLoginLog(async () => {
            setAgentId(data.id);
            const {
              code,
              data: logs,
              message,
            } = await getAgentLoginLog({
              userId: data.id,
              pageNum: 1,
              pageSize: 10,
            });
            if (code === 0) {
              setLoginLogData(logs);
            } else {
              toast.error(message);
            }
            setLoginLogModal(true);
          });
        }}
      >
        {loginLogIsPending && <Loader2 className="animate-spin" />}
        {t("loginLog")}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        disabled={changeLogIsPending}
        className="text-primary hover:text-primary/80 px-2 text-sm"
        onClick={() => {
          startGetChangeLog(async () => {
            setAgentId(data.id);
            const {
              code,
              data: logs,
              message,
            } = await getChangeLog({
              targetUserId: data.id,
              appType: "AGENT",
              pageNum: 1,
              pageSize: 10,
            });
            if (code === 0) {
              setChangeLogData(logs);
            } else {
              toast.error(message);
            }
            setChangeLogModal(true);
          });
        }}
      >
        {changeLogIsPending && <Loader2 className="animate-spin" />}
        {t("changeLog")}
      </Button>
    </>
  );
}
