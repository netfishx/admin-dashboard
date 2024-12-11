"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddDialog } from "./add-dialog";

export function Form() {
  const t = useTranslations("fund.collection");
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const handleAdd = async () => {
    setShowDialog(true);
  };

  return (
    <div className="flex flex-col gap-2 bg-background p-4">
      <div className="flex gap-4 justify-between items-center">
        {t("title")}
        <div className="flex gap-2 items-center">
          <Button onClick={() => handleAdd()}>{t("add")}</Button>
        </div>
      </div>
      {showDialog && (
        <AddDialog
          onOpenChange={(bool) => {
            setShowDialog(bool);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
