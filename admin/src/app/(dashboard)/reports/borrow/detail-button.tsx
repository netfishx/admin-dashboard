"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function DetailButton() {
  const t = useTranslations("report.orderlist");

  return (
    <div>
      <Button
        variant="link"
        className="hover:text-primary/80 hover:no-underline"
      >
        {t("more")}
      </Button>
    </div>
  );
}
