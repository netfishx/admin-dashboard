"use client";

import { addDictionaryItem, editDictionaryItem } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addDictionaryItemDataAtom,
  addDictionaryItemDialogAtom,
  dictionaryItemOperationAtom,
} from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AddItemDialog() {
  const t = useTranslations("maintain.dictionary");
  const translation = useTranslations();
  const [open, setOpen] = useAtom(addDictionaryItemDialogAtom);
  const data = useAtomValue(addDictionaryItemDataAtom);
  const [itemName, setItemName] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [remark, setRemark] = useState("");
  const operation = useAtomValue(dictionaryItemOperationAtom);

  useEffect(() => {
    if (data && open) {
      setItemName(data.label || "");
      setItemValue(data.value || "");
      setRemark(data.remark || "");
    }
  }, [open, data]);

  const handleConfirm = async () => {
    if (data?.dictCode && operation === "add") {
      const { code, message } = await addDictionaryItem({
        dictCode: data.dictCode,
        label: itemName,
        value: itemValue,
        remark,
        i18nType: "zh-CN",
      });
      if (code === 0) {
        setOpen(false);
      } else {
        toast.error(message);
      }
    } else if (data && operation === "edit") {
      const { code, message } = await editDictionaryItem({
        id: data.id,
        dictCode: data.dictCode,
        label: itemName,
        value: itemValue,
        remark,
        i18nType: "zh-CN",
      });
      if (code === 0) {
        setOpen(false);
      } else {
        toast.error(message);
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {operation === "add" ? t("add") : t("edit")}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <Label className="w-20 text-end">{t("itemName")}</Label>
            <Input
              className="flex-1"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="w-20 text-end">{t("itemValue")}</Label>
            <Input
              className="flex-1"
              value={itemValue}
              onChange={(e) => setItemValue(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="w-20 text-end">{t("remark")}</Label>
            <Input
              className="flex-1"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translation("cancel")}
          </Button>
          <Button onClick={handleConfirm}>{translation("confirm")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
