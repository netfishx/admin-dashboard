"use client";

import { Button } from "@/components/ui/button";
import { agentBaccaratParentAgentIdAtom } from "@/store";
import { useAtom } from "jotai";
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
  const [parentAgentIds, setParentAgentId] = useAtom(
    agentBaccaratParentAgentIdAtom,
  );
  return (
    <Button
      variant="ghost"
      className="text-primary hover:text-primary/80 hover:no-underline"
      onClick={() => {
        setParentAgentId([...parentAgentIds, { searchParams, parentAgentId }]);
        router.push(
          `/reports/agent/baccarat/ratio?${new URLSearchParams({
            ...searchParams,
            parentAgentId,
          })}`,
        );
      }}
    >
      {t("more")}
    </Button>
  );
}
