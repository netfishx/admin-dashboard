"use client";

import { Button } from "@/components/ui/button";
import { subaccountAtom, subaccountDialogAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export function AddButton() {
  const t = useTranslations("system.subaccount");
  const setOpen = useSetAtom(subaccountDialogAtom);
  const setData = useSetAtom(subaccountAtom);
  return (
    <Button
      onClick={() => {
        setData(null);
        setOpen(true);
      }}
    >
      {t("add")}
    </Button>
  );
}
