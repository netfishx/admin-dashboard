"use client";
import { Button } from "@/components/ui/button";
import type { GameRecordRequestRecords } from "@/lib/types";
import {
  orderListGuandanDetailDialogAtom,
  orderListGuandanDetailItemAtom,
} from "@/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
export default function DetailButton({
  item,
}: {
  item: GameRecordRequestRecords;
}) {
  const t = useTranslations("report.orderlist");
  const [, setOpen] = useAtom(orderListGuandanDetailDialogAtom);
  const [, setItem] = useAtom(orderListGuandanDetailItemAtom);
  const handleDialogOpenChanged = (isOpen: boolean) => {
    setOpen(isOpen);
    setItem(item);
  };
  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={() => handleDialogOpenChanged(true)}
      >
        {t("more")}
      </Button>
    </div>
  );
}
