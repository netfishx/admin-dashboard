"use client";
import { Button } from "@/components/ui/button";
import {} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckDialog } from "./check-dialog";

export function DetailButton() {
  const t = useTranslations("personal.info");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Button variant="default" className="bg-orange hover:bg-orange/90">
        {t("recharge")}
      </Button>
      <Button variant="default" onClick={() => setOpen(true)}>
        {t("withdraw")}
      </Button>
      {open && <CheckDialog onOpenChange={setOpen} />}
    </div>
  );
}
