"use client";

import { addDictionary, editDictionary } from "@/api";
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
import type { Res } from "@/lib/types";
import { dictionaryDataAtom, editDictionaryDialogAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export function AddEditDialog() {
  const translation = useTranslations();
  const t = useTranslations("maintain.dictionary");
  const [isPending, startTransition] = useTransition();
  const data = useAtomValue(dictionaryDataAtom);
  const [open, setOpen] = useAtom(editDictionaryDialogAtom);
  const formRef = useRef<HTMLFormElement>(null);
  // 验证
  const [isValidate, setIsValidate] = useState(false);
  const router = useRouter();
  const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get("id") as string;
    const dictName = formData.get("dictName") as string;
    const dictCode = formData.get("dictCode") as string;
    const remark = formData.get("remark") as string;
    startTransition(async () => {
      let response: Res<{ code: number; message: string }>;
      if (data) {
        // Editing an existing dictionary entry
        const request = { id: id as string, dictName, dictCode, remark };
        response = await editDictionary(request);
      } else {
        // Adding a new dictionary entry
        const request = { dictName, dictCode, remark };
        response = await addDictionary(request);
      }

      const { code, message } = response;
      if (code === 0) {
        toast.success(message);
        router.refresh();
        setOpen(false);
      } else {
        toast.error(message);
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
          <DialogTitle>{data ? t("edit") : t("add")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form ref={formRef} action="" onSubmit={handleConfirm}>
          <input type="hidden" name="id" value={data?.id} />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Label className="w-20 text-end before:content-['*'] before:text-destructive before:mr-1">
                {t("dictName")}
              </Label>
              <Input
                className="flex-1"
                name="dictName"
                defaultValue={data?.dictName ?? ""}
                required
                onBlur={(e) => {
                  setIsValidate(e.target.reportValidity());
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-20 text-end before:content-['*'] before:text-destructive before:mr-1">
                {t("dictCode")}
              </Label>
              <Input
                className="flex-1"
                name="dictCode"
                defaultValue={data?.dictCode ?? ""}
                required
                onBlur={(e) => {
                  setIsValidate(e.target.reportValidity());
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-20 text-end">{t("remark")}</Label>
              <Input
                className="flex-1"
                name="remark"
                defaultValue={data?.remark ?? ""}
                maxLength={100}
                onBlur={(e) => {
                  setIsValidate(e.target.reportValidity());
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
            disabled={isPending || !isValidate}
            onClick={(e) => {
              e.preventDefault();
              formRef.current?.requestSubmit();
            }}
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
