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
    <div className="p-4 bg-background flex-1 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium">{t("walletInfo")}</h2>
        <DetailButton data={data} />
      </div>

      <div className="grid grid-cols-4 gap-4">
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
        <div />
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
