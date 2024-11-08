"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PasswordModal } from "./password-modal";

export function PasswordBtn() {
  const t = useTranslations("personal.security");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{t("edit")}</Button>

      <PasswordModal open={open} onOpenChange={setOpen} />
    </>
  );
}
