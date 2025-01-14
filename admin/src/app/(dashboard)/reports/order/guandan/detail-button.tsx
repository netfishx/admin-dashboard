"use client";

import { getGuandanReportListDetail } from "@/api";
import { Button } from "@/components/ui/button";
import type { GameRecordRequestRecords } from "@/lib/types";
import {
  guandanOrderDetailAtom,
  orderListGuandanDetailDialogAtom,
} from "@/store";
import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";
export default function DetailButton({
  item,
}: {
  item: GameRecordRequestRecords;
}) {
  const t = useTranslations("report.orderlist");
  const setOpen = useSetAtom(orderListGuandanDetailDialogAtom);
  const setGuandanOrderDetail = useSetAtom(guandanOrderDetailAtom);
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        disabled={isPending}
        className="text-primary hover:text-primary/80 px-2 text-sm"
        onClick={() => {
          startTransition(async () => {
            const { code, data, message } = await getGuandanReportListDetail(
              item.id,
            );
            if (code === 0) {
              console.info(item.id, data);
              setGuandanOrderDetail(data?.list || []);
              setOpen(true);
            } else {
              toast.error(message);
            }
          });
        }}
      >
        {isPending && <Loader2 className="animate-spin" />}
        {t("more")}
      </Button>
    </div>
  );
}
