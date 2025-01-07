"use client";
import { Button } from "@/components/ui/button";
import type { RatioReportListTypes } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
export default function DetailButton(props: { item: RatioReportListTypes }) {
  const { item } = props;
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const t = useTranslations("report.orderlist");
  const router = useTransitionRouter();
  function handleDetail() {
    router.push(
      `/reports/agent/baccarat/ratio?${gameId ? `gameId=${gameId}&` : ""}parentAgentId=${item?.userId}&startTime=${startTime}&endTime=${endTime}`,
    );
  }
  return (
    <div>
      <Button
        variant="ghost"
        className="text-primary hover:text-primary/80 hover:no-underline"
        onClick={() => handleDetail()}
      >
        {t("more")}
      </Button>
    </div>
  );
}
