"use client";
import { Button } from "@/components/ui/button";
import type { MemberReportsRecord } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

export default function DetailButton({ item }: { item: MemberReportsRecord }) {
  const t = useTranslations("report.orderlist");
  const router = useRouter();
  const searchParams = useSearchParams();
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  return (
    <div>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80"
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
