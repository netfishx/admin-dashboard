"use client";
import { Button } from "@/components/ui/button";
import type { UserBasicInfo } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AddDialog } from "./add-dialog";
import { CheckDialog } from "./check-dialog";

export function DetailButton(props: { data?: UserBasicInfo }) {
  const { data } = props;
  const t = useTranslations("personal.info");
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <div className="flex gap-2">
      <Button variant="default" onClick={() => setOpenAdd(true)}>
        {t("recharge")}
      </Button>
      <Button variant="default" onClick={() => setOpen(true)}>
        {t("withdraw")}
      </Button>
      {open && data && <CheckDialog onOpenChange={setOpen} data={data} />}
      {openAdd && data && <AddDialog onOpenChange={setOpenAdd} data={data} />}
    </div>
  );
}
