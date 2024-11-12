"use client";
import { Button } from "@/components/ui/button";
import type { ApplyData } from "@/lib/types";
import { useTranslations } from "next-intl";

export function Actions({ data }: { data: ApplyData }) {
  const t = useTranslations("withdraw.apply");
  console.info(data);
  const auditStatus = data.approverStatus;
  const withdrawMode = data.withdrawMode;
  const moneyStatus = data.moneyStatus;

  return (
    <>
      <div className="flex gap-2 justify-center">
        {/* 未处理——[锁定]
        锁定中——[通过]、[拒绝]、[流水]
        已通过——自动出金——（无操作）；已通过——手动出金——[确认到账] 
        已拒绝——（无操作）
        到账失败——[再次发起]
        */}
        {auditStatus === 0 && (
          <Button
            variant="link"
            className="hover:no-underline hover:text-primary/80 px-0"
          >
            {t("lock")}
          </Button>
        )}
        {auditStatus === 1 && (
          <>
            <Button
              variant="link"
              className="hover:no-underline hover:text-primary/80 px-0"
            >
              {t("pass")}
            </Button>
            <Button
              variant="link"
              className="hover:no-underline hover:text-primary/80 px-0"
            >
              {t("reject")}
            </Button>
            <Button
              variant="link"
              className="hover:no-underline hover:text-primary/80 px-0"
            >
              {t("flow")}
            </Button>
          </>
        )}
        {auditStatus === 2 && withdrawMode === 1 && (
          <Button
            variant="link"
            className="hover:no-underline hover:text-primary/80 px-0"
          >
            {t("confirm")}
          </Button>
        )}
        {moneyStatus === 2 && (
          <Button
            variant="link"
            className="hover:no-underline hover:text-primary/80 px-0"
          >
            {t("again")}
          </Button>
        )}
        {(auditStatus === 2 || (auditStatus === 3 && moneyStatus !== 2)) && (
          <span>--</span>
        )}
      </div>
    </>
  );
}
