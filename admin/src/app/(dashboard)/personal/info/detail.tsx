import { Skeleton } from "@/components/ui/skeleton";
import type { UserBasicInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { DetailButton } from "./detail-button";

export async function Detail({ data }: { data?: UserBasicInfo }) {
  const t = await getTranslations("personal.info");

  return (
    <div className="flex flex-1 flex-col gap-2 bg-background p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-sm">{t("walletInfo")}</h2>
        <DetailButton data={data} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <div className="mb-1 text-muted-foreground text-sm">
            {t("balance")}
          </div>
          <div className="font-normal text-2xl">
            {data ? (
              formatNumber(data?.totalBalanceMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
        <div>
          <div className="mb-1 text-muted-foreground text-sm">
            {t("availableBalance")}
          </div>
          <div className="font-normal text-2xl">
            {data ? (
              formatNumber(data?.usableBalanceMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
        <div>
          <div className="mb-1 text-muted-foreground text-sm">
            {t("freezeBalance")}
          </div>
          <div className="font-normal text-2xl">
            {data ? (
              formatNumber(data?.gameFreezeMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
        <div />
        <div>
          <div className="mb-1 text-muted-foreground text-sm">
            {t("creditAmount")}
          </div>
          <div className="font-normal text-2xl">
            {data ? (
              formatNumber(data?.totalCreditMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
        <div>
          <div className="mb-1 text-muted-foreground text-sm">
            {t("pendingAmount")}
          </div>
          <div className="font-normal text-2xl">
            {data ? (
              formatNumber(data?.memberToBeRepaidMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
        <div>
          <div className="mb-1 text-muted-foreground text-sm">
            {t("unUsedCredit")}
          </div>
          <div className="font-normal text-2xl">
            {data ? (
              formatNumber(data?.memberUnusedMoney || 0)
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        </div>
        <div>
          <div className="mb-1 text-muted-foreground text-sm">
            {t("withdrawFreezeAmount")}
          </div>
          <div className="font-normal text-2xl">
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
