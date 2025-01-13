import { Button } from "@/components/ui/button";
import type { RatioReportListTypes } from "@/lib/types";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function DetailButton({
  item,
  searchParams,
}: {
  item: RatioReportListTypes;
  searchParams: { [key: string]: string | undefined };
}) {
  const t = useTranslations("report.orderlist");
  return (
    <div>
      <Button
        variant="ghost"
        className="text-primary hover:text-primary/80 hover:no-underline"
        asChild
      >
        <Link
          href={{
            pathname: "/reports/agent/baccarat/ratio",
            query: {
              ...searchParams,
              parentAgentId: item?.userId,
            },
          }}
        >
          {t("more")}
        </Link>
      </Button>
    </div>
  );
}
