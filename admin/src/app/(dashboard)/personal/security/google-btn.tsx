"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { GoogleModal } from "./google-modal";

export function GoogleBtn({
  secret,
  qrcode,
  isOpen,
}: {
  secret: string;
  qrcode: string;
  isOpen: boolean;
}) {
  const t = useTranslations("personal.security");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {isOpen ? t("edit") : t("setting")}
      </Button>

      <GoogleModal
        open={open}
        onOpenChange={setOpen}
        secret={secret}
        qrcode={qrcode}
        isOpen={isOpen}
      />
    </>
  );
}
