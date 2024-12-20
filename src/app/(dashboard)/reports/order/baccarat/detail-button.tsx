"use client";
import { getOrderDetail } from "@/api";
import { Button } from "@/components/ui/button";
import type { OrderItemDetailType, OrderReportsRecord } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Detaildialog } from "./detail-dialog";

export default function DetailButton(props: { item: OrderReportsRecord }) {
  const { item } = props;
  const t = useTranslations("report.orderlist");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<OrderItemDetailType>();
  const handleDialogOpenChanged = () => {
    startTransition(async () => {
      const { code, data, message } = await getOrderDetail({ id: item.id });
      if (code === 0 && data) {
        setData(data);
        setOpen(true);
      } else {
        toast.error(message);
      }
    });
  };
  return (
    <div>
      <Button
        variant="ghost"
        disabled={isPending}
        className="text-primary hover:text-primary/80 hover:no-underline"
        onClick={handleDialogOpenChanged}
      >
        {isPending && <Loader2 className="animate-spin" />}
        {t("more")}
      </Button>
      <Detaildialog
        open={open}
        onOpenChange={(o) => {
          setData(undefined);
          setOpen(o);
        }}
        data={data}
      />
    </div>
  );
}
