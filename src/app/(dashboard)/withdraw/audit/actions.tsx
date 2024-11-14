"use client";

import { Button } from "@/components/ui/button";
import type { AuditList } from "@/lib/types";
import { useTranslations } from "next-intl";

export function Actions({ data }: { data: AuditList }) {
  const t = useTranslations("withdraw.apply");
  console.info(data);

  return (
    <div className="flex justify-center">
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80 px-0"
      >
        {t("clear")}
      </Button>
    </div>
  );
}
