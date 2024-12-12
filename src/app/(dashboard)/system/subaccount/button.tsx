"use client";

import { Button } from "@/components/ui/button";
import type { Subaccount } from "@/lib/types";
import {
  loginLogModalAtom,
  subaccountAtom,
  subaccountDeleteAtom,
  subaccountDeleteDialogAtom,
  subaccountDialogAtom,
  subaccountIdAtom,
} from "@/store";
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

export function DeleteButton({ id }: { id: string }) {
  const t = useTranslations("system.subaccount");
  const setData = useSetAtom(subaccountDeleteAtom);
  const setOpen = useSetAtom(subaccountDeleteDialogAtom);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-destructive hover:text-destructive/80 text-sm"
      onClick={() => {
        setData(id);
        setOpen(true);
      }}
    >
      {t("delete")}
    </Button>
  );
}
export function EditButton({ data }: { data: Subaccount }) {
  const t = useTranslations("system.subaccount");
  const setOpen = useSetAtom(subaccountDialogAtom);
  const setData = useSetAtom(subaccountAtom);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-primary hover:text-primary/80 text-sm"
      onClick={() => {
        setData(data);
        setOpen(true);
      }}
    >
      {t("info")}
    </Button>
  );
}

export function LoginLogButton({ id }: { id: string }) {
  const t = useTranslations("system.subaccount");
  const setOpen = useSetAtom(loginLogModalAtom);
  const setId = useSetAtom(subaccountIdAtom);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-primary hover:text-primary/80 text-sm"
      onClick={() => {
        setId(id);
        setOpen(true);
      }}
    >
      {t("loginLog")}
    </Button>
  );
}
