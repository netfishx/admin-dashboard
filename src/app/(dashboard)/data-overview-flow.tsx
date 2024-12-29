"use client";
import type { TodayFundList } from "@/lib/types";
import { useTranslations } from "next-intl";
import TruncatedAmount from "./truncated-amount";

export function DataOverviewFlow({ data }: { data: TodayFundList }) {
  const t = useTranslations();

  return (
    <div className="bg-card h-48 shrink-0 rounded-sm p-4">
      <div className="mb-4 text-base">{t("dataOverview")}</div>
      <div className="grid grid-cols-2 gap-y-2 text-center">
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-muted-foreground mb-1 text-xs">
            {t("chargeAmount")}
          </p>
          <div className="text-xs font-semibold">
            <TruncatedAmount amount={data?.rechargeAmount ?? 0} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-muted-foreground mb-1 text-xs">
            {t("withdrawAmount")}
          </p>
          <div className="text-xs font-semibold">
            <TruncatedAmount amount={data?.withdrawAmount ?? 0} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-muted-foreground mb-1 text-xs">
            {t("creditAmount")}
          </p>
          <div className="text-xs font-semibold">
            <TruncatedAmount amount={data?.creditAmount ?? 0} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-muted-foreground mb-1 text-xs">{t("lentMoney")}</p>
          <div className="text-xs font-semibold">
            <TruncatedAmount amount={data?.lendAmount ?? 0} />
          </div>
        </div>
      </div>
    </div>
  );
}
