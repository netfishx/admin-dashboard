"use client";
import { Button } from "@/components/ui/button";
import type { PeriodReportList } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
export function Actions({
  searchParams,
  data,
}: {
  searchParams: { [key: string]: string | undefined };
  data: PeriodReportList;
}) {
  const t = useTranslations("report.orderlist");
  const router = useRouter();
  const searchParamsStr = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="px-2 text-sm text-primary hover:text-primary/80"
      onClick={() => {
        router.push(
          `/reports/order/baccarat?${new URLSearchParams(searchParamsStr).toString()}&issueNumber=${data.issueNumber}`,
        );
      }}
    >
      {t("more")}
    </Button>
  );
}
