"use client";

import { Button } from "@/components/ui/button";
import type { Role } from "@/lib/types";
import {
  roleAtom,
  roleDeleteAtom,
  roleDeleteDialogAtom,
  roleDialogAtom,
} from "@/store";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

export function AddButton() {
  const t = useTranslations("system.role");
  const setOpen = useSetAtom(roleDialogAtom);
  const setData = useSetAtom(roleAtom);
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
export function DeleteButton({ id }: { id: number }) {
  const t = useTranslations("system.role");
  const setData = useSetAtom(roleDeleteAtom);
  const setOpen = useSetAtom(roleDeleteDialogAtom);
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
export function EditButton({ data }: { data: Role }) {
  const t = useTranslations("system.role");
  const setOpen = useSetAtom(roleDialogAtom);
  const setData = useSetAtom(roleAtom);
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
      {t("edit")}
    </Button>
  );
}
