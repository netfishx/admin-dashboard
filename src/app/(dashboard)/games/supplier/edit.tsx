"use client";

import { Button } from "@/components/ui/button";
import type { SupplierConfig } from "@/lib/types";
import { gamesSupplierDialogAtom, supplierConfigAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export function EditButton({ data }: { data: SupplierConfig }) {
  const t = useTranslations("games.supplier");
  const setOpen = useSetAtom(gamesSupplierDialogAtom);
  const setData = useSetAtom(supplierConfigAtom);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-sm text-primary hover:text-primary/80"
      onClick={() => {
        setData(data);
        setOpen(true);
      }}
    >
      {t("edit")}
    </Button>
  );
}
