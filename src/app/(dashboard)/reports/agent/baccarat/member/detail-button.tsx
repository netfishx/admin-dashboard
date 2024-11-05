"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function DetailButton() {
  const t = useTranslations("report.orderlist");
  function handleDialogOpenChanged() {
    // console.log("handleDialogOpenChanged");
  }
  return (
    <div>
      <Button
        variant="link"
        className="hover:no-underline hover:text-primary/80"
        onClick={() => handleDialogOpenChanged()}
      >
        {t("more")}
      </Button>
    </div>
  );
}
