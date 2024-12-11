"use client";
import type { TodayFundList } from "@/lib/types";
import { useFormatter, useTranslations } from "next-intl";

export function DataOverviewFlow({ data }: { data: TodayFundList }) {
  const t = useTranslations();
  const format = useFormatter();
  return (
    <div className="p-4 rounded bg-card h-48 shrink-0">
      <div className="text-base mb-4">{t("dataOverview")}</div>
      <div className="grid grid-cols-2 gap-y-2 text-center ">
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xxs text-muted-foreground mb-1">
            {t("chargeAmount")}
          </p>
          <p className="text-xs font-semibold">
            {format.number(data?.rechargeAmount ?? 0)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xxs text-muted-foreground mb-1">
            {t("withdrawAmount")}
          </p>
          <p className="text-xs font-semibold">
            {format.number(data?.withdrawAmount ?? 0)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xxs text-muted-foreground mb-1">
            {t("creditAmount")}
          </p>
          <p className="text-xs font-semibold">
            {format.number(data?.creditAmount ?? 0)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xxs text-muted-foreground mb-1">
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
