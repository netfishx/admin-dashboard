"use client";
import { Button } from "@/components/ui/button";
import { orderListGuandanDetailDialogAtom } from "@/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
export default function DetailButton() {
  const t = useTranslations("report.orderlist");
  const [, setOpen] = useAtom(orderListGuandanDetailDialogAtom);
  const handleDialogOpenChanged = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary/80 text-sm px-2"
        onClick={() => handleDialogOpenChanged(true)}
      >
        {t("more")}
      </Button>
    </div>
  );
}
