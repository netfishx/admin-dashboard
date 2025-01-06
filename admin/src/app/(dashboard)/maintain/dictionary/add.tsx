"use client";

import { Button } from "@/components/ui/button";
import { dictionaryDataAtom, editDictionaryDialogAtom } from "@/store";
import { useAtom, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { AddEditDialog } from "./dialog";

export function Add() {
  const t = useTranslations("maintain.dictionary");
  const setOpen = useSetAtom(editDictionaryDialogAtom);
  const [, setData] = useAtom(dictionaryDataAtom);
  return (
    <>
      <AddEditDialog />
      <Button
        onClick={() => {
          setData(null);
          setOpen(true);
        }}
      >
        {t("add")}
      </Button>
    </>
  );
}
