"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Detaildialog } from "./detail-dialog";

export default function DetailButton() {
  const t = useTranslations("report.orderlist");
  const [open, setOpen] = useState(false);
  const handleDialogOpenChanged = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  return (
    <div>
      <Button
        variant="ghost"
        className="hover:no-underline hover:text-primary/80 text-primary"
        onClick={() => handleDialogOpenChanged(true)}
      >
        {t("more")}
      </Button>
      <Detaildialog open={open} onOpenChange={handleDialogOpenChanged} />
    </div>
  );
}
