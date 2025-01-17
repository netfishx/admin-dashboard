"use client";
import { Button } from "@/components/ui/button";
import type { UserBasicInfo } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AddDialog } from "./personal/info/add-dialog";
import TruncatedAmount from "./truncated-amount";

export function DataOverview({ data }: { data?: UserBasicInfo }) {
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
              <div className="mb-1 text-muted-foreground text-xs">
                {t("totalAmount")}
              </div>
              <div className="font-semibold text-xs">
                <TruncatedAmount amount={data?.totalBalanceMoney ?? 0} />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <div className="mb-1 text-muted-foreground text-xs">
                {t("availableAmount")}
              </div>
              <div className="font-semibold text-xs">
                <TruncatedAmount amount={data?.usableBalanceMoney ?? 0} />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <div className="mb-1 text-muted-foreground text-xs">
                {t("frozenAmount")}
              </div>
              <div className="font-semibold text-xs">
                <TruncatedAmount amount={data?.gameFreezeMoney ?? 0} />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <div className="mb-1 text-muted-foreground text-xs">
                {t("withdrawFrozenAmount")}
              </div>
              <div className="font-semibold text-xs">
                <TruncatedAmount amount={data?.withdrawFreezeMoney ?? 0} />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <div className="mb-1 text-muted-foreground text-xs">
                {t("totalCreditAmount")}
              </div>
              <div className="font-semibold text-xs">
                <TruncatedAmount amount={data?.totalCreditMoney ?? 0} />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <div className="mb-1 text-muted-foreground text-xs">
                {t("memberReturn")}
              </div>
              <div className="font-semibold text-xs">
                <TruncatedAmount amount={data?.memberToBeRepaidMoney ?? 0} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && <AddDialog onOpenChange={setOpen} data={data} />}
    </>
  );
}
