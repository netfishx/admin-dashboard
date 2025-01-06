"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

export default function DetailButton({ agentId }: { agentId: string }) {
  const t = useTranslations("report.orderlist");
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
      <Button
        variant="ghost"
        className="text-primary hover:text-primary/80 hover:no-underline"
        onClick={() => {
          const startTime = searchParams.get("startTime");
          const endTime = searchParams.get("endTime");
          router.push(
            `/reports/order/guandan?startTime=${startTime}&endTime=${endTime}&agentId=${agentId}`,
          );
        }}
      >
        {t("more")}
      </Button>
    </div>
  );
}
