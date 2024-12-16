"use client";
import { Button } from "@/components/ui/button";
import type { RatioReportListTypes } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function DetailButton(props: { item: RatioReportListTypes }) {
  const { item } = props;
  const searchParams = useSearchParams();
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const t = useTranslations("report.orderlist");
  const router = useRouter();
  const ut = item?.userType === 1 ? "houseOwnerId" : "parentAgentId";
  function handleDetail() {
    router.push(
      `/reports/agent/baccarat/ratio?${ut}=${item?.userId}&page=1&size=10&startTime=${startTime}&endTime=${endTime}`,
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
