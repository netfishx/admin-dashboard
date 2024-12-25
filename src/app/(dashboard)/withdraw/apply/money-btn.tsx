"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ApplyData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
export function MoneyBtn({ data }: { data: ApplyData }) {
  const [open, setOpen] = useState(false);
  const openDialog = () => {
    console.info("查看提现记录", data.withdrawMoney);
    setOpen(true);
  };
  return (
    <>
      <Button
        variant="link"
        onClick={openDialog}
        className="px-0 text-sm"
        size="sm"
      >
        {formatNumber(Number(data.withdrawMoney))}
      </Button>
      <MoneyDialog data={data} open={open} onOpenChange={setOpen} />
    </>
  );
}

export function MoneyDialog({
  data,
  open,
  onOpenChange,
}: {
  data: ApplyData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("withdraw.apply");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("withdrawAmount")} - {t("withdraw")}
          </DialogTitle>

          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <span>{t("applyWithdrawMoney")}</span>
            <span>{formatNumber(Number(data.withdrawMoney))}</span>
          </p>
          <p className="flex items-center gap-2">
            <span>{t("withdrawFee")}</span>
            <span>{formatNumber(Number(data.withdrawFee))}</span>
          </p>
          <p className="flex items-center gap-2">
            <span>{t("withdrawStatus")}</span>
            {/* 后期应该要换成actualMoney */}
            <span>
              {formatNumber(
                Number(data.withdrawMoney) - Number(data.withdrawFee),
              )}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span>{t("withdrawModeNew")}</span>
            <span>{data.withdrawWay}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
