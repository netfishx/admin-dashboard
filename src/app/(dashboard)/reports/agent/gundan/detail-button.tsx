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
        variant="link"
        className="hover:no-underline hover:text-primary/80"
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
