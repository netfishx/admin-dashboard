"use client";
import { Button } from "@/components/ui/button";
import type { PeriodReportList } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
export function Actions({
  searchParams,
  data,
}: {
  searchParams: { [key: string]: string | undefined };
  data: PeriodReportList;
}) {
  const t = useTranslations("report.orderlist");
  const router = useTransitionRouter();
  const { issueNumber, ...rest } = searchParams;
  const searchParamsStr = new URLSearchParams(
    rest as Record<string, string>,
  ).toString();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-primary hover:text-primary/80 px-2 text-sm"
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
