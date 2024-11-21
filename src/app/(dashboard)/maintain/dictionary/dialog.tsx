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
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function AddEditDialog() {
  const router = useRouter();
  const translation = useTranslations();
  const t = useTranslations("maintain.dictionary");
  const [isPending, startTransition] = useTransition();
  const data = useAtomValue(dictionaryDataAtom);
  const [open, setOpen] = useAtom(editDictionaryDialogAtom);
  const [id, setId] = useState("");
  const [dictName, setDictName] = useState("");
  const [dictCode, setDictCode] = useState("");
  const [remark, setRemark] = useState("");
  useEffect(() => {
    if (open && data) {
      setId(data.id);
      setDictName(data.dictName);
      setDictCode(data.dictCode);
      setRemark(data.remark);
    }
  }, [open, data]);
  const handleConfirm = () => {
    startTransition(async () => {
      let response: Res<{ code: number; message: string }>;
      if (data) {
        // Editing an existing dictionary entry
        const request = { id, dictName, dictCode, remark };
        response = await editDictionary(request);
      } else {
        // Adding a new dictionary entry
        const request = { dictName, dictCode, remark };
        response = await addDictionary(request);
      }

      const { code, message } = response;
      if (code === 0) {
        setOpen(false);
        // router.refresh();
        toast.success(message);
        setDictName("");
        setDictCode("");
        setRemark("");
        // window.location.reload();
        router.refresh();
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
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <Label className="w-20 text-end">{t("dictName")}</Label>
            <Input
              className="flex-1"
              value={dictName}
              onChange={(e) => setDictName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="w-20 text-end">{t("dictCode")}</Label>
            <Input
              className="flex-1"
              value={dictCode}
              onChange={(e) => setDictCode(e.target.value)}
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
          <Button disabled={isPending} onClick={handleConfirm}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
