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
import Form from "next/form";
import { type FormEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export function AddItemDialog() {
  const t = useTranslations("maintain.dictionary");
  const translation = useTranslations();
  const [open, setOpen] = useAtom(addDictionaryItemDialogAtom);
  const data = useAtomValue(addDictionaryItemDataAtom);
  const operation = useAtomValue(dictionaryItemOperationAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isValid, setIsValid] = useState(false);

  const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const id = formData.get("id") as string;
    const dictCode = formData.get("dictCode") as string;
    const label = formData.get("itemName") as string;
    const value = formData.get("itemValue") as string;
    const remark = formData.get("remark") as string;
    startTransition(async () => {
      if (data?.dictCode && operation === "add") {
        const { code, message } = await addDictionaryItem({
          dictCode,
          label,
          value,
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
          id,
          dictCode,
          label,
          value,
          remark,
          i18nType: "zh-CN",
        });
        if (code === 0) {
          setOpen(false);
        } else {
          toast.error(message);
        }
      }
    });
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
        <Form ref={formRef} action="" onSubmit={handleConfirm}>
          <input type="hidden" name="id" value={data?.id} />
          <input type="hidden" name="dictCode" value={data?.dictCode} />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Label className="w-20 text-end before:content-['*'] before:text-destructive before:mr-1">
                {t("itemName")}
              </Label>
              <Input
                className="flex-1"
                defaultValue={data?.label ?? ""}
                name="itemName"
                onBlur={(e) => {
                  setIsValid(e.target.reportValidity());
                }}
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-20 text-end before:content-['*'] before:text-destructive before:mr-1">
                {t("itemValue")}
              </Label>
              <Input
                className="flex-1"
                name="itemValue"
                defaultValue={data?.value ?? ""}
                required
                onBlur={(e) => {
                  setIsValid(e.target.reportValidity());
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-20 text-end">{t("remark")}</Label>
              <Input
                className="flex-1"
                defaultValue={data?.remark ?? ""}
                name="remark"
                maxLength={100}
                onBlur={(e) => {
                  setIsValid(e.target.reportValidity());
                }}
              />
            </div>
          </div>
        </Form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translation("cancel")}
          </Button>
          <Button
            disabled={isPending || !isValid}
            onClick={(e) => {
              e.preventDefault();
              formRef.current?.requestSubmit();
            }}
          >
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
