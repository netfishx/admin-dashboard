"use client";
import { getGuandanReportListDetail } from "@/api";
import { Button } from "@/components/ui/button";
import type { GameRecordRequestRecords } from "@/lib/types";
import {
  guandanOrderIdAtom,
  orderListGuandanDetailDataAtom,
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
  const setId = useSetAtom(guandanOrderIdAtom);
  const [isPending, startTransition] = useTransition();
  const setData = useSetAtom(orderListGuandanDetailDataAtom);
  const handleDialogOpenChanged = () => {
    startTransition(async () => {
      setId(item.id);
      const { code, data, message } = await getGuandanReportListDetail({
        issueNumber: item.id,
        pageNum: 1,
        pageSize: 10,
      });
      if (code === 0 && data) {
        setData(data);
      } else {
        toast.error(message);
      }
      setOpen(true);
    });
  };
  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        disabled={isPending}
        className="px-2 text-sm text-primary hover:text-primary/80"
        onClick={handleDialogOpenChanged}
      >
        {isPending && <Loader2 className="animate-spin" />}
        {t("more")}
      </Button>
    </div>
  );
}
