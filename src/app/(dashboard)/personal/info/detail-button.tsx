"use client";
import { getNewestWithdrawFee } from "@/api";
import { Button } from "@/components/ui/button";
import type { UserBasicInfo } from "@/lib/types";
import { withdrawFeeAtom } from "@/store";
import { useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AddDialog } from "./add-dialog";
import { CheckDialog } from "./check-dialog";

export function DetailButton(props: { data?: UserBasicInfo }) {
  const { data } = props;
  const t = useTranslations("personal.info");
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [isPending, startTransition] = useTransition();
  const setWithdrawFee = useSetAtom(withdrawFeeAtom);
  return (
    <div className="flex gap-2">
      <Button onClick={() => setOpenAdd(true)}>{t("recharge")}</Button>
      <Button
        onClick={() => {
          startTransition(async () => {
            const res = await getNewestWithdrawFee();
            if (res.code === 0) {
              setOpen(true);
              setWithdrawFee(res.data);
            } else {
              toast.error(res.message);
            }
          });
        }}
      >
        {isPending ? <Loader2 className="animate-spin" /> : null}
        {t("withdraw")}
      </Button>
      {open && data && <CheckDialog onOpenChange={setOpen} data={data} />}
      {openAdd && data && <AddDialog onOpenChange={setOpenAdd} data={data} />}
    </div>
  );
}
