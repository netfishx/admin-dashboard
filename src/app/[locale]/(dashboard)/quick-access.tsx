import { FileText, Scale, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";

export default function QuickAccess() {
  const t = useTranslations();
  return (
    <div className="p-4 rounded bg-card">
      <div className="text-base mb-4">{t("quickAccess")}</div>
      <div className="grid grid-cols-3 gap-4">
        {/* 第一行 */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <Users className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("memberManagement")}</p>
        </Link>
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <Users className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("agentManagement")}</p>
        </Link>
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <Scale className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("withdrawalApplication")}</p>
        </Link>

        {/* 第二行 */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <Scale className="h-4 w-4" />
          </div>
          <p className="text-xs whitespace-nowrap">
            {t("helpSubordinateRepay")}
          </p>
        </Link>
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("betList")}</p>
        </Link>
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("agentReport")}</p>
        </Link>

        {/* 第三行 */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("memberReport")}</p>
        </Link>
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("betList")}</p>
        </Link>
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="size-9 bg-accent flex items-center justify-center rounded">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-xs">{t("accountChangeRecord")}</p>
        </Link>
      </div>
    </div>
  );
}
