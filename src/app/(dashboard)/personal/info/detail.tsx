import { Skeleton } from "@/components/ui/skeleton";
import type { UserBasicInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { DetailButton } from "./detail-button";

export async function Detail({ data }: { data?: UserBasicInfo }) {
  const t = await getTranslations("personal.info");

  return (
    <div className="bg-background flex flex-1 flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">{t("walletInfo")}</h2>
        <DetailButton data={data} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <div className="text-muted-foreground mb-1 text-sm">
            {t("balance")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.totalBalanceMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1 text-sm">
            {t("availableBalance")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.usableBalanceMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1 text-sm">
            {t("freezeBalance")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.gameFreezeMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
        <div />
        <div>
          <div className="text-muted-foreground mb-1 text-sm">
            {t("creditAmount")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.totalCreditMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1 text-sm">
            {t("pendingAmount")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.memberToBeRepaidMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1 text-sm">
            {t("unUsedCredit")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.memberUnusedMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1 text-sm">
            {t("withdrawFreezeAmount")}
          </div>
          <div className="text-2xl font-normal">
            {data ? (
              formatNumber(data?.withdrawFreezeMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
