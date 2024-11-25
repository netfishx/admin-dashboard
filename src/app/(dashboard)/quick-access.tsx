import { FileText, Scale, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function QuickAccess() {
  const t = useTranslations();
  return (
    <div className="p-4 rounded bg-card">
      {/* 基本信息 代理管理 会员管理 提现申请 代理报表-真人 代理报表-棋牌 帐变记录 按期汇总报表 安全中心 */}
      <div className="text-base mb-4">{t("quickAccess")}</div>
      <div className="grid grid-cols-3 gap-4">
        {/* 第一行 */}
        <Link
          href="/personal/info"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <Scale className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("basicInfo")}</p>
        </Link>
        <Link
          href="/users/member"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <Users className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("memberManagement")}</p>
        </Link>
        <Link
          href="/users/agent"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <Users className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("agentManagement")}</p>
        </Link>

        {/* 第二行 */}
        <Link
          href="/withdraw/apply"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <Scale className="h-4 w-4" />
          </div>
          <p className="text-xs whitespace-nowrap">{t("withdrawalApply")}</p>
        </Link>
        <Link
          href="/reports/agent/baccarat/ratio"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("agentReportBaccarat")}</p>
        </Link>
        <Link
          href="/reports/agent/guandan"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("agentReportGuandan")}</p>
        </Link>

        {/* 第三行 */}
        <Link
          href="/reports/change"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("accountChangeRecord")}</p>
        </Link>
        <Link
          href="/reports/period"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("periodReport")}</p>
        </Link>
        <Link
          href="/personal/security"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("securityCenter")}</p>
        </Link>
      </div>
    </div>
  );
}
