"use client";

import { Button } from "@/components/ui/button";
import type { GameRecordRequestRecords } from "@/lib/types";
import {
  guandanOrderIdAtom,
  orderListGuandanDetailDialogAtom,
} from "@/store";
import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
export default function DetailButton({
  item,
}: {
  item: GameRecordRequestRecords;
}) {
  const t = useTranslations("report.orderlist");
  const setOpen = useSetAtom(orderListGuandanDetailDialogAtom);
  const setId = useSetAtom(guandanOrderIdAtom);
  const [isPending, startTransition] = useTransition();
  const handleDialogOpenChanged = () => {
    startTransition(async () => {
      setId(item.id);
      setOpen(true);
    });
  };
  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        disabled={isPending}
        className="text-primary hover:text-primary/80 px-2 text-sm"
        onClick={handleDialogOpenChanged}
      >
        {isPending && <Loader2 className="animate-spin" />}
        {t("more")}
      </Button>
    </div>
  );
}
