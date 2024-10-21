import { useTranslations } from "next-intl";
import { unstable_noStore as noStore } from "next/cache";

export default function DataOverview() {
  noStore();
  const t = useTranslations();
  return (
    <div className="p-4 rounded bg-card">
      <div className="text-base mb-4">{t("dataOverview")}</div>
      <div className="grid grid-cols-3 gap-y-4 text-center ">
        {/* First row */}
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xs text-muted-foreground mb-1">
            {t("totalAmount")}
          </p>
          <p className="text-xs font-semibold">2651356</p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xs text-muted-foreground mb-1">
            {t("availableAmount")}
          </p>
          <p className="text-xs font-semibold">115785</p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xs text-muted-foreground mb-1">
            {t("frozenAmount")}
          </p>
          <p className="text-xs font-semibold">100200</p>
        </div>

        {/* Second row */}
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xs text-muted-foreground mb-1">
            {t("unsettledAmount")}
          </p>
          <p className="text-xs font-semibold">122321</p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xs text-muted-foreground mb-1">
            {t("totalCreditAmount")}
          </p>
          <p className="text-xs font-semibold">115785</p>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-xs text-muted-foreground mb-1">
            {t("lentAmount")}
          </p>
          <p className="text-xs font-semibold">100200</p>
        </div>
      </div>
    </div>
  );
}
