import type { UserBasicInfo } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { DetailButton } from "./detail-button";

export async function Detail({ data }: { data: UserBasicInfo }) {
  const t = await getTranslations("personal.info");
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("zh-CN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="py-6 px-5 bg-background flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg text-gray-700">{t("walletInfo")}</h2>
          <DetailButton />
        </div>

        {/* Top row */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-muted-foreground text-sm mb-1">
              {t("balance")}
            </div>
            <div className="text-2xl font-semibold">
              {formatNumber(data?.totalBalanceMoney)}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-sm mb-1">
              {t("availableBalance")}
            </div>
            <div className="text-2xl font-semibold">
              {formatNumber(data?.usableBalanceMoney)}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-sm mb-1">
              {t("freezeBalance")}
            </div>
            <div className="text-2xl font-semibold">
              {formatNumber(data?.gameFreezeMoney)}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-muted-foreground text-sm mb-1">
              {t("creditAmount")}
            </div>
            <div className="text-2xl font-semibold">
              {formatNumber(data?.totalCreditMoney)}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-sm mb-1">
              {t("pendingAmount")}
            </div>
            <div className="text-2xl font-semibold">
              {formatNumber(data?.memberToBeRepaidMoney)}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-sm mb-1">
              {t("unUsedCredit")}
            </div>
            <div className="text-2xl font-semibold">
              {formatNumber(data?.memberUnusedMoney)}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-sm mb-1">
              {t("withdrawFreezeAmount")}
            </div>
            <div className="text-2xl font-semibold">
              {formatNumber(data?.withdrawFreezeMoney)}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
