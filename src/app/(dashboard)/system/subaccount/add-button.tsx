"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function AddButton() {
  const t = useTranslations("system.subaccount");
  return <Button>{t("add")}</Button>;
}
