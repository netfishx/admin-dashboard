"use client";
import type { TodayFundList } from "@/lib/types";
import { useFormatter, useTranslations } from "next-intl";

export function DataOverviewFlow({ data }: { data: TodayFundList }) {
  const t = useTranslations();
  const format = useFormatter();
  return (
    <div className="h-48 shrink-0 rounded bg-card p-4">
      <div className="mb-4 text-base">{t("dataOverview")}</div>
      <div className="grid grid-cols-2 gap-y-2 text-center">
        <div className="flex flex-col items-center justify-center p-2">
          <p className="mb-1 text-xxs text-muted-foreground">
            {t("chargeAmount")}
          </p>
          <p className="text-xs font-semibold">
            {format.number(data?.rechargeAmount ?? 0)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="mb-1 text-xxs text-muted-foreground">
            {t("withdrawAmount")}
          </p>
          <p className="text-xs font-semibold">
            {format.number(data?.withdrawAmount ?? 0)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="mb-1 text-xxs text-muted-foreground">
            {t("creditAmount")}
          </p>
          <p className="text-xs font-semibold">
            {format.number(data?.creditAmount ?? 0)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="mb-1 text-xxs text-muted-foreground">
            {t("lentMoney")}
          </p>
          <p className="text-xs font-semibold">
            {format.number(data?.lendAmount ?? 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
