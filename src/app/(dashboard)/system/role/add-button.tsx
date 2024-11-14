"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function AddButton() {
  const t = useTranslations("system.role");
  return <Button>{t("add")}</Button>;
}
