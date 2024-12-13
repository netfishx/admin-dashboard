"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

export default function DetailButton() {
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
            `/reports/order/baccarat?startTime=${startTime}&endTime=${endTime}`,
          );
        }}
      >
        {t("more")}
      </Button>
    </div>
  );
}
