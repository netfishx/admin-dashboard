"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AddDialog } from "./add-dialog";

export function Form() {
  const t = useTranslations("fund.collection");
  const [showDialog, setShowDialog] = useState(false);
  const handleAdd = async () => {
    setShowDialog(true);
  };

  return (
    <div className="flex flex-col gap-2 bg-background p-4">
      <div className="flex items-center justify-between gap-4">
        {t("title")}
        <div className="flex items-center gap-2">
          <Button onClick={() => handleAdd()}>{t("add")}</Button>
        </div>
      </div>
      {showDialog && (
        <AddDialog
          onOpenChange={(bool) => {
            setShowDialog(bool);
          }}
        />
      )}
    </div>
  );
}
