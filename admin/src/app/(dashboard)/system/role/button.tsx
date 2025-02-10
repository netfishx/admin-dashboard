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
export function DeleteButton({ id }: { id: string }) {
  const t = useTranslations("system.role");
  const setData = useSetAtom(roleDeleteAtom);
  const setOpen = useSetAtom(roleDeleteDialogAtom);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-destructive text-sm hover:text-destructive/80"
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
      className="text-primary text-sm hover:text-primary/80"
      onClick={() => {
        setData(data);
        setOpen(true);
      }}
    >
      {t("edit")}
    </Button>
  );
}
