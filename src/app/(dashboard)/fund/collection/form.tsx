"use client";
import { Button } from "@/components/ui/button";
import {} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddDialog } from "./add-dialog";

export function Form() {
  const t = useTranslations("report.agent");
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const handleAdd = () => {
    setShowDialog(true);
  };

  return (
    <div className="flex flex-col gap-2 bg-background py-2 px-4">
      <div className="flex gap-4 justify-between items-center">
        归集地址管理
        <div className="flex gap-2 items-center">
          <Button onClick={() => handleAdd()}>{t("search")}</Button>
        </div>
      </div>
      {showDialog && (
        <AddDialog
          onOpenChange={() => {
            setShowDialog(false);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
