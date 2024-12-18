"use client";
import { Button } from "@/components/ui/button";
import type { MemberBetReportRequestRecords } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
export default function DetailButton({
  item,
}: { item: MemberBetReportRequestRecords }) {
  const t = useTranslations("report.orderlist");
  const router = useRouter();
  const searchParams = useSearchParams();
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  function handleDetail() {
    router.push(
      `/reports/order/baccarat?lastAgentId=${item.agentId}&startTime=${startTime}&endTime=${endTime}`,
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
