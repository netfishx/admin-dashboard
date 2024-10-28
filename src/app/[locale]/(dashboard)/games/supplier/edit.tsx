"use client";

import { Button } from "@/components/ui/button";
import { gamesSupplierDialogAtom, gamesSupplierEditAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export function EditButton({
  data,
}: { data: { game: string; supplierId: string } }) {
  const t = useTranslations("games.supplier");
  const setOpen = useSetAtom(gamesSupplierDialogAtom);
  const setData = useSetAtom(gamesSupplierEditAtom);
  return (
    <Button
      variant="link"
      className="hover:no-underline hover:text-primary/80"
      onClick={() => {
        setData(data);
        setOpen(true);
      }}
    >
      {t("edit")}
    </Button>
  );
}
