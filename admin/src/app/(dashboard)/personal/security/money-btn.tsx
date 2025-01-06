"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MoneyModal } from "./money-modal";

export function MoneyBtn({ isOpen }: { isOpen: boolean }) {
  const t = useTranslations("personal.security");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {isOpen ? t("edit") : t("setting")}
      </Button>

      <MoneyModal open={open} onOpenChange={setOpen} isOpen={isOpen} />
    </>
  );
}
