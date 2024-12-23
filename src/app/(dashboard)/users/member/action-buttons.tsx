"use client";

import {
  getChangeLog,
  getGameConfig,
  getGameOdds,
  getMemberLoginLog,
  getUserBasicInfo,
} from "@/api";
import { Button } from "@/components/ui/button";
import type { MemberList } from "@/lib/types";
import {
  availableAmountAtom,
  changeLogDataAtom,
  changeLogModalAtom,
  decreaseCreditModalAtom,
  deleteCreditModalAtom,
  increaseCreditModalAtom,
  limitDataAtom,
  limitGamesAtom,
  limitModalAtom,
  loginLogDataAtom,
  loginLogModalAtom,
  memberIdAtom,
  memberInfoDataAtom,
  memberInfoModalAtom,
  ratioDataAtom,
  ratioModalAtom,
  rebateDataAtom,
  rebateModalAtom,
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
  const setRatioData = useSetAtom(ratioDataAtom);
  // 增加授信 弹窗
  const setIncreaseCreditModal = useSetAtom(increaseCreditModalAtom);
  // 减少授信 弹窗
  const setDecreaseCreditModal = useSetAtom(decreaseCreditModalAtom);
  // 销账 弹窗
  const setDeleteCreditModal = useSetAtom(deleteCreditModalAtom);
  // 限额 弹窗
  const setLimitModal = useSetAtom(limitModalAtom);
  const setLimitGames = useSetAtom(limitGamesAtom);
  const setLimitData = useSetAtom(limitDataAtom);
  // 退水 弹窗
  const setRebateModal = useSetAtom(rebateModalAtom);
  const setRebateData = useSetAtom(rebateDataAtom);
  // 登录日志 弹窗
  const setLoginLogModal = useSetAtom(loginLogModalAtom);
  const setLoginLogData = useSetAtom(loginLogDataAtom);
  // 变更日志 弹窗
  const setChangeLogModal = useSetAtom(changeLogModalAtom);
  const setChangeLogData = useSetAtom(changeLogDataAtom);

  const setAvailableAmount = useSetAtom(availableAmountAtom);

  const [rebateIsPending, startGetRebate] = useTransition();
  const [loginLogIsPending, startGetLoginLog] = useTransition();
  const [changeLogIsPending, startGetChangeLog] = useTransition();
  const [ratioIsPending, startGetRatio] = useTransition();
  const [limitIsPending, startGetLimit] = useTransition();
  const [deleteCreditIsPending, startGetDeleteCredit] = useTransition();
  const [increaseCreditIsPending, startGetIncreaseCredit] = useTransition();

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
        disabled={ratioIsPending}
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          startGetRatio(async () => {
            setMemberId(data.id);
            const {
              code,
              data: config,
              message,
            } = await getGameConfig(data.id);
            if (code === 0) {
              setRatioData(config);
            } else {
              toast.error(message);
            }
            setRatioModal(true);
          });
        }}
      >
        {ratioIsPending && <Loader2 className="animate-spin" />}
        {t("ratio")}
      </Button>

      {permissions?.includes("edit_credit") && (
        <>
          <Button
            variant="ghost"
            size="sm"
            disabled={increaseCreditIsPending}
            className="px-2 text-sm text-primary hover:text-primary/80"
            onClick={() => {
              startGetIncreaseCredit(async () => {
                setMemberId(data.id);
                setMemberInfoData(data);
                const { code, data: info, message } = await getUserBasicInfo();
                if (code === 0) {
                  setAvailableAmount(info?.usableBalanceMoney || 0);
                } else {
                  toast.error(message);
                }
                setIncreaseCreditModal(true);
              });
            }}
          >
            {increaseCreditIsPending && <Loader2 className="animate-spin" />}
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
            disabled={deleteCreditIsPending}
            className="px-2 text-sm text-primary hover:text-primary/80"
            onClick={() => {
              startGetDeleteCredit(async () => {
                setMemberId(data.id);
                setMemberInfoData(data);
                const { code, data: info, message } = await getUserBasicInfo();
                if (code === 0) {
                  setAvailableAmount(info?.usableBalanceMoney || 0);
                } else {
                  toast.error(message);
                }
                setDeleteCreditModal(true);
              });
            }}
          >
            {deleteCreditIsPending && <Loader2 className="animate-spin" />}
            {t("deleteCredit")}
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        size="sm"
        disabled={limitIsPending}
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          startGetLimit(async () => {
            setMemberId(data.id);
            const {
              code,
              data: config,
              message,
            } = await getGameConfig(data.id);
            if (code === 0) {
              const games = config?.filter(
                (item) => item.status === 1 && item.gameType === 61,
              );
              setLimitGames(games);
              if (games && games.length > 0) {
                const {
                  code,
                  data: odds,
                  message,
                } = await getGameOdds({
                  gameId: games[0].gameId,
                  userId: data.id,
                });
                if (code === 0) {
                  setLimitData(odds);
                } else {
                  toast.error(message);
                }
              }
            } else {
              toast.error(message);
            }
            setLimitModal(true);
          });
        }}
      >
        {limitIsPending && <Loader2 className="animate-spin" />}
        {t("limitSetting")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        disabled={rebateIsPending}
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          startGetRebate(async () => {
            setMemberId(data.id);
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
        {t("rebate")}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        disabled={loginLogIsPending}
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          startGetLoginLog(async () => {
            setMemberId(data.id);
            const {
              code,
              data: logs,
              message,
            } = await getMemberLoginLog({
              memberId: data.id,
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
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => {
          startGetChangeLog(async () => {
            setMemberId(data.id);
            const {
              code,
              data: logs,
              message,
            } = await getChangeLog({
              targetUserId: data.id,
              appType: "MEMBER",
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
