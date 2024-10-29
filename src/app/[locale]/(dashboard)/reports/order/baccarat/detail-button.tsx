"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function DetailButton() {
  const t = useTranslations("report.orderlist");
  return (
    <Button variant="link" className="hover:no-underline hover:text-primary/80">
      {t("more")}
    </Button>
  );
}
