import { FileText, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";

export function QuickAccess() {
  const t = useTranslations();
  return (
    <div className="bg-card rounded-sm p-4">
      {/* 代理管理 会员管理 真人代理报表 棋牌代理报表 帐变记录 按期汇总报表 */}
      <div className="mb-4 text-base">{t("quickAccess")}</div>
      <div className="grid grid-cols-3 gap-4">
        {/* 第一行 */}
        <Link
          href="/users/agent"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="bg-accent flex size-9 items-center justify-center rounded-sm">
            <Users className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("agentManagement")}</p>
        </Link>
        <Link
          href="/users/member"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="bg-accent flex size-9 items-center justify-center rounded-sm">
            <Users className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("memberManagement")}</p>
        </Link>
        <Link
          href="/reports/agent/baccarat/ratio"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="bg-accent flex size-9 items-center justify-center rounded-sm">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("agentReportBaccarat")}</p>
        </Link>
        {/* 第二行 */}
        <Link
          href="/reports/agent/guandan"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="bg-accent flex size-9 items-center justify-center rounded-sm">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("agentReportGuandan")}</p>
        </Link>
        <Link
          href="/reports/change"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="bg-accent flex size-9 items-center justify-center rounded-sm">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("accountChangeRecord")}</p>
        </Link>
        <Link
          href="/reports/period"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="bg-accent flex size-9 items-center justify-center rounded-sm">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("periodReport")}</p>
        </Link>
      </div>
    </div>
  );
}
