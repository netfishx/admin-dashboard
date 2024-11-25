"use client";
import { getTodayFundList } from "@/api";
import type { TodayFundList } from "@/lib/types";
import { endOfDay, startOfDay } from "date-fns";
import { useFormatter, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function DataOverviewFlow() {
  const t = useTranslations();
  const format = useFormatter();
  const now = Date.now();
  const start = startOfDay(now).getTime();
  const end = endOfDay(now).getTime();
  const [info, setInfo] = useState<TodayFundList>();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTodayFundList({
        startTime: start,
        endTime: end,
      });
      console.log("🌸 ~ data:", data);

      setInfo(data);
    };
    fetchData();
  }, []);
  return (
    <div className="p-4 rounded bg-card">
      <div className="text-base mb-4">{t("dataOverview")}</div>
      <div className="grid grid-cols-2 gap-y-4 text-center ">
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xxs text-muted-foreground mb-1">
            {t("chargeAmount")}
          </p>
          <p className="text-xs font-semibold">
            {format.number(info?.rechargeAmount ?? 0)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xxs text-muted-foreground mb-1">
            {t("withdrawAmount")}
          </p>
          <p className="text-xs font-semibold">
            {format.number(info?.withdrawAmount ?? 0)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xxs text-muted-foreground mb-1">
            {t("creditAmount")}
          </p>
          <p className="text-xs font-semibold">
            {format.number(info?.creditAmount ?? 0)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xxs text-muted-foreground mb-1">
            {t("lentMoney")}
          </p>
          <p className="text-xs font-semibold">
            {format.number(info?.lendAmount ?? 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
