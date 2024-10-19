import { getI18n } from "@/locales/server";
import { unstable_noStore as noStore } from "next/cache";

export default async function DataOverview() {
  noStore();
  const t = await getI18n();
  return (
    <div className="w-[280px] h-[208px] p-5 rounded border bg-card">
      <div className="text-base mb-4">{t("dataOverview")}</div>
      <div className="grid grid-cols-3 gap-y-4 text-center ">
        {/* First row */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-1">{t("totalAmount")}</p>
          <p className="text-xs font-semibold">2651356</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">{t("availableAmount")}</p>
          <p className="text-xs font-semibold">115785</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">{t("frozenAmount")}</p>
          <p className="text-xs font-semibold">100200</p>
        </div>

        {/* Second row */}
        <div>
          <p className="text-xs text-gray-500 mb-1">{t("unsettledAmount")}</p>
          <p className="text-xs font-semibold">122321</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">{t("totalCreditAmount")}</p>
          <p className="text-xs font-semibold">115785</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">{t("lentAmount")}</p>
          <p className="text-xs font-semibold">100200</p>
        </div>
      </div>
    </div>
  );
}
