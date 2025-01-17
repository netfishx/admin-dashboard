"use client";
import type { TodayFundList } from "@/lib/types";
import { useTranslations } from "next-intl";
import TruncatedAmount from "./truncated-amount";

export function DataOverviewFlow({ data }: { data: TodayFundList }) {
  const t = useTranslations();

  return (
    <div className="h-48 shrink-0 rounded-sm bg-card p-4">
      <div className="mb-4 text-base">{t("dataOverview")}</div>
      <div className="grid grid-cols-2 gap-y-2 text-center">
        <div className="flex flex-col items-center justify-center p-2">
          <p className="mb-1 text-muted-foreground text-xs">
            {t("chargeAmount")}
          </p>
          <div className="font-semibold text-xs">
            <TruncatedAmount amount={data?.rechargeAmount ?? 0} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="mb-1 text-muted-foreground text-xs">
            {t("withdrawAmount")}
          </p>
          <div className="font-semibold text-xs">
            <TruncatedAmount amount={data?.withdrawAmount ?? 0} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="mb-1 text-muted-foreground text-xs">
            {t("creditAmount")}
          </p>
          <div className="font-semibold text-xs">
            <TruncatedAmount amount={data?.creditAmount ?? 0} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="mb-1 text-muted-foreground text-xs">{t("lentMoney")}</p>
          <div className="font-semibold text-xs">
            <TruncatedAmount amount={data?.lendAmount ?? 0} />
          </div>
        </div>
      </div>
    </div>
  );
}
