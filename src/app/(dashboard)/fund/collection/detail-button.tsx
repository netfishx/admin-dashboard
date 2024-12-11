"use client";
import { Button } from "@/components/ui/button";
import type { CollectionAddressListRecords } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CheckDialog } from "./check-dialog";
import { LockDialog } from "./lock-dialog";
import { StopDialog } from "./stop-dialog";
import { UnlockDialog } from "./unlock-dialog";

export function DetailButton({ item }: { item: CollectionAddressListRecords }) {
  type ShowStatusType = "LOCK" | "UNLOCK" | "STOP" | "CHECK" | "ADD";
  const ShowStatus = {
    // 锁定
    LOCK: "LOCK",
    // 解锁
    UNLOCK: "UNLOCK",
    // 停用
    STOP: "STOP",
    // 查看私钥
    CHECK: "CHECK",
    // 新增
    ADD: "ADD",
  };
  const t = useTranslations("fund.collection");

  const [showStatus, setShowStatus] = useState<ShowStatusType>();
  function handleDetail(status: ShowStatusType) {
    setShowStatus(status);
  }
  return (
    <div className="flex justify-center">
      {item.status === 2 && (
        <Button
          variant="ghost"
          className="hover:no-underline hover:text-primary/80 text-primary"
          onClick={() => handleDetail("UNLOCK")}
        >
          {t("unlock")}
        </Button>
      )}
      {(item.status === 2 || item.status === 0) && (
        <Button
          variant="ghost"
          className="hover:no-underline hover:text-primary/80 text-primary"
          onClick={() => handleDetail("CHECK")}
        >
          {t("check")}
        </Button>
      )}
      {item.status === 1 && (
        <Button
          variant="ghost"
          className="hover:no-underline hover:text-primary/80 text-primary"
          onClick={() => handleDetail("LOCK")}
        >
          {t("lock")}
        </Button>
      )}
      {item.status === 2 && (
        <Button
          variant="link"
          className="hover:no-underline hover:text-primary/80 text-red-500"
          onClick={() => handleDetail("STOP")}
        >
          {t("stop")}
        </Button>
      )}
      {showStatus === ShowStatus.UNLOCK && (
        <UnlockDialog
          onOpenChange={() => setShowStatus(undefined)}
          item={item}
        />
      )}
      {showStatus === ShowStatus.LOCK && (
        <LockDialog onOpenChange={() => setShowStatus(undefined)} item={item} />
      )}
      {showStatus === ShowStatus.STOP && (
        <StopDialog onOpenChange={() => setShowStatus(undefined)} item={item} />
      )}
      {showStatus === ShowStatus.CHECK && (
        <CheckDialog
          onOpenChange={() => setShowStatus(undefined)}
          item={item}
        />
      )}
    </div>
  );
}
