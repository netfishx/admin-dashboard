"use client";
import { times } from "@/components/daterange-filter";
import { Button } from "@/components/ui/button";
import type { RatioReportListTypes } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function DetailButton(props: { item: RatioReportListTypes }) {
  const { item } = props;
  const t = useTranslations("report.orderlist");
  const router = useRouter();
  const ut = item?.userType === 1 ? "agentId" : "houseOwnerId";
  function handleDetail() {
    router.push(
      `/reports/agent/baccarat/ratio?${ut}=${item?.id}&page=1&size=10&startTime=${times.startTime}&endTime=${times.endTime}`,
    );
  }
  return (
    <div>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80"
        onClick={() => handleDetail()}
      >
        {t("more")}
      </Button>
    </div>
  );
}
