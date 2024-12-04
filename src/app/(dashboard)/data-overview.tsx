"use client";
import { Button } from "@/components/ui/button";
import type { UserBasicInfo } from "@/lib/types";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";
import { AddDialog } from "./personal/info/add-dialog";

export function DataOverview({
  data,
}: {
  data: UserBasicInfo;
}) {
  const t = useTranslations();
  const format = useFormatter();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="rounded bg-card">
        <div className="px-4 pt-4 flex justify-between items-center mb-4">
          <div className="text-base">{t("walletData")}</div>
          <div className="text-xs text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="bg-primary text-card hover:text-card/80 px-8 py-0.5 rounded-full hover:bg-primary/80 h-6 w-16"
              onClick={() => setOpen(true)}
            >
              {t("charge")}
            </Button>
          </div>
        </div>
        <div className="p-2">
          <div className="grid grid-cols-3 gap-y-4 text-center ">
            <div className="flex flex-col items-center justify-center p-2">
              <p className="text-xs text-muted-foreground mb-1">
                {t("totalAmount")}
              </p>
              <p className="text-xs font-semibold">
                {format.number(data?.totalBalanceMoney ?? 0)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <p className="text-xs text-muted-foreground mb-1">
                {t("availableAmount")}
              </p>
              <p className="text-xs font-semibold">
                {format.number(data?.usableBalanceMoney ?? 0)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <p className="text-xs text-muted-foreground mb-1">
                {t("frozenAmount")}
              </p>
              <p className="text-xs font-semibold">
                {format.number(data?.gameFreezeMoney ?? 0)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <p className="text-xs text-muted-foreground mb-1">
                {t("withdrawFrozenAmount")}
              </p>
              <p className="text-xs font-semibold">
                {format.number(data?.withdrawFreezeMoney ?? 0)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <p className="text-xs text-muted-foreground mb-1">
                {t("totalCreditAmount")}
              </p>
              <p className="text-xs font-semibold">
                {format.number(data?.totalCreditMoney ?? 0)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <p className="text-xs text-muted-foreground mb-1">
                {t("memberReturn")}
              </p>
              <p className="text-xs font-semibold">
                {format.number(data?.memberToBeRepaidMoney ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {open && <AddDialog onOpenChange={setOpen} data={data} />}
    </div>
  );
}
