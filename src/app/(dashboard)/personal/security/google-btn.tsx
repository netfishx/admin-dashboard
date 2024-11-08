"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { GoogleModal } from "./google-modal";

export function GoogleBtn() {
  const t = useTranslations("personal.security");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{t("setting")}</Button>

      <GoogleModal open={open} onOpenChange={setOpen} />
    </>
  );
}
