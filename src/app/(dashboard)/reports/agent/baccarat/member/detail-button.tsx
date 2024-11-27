"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
export default function DetailButton({ id }: { id: string }) {
  const t = useTranslations("report.orderlist");
  const router = useRouter();
  const searchParams = useSearchParams();
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  function handleDetail() {
    router.push(
      `/reports/agent/baccarat/member?agentId=${id}&page=1&size=10&startTime=${startTime}&endTime=${endTime}`,
    );
  }
  return (
    <div>
      <Button
        variant="ghost"
        className="hover:no-underline hover:text-primary/80 text-primary"
        onClick={() => handleDetail()}
      >
        {t("more")}
      </Button>
    </div>
  );
}
