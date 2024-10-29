"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gamesSupplierDialogAtom, gamesSupplierEditAtom } from "@/store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

function SupplierDialog() {
  const t = useTranslations("games.supplier");
  const [open, setOpen] = useAtom(gamesSupplierDialogAtom);
  const data = useAtomValue(gamesSupplierEditAtom);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div>
            <Label>{t("name")}</Label>
            <span>{data?.game}</span>
          </div>
          <div>
            <Label>{t("supplierId")}</Label>
            <Input
              placeholder={t("placeholder")}
              defaultValue={data?.supplierId}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function Add() {
  const t = useTranslations("games.supplier");
  const setOpen = useSetAtom(gamesSupplierDialogAtom);
  const setData = useSetAtom(gamesSupplierEditAtom);
  return (
    <>
      <SupplierDialog />
      <Button
        size="sm"
        onClick={() => {
          setData(undefined);
          setOpen(true);
        }}
      >
        {t("add")}
      </Button>
    </>
  );
}
