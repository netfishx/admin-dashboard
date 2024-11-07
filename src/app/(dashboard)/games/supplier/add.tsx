"use client";
import { SupplierDialog } from "@/app/(dashboard)/games/supplier/dialog";
import { Button } from "@/components/ui/button";
import { gamesSupplierDialogAtom, gamesSupplierEditAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export function Add() {
  const t = useTranslations("games.supplier");
  const setOpen = useSetAtom(gamesSupplierDialogAtom);
  const setData = useSetAtom(gamesSupplierEditAtom);
  return (
    <>
      <SupplierDialog />
      <Button
        size="sm"
        onClick={() => {
          setData(undefined);
          setOpen(true);
        }}
      >
        {t("add")}
      </Button>
    </>
  );
}
