"use client";
import { Button } from "@/components/ui/button";
import type { MemberReportsRecord } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";

export default function DetailButton({ item }: { item: MemberReportsRecord }) {
  const t = useTranslations("report.orderlist");
  const router = useTransitionRouter();
  const searchParams = useSearchParams();
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  return (
    <div>
      <Button
        variant="ghost"
        className="text-primary hover:text-primary/80 hover:no-underline"
        onClick={() =>
          router.push(
            `/reports/order/baccarat?memberId=${item?.memberId}${
              startTime ? `&startTime=${startTime}` : ""
            }${endTime ? `&endTime=${endTime}` : ""}`,
          )
        }
      >
        {t("more")}
      </Button>
    </div>
  );
}
