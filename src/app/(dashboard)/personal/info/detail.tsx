import { Skeleton } from "@/components/ui/skeleton";
import type { UserBasicInfo } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { DetailButton } from "./detail-button";

export async function Detail({ data }: { data?: UserBasicInfo }) {
  const t = await getTranslations("personal.info");
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("zh-CN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="py-6 px-5 bg-background flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="justify-between items-center">{t("walletInfo")}</h2>
        <DetailButton data={data} />
      </div>

      {/* Top row */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-muted-foreground text-sm mb-1">
            {t("balance")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.totalBalanceMoney || 0)
            ) : (
              <Skeleton className="w-1/2 h-8" />
            )}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-sm mb-1">
            {t("availableBalance")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.usableBalanceMoney || 0)
            ) : (
              <Skeleton className="w-1/2 h-8" />
            )}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-sm mb-1">
            {t("freezeBalance")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.gameFreezeMoney || 0)
            ) : (
              <Skeleton className="w-1/2 h-8" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <div className="text-muted-foreground text-sm mb-1">
            {t("creditAmount")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.totalCreditMoney || 0)
            ) : (
              <Skeleton className="w-1/2 h-8" />
            )}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-sm mb-1">
            {t("pendingAmount")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.memberToBeRepaidMoney || 0)
            ) : (
              <Skeleton className="w-1/2 h-8" />
            )}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-sm mb-1">
            {t("unUsedCredit")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.memberUnusedMoney || 0)
            ) : (
              <Skeleton className="w-1/2 h-8" />
            )}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-sm mb-1">
            {t("withdrawFreezeAmount")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.withdrawFreezeMoney || 0)
            ) : (
              <Skeleton className="w-1/2 h-8" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
