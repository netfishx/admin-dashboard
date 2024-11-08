"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckDialog } from "./check-dialog";
import { ShowStatus } from "./defiend";
import { LockDialog } from "./lock-dialog";
import { StopDialog } from "./stop-dialog";
import { UnlockDialog } from "./unlock-dialog";

export default function DetailButton(props: { id: string }) {
  const { id } = props;
  const t = useTranslations("fund.collection");
  const router = useRouter();
  const [showStatus, setShowStatus] = useState<ShowStatus>();
  function handleDetail(status: ShowStatus) {
    setShowStatus(status);
  }
  return (
    <div className="flex gap-2 justify-around">
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80"
        onClick={() => handleDetail(ShowStatus.UNLOCK)}
      >
        {t("unlock")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80"
        onClick={() => handleDetail(ShowStatus.CHECK)}
      >
        {t("check")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 text-red-500"
        onClick={() => handleDetail(ShowStatus.LOCK)}
      >
        {t("lock")}
      </Button>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 text-red-500"
        onClick={() => handleDetail(ShowStatus.STOP)}
      >
        {t("stop")}
      </Button>
      {showStatus === ShowStatus.UNLOCK && (
        <UnlockDialog onOpenChange={() => setShowStatus(undefined)} />
      )}
      {showStatus === ShowStatus.LOCK && (
        <LockDialog onOpenChange={() => setShowStatus(undefined)} />
      )}
      {showStatus === ShowStatus.STOP && (
        <StopDialog onOpenChange={() => setShowStatus(undefined)} />
      )}
      {showStatus === ShowStatus.CHECK && (
        <CheckDialog onOpenChange={() => setShowStatus(undefined)} />
      )}
    </div>
  );
}
