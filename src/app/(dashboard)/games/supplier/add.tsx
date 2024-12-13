"use client";
import { Button } from "@/components/ui/button";
import { gamesSupplierDialogAtom, supplierConfigAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export function Add() {
  const t = useTranslations("games.supplier");
  const setOpen = useSetAtom(gamesSupplierDialogAtom);
  const setData = useSetAtom(supplierConfigAtom);
  return (
    <Button
      onClick={() => {
        setData(undefined);
        setOpen(true);
      }}
    >
      {t("add")}
    </Button>
  );
}
