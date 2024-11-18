"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function DetailButton({ id }: { id: string }) {
  const t = useTranslations("report.orderlist");
  const router = useRouter();
  function handleDetail() {
    router.push(`/reports/agent/baccarat/member?agentId=${id}&page=1&size=10`);
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
