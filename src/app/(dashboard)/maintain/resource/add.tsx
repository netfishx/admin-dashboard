"use client";

import { Button } from "@/components/ui/button";
import { backgroundImageDataAtom, backgroundImageDialogAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export function Add() {
  const t = useTranslations("maintain.resource");
  const setOpen = useSetAtom(backgroundImageDialogAtom);
  const setData = useSetAtom(backgroundImageDataAtom);
  return (
    <Button
      onClick={() => {
        setOpen(true);
        setData(null);
      }}
    >
      {t("add")}
    </Button>
  );
}
