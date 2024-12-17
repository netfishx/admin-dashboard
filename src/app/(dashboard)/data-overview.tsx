"use client";
import { Button } from "@/components/ui/button";
import type { UserBasicInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AddDialog } from "./personal/info/add-dialog";

export function DataOverview({ data }: { data: UserBasicInfo }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-48 shrink-0 rounded-sm bg-card">
        <div className="flex items-center justify-between p-4">
          <div>{t("walletData")}</div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-16 rounded-full bg-primary text-card hover:bg-primary/80 hover:text-card/80"
            onClick={() => setOpen(true)}
          >
            {t("charge")}
          </Button>
        </div>
        <div className="p-2">
          <div className="grid grid-cols-3 gap-y-2 text-center">
            <div className="flex flex-col items-center justify-center p-2">
              <p className="mb-1 text-xs text-muted-foreground">
                {t("totalAmount")}
              </p>
              <p className="text-xs font-semibold">
                {formatNumber(data?.totalBalanceMoney ?? 0)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <p className="mb-1 text-xs text-muted-foreground">
                {t("availableAmount")}
              </p>
              <p className="text-xs font-semibold">
                {formatNumber(data?.usableBalanceMoney ?? 0)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <p className="mb-1 text-xs text-muted-foreground">
                {t("frozenAmount")}
              </p>
              <p className="text-xs font-semibold">
                {formatNumber(data?.gameFreezeMoney ?? 0)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <p className="mb-1 text-xs text-muted-foreground">
                {t("withdrawFrozenAmount")}
              </p>
              <p className="text-xs font-semibold">
                {formatNumber(data?.withdrawFreezeMoney ?? 0)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <p className="mb-1 text-xs text-muted-foreground">
                {t("totalCreditAmount")}
              </p>
              <p className="text-xs font-semibold">
                {formatNumber(data?.totalCreditMoney ?? 0)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <p className="mb-1 text-xs text-muted-foreground">
                {t("memberReturn")}
              </p>
              <p className="text-xs font-semibold">
                {formatNumber(data?.memberToBeRepaidMoney ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {open && <AddDialog onOpenChange={setOpen} data={data} />}
    </>
  );
}
