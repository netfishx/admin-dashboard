"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function MaintainForm() {
  const t = useTranslations("games.maintain");
  return (
    <div className="flex items-center justify-end gap-2 bg-background py-2 px-4">
      <Button variant="destructive">{t("batchOpen")}</Button>
      <Button>{t("batchClose")}</Button>
    </div>
  );
}
