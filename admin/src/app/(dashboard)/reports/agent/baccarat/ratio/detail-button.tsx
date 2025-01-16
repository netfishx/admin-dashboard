"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function DetailButton({
  parentAgentId,
  searchParams,
}: {
  parentAgentId: string;
  searchParams: { [key: string]: string | undefined };
}) {
  const t = useTranslations("report.orderlist");
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="text-primary hover:text-primary/80 hover:no-underline"
      onClick={() => {
        router.push(
          `/reports/agent/baccarat/ratio?${new URLSearchParams({
            ...searchParams,
            parentAgentId,
            ids: [
              ...(searchParams.ids ? searchParams.ids.split(",") : []),
              parentAgentId,
            ].join(","),
          })}`,
        );
      }}
    >
      {t("more")}
    </Button>
  );
}
