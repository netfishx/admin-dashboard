"use client";
import { Button } from "@/components/ui/button";
import { collectionAddressDialogAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { AddDialog } from "./add-dialog";

export function Form() {
  const t = useTranslations("fund.collection");
  const setShowDialog = useSetAtom(collectionAddressDialogAtom);

  return (
    <div className="bg-background flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between gap-4">
        {t("title")}
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowDialog(true)}>{t("add")}</Button>
        </div>
      </div>
      <AddDialog />
    </div>
  );
}
