"use client";

import { addSupplier } from "@/api";
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
import { Password } from "@/components/ui/password";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function Add() {
  const t = useTranslations("users.supplier");
  const [open, setOpen] = useState(false);
  return (
    <>
      <AddDialog open={open} setOpen={setOpen} />
      <Button size="sm" onClick={() => setOpen(true)}>
        {t("add")}
      </Button>
    </>
  );
}

function AddDialog({
  open,
  setOpen,
}: { open: boolean; setOpen: (open: boolean) => void }) {
  const t = useTranslations("users.supplier");
  const translation = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [supplierUsername, setSupplierUsername] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [remark, setRemark] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleConfirm = () => {
    startTransition(async () => {
      const { code, data, message } = await addSupplier({
        username: supplierUsername,
        nickname: supplierName,
        newPassword: password,
        remark,
      });
      console.info(data);
      if (code === 0) {
        setOpen(false);
        router.refresh();
        setSupplierUsername("");
        setSupplierName("");
        setPassword("");
        setConfirmPassword("");
        setRemark("");
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
          <DialogTitle>{t("add")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Label className="w-32 text-end">{t("supplierUsername")}</Label>
            <Input
              className="flex-1"
              placeholder={t("placeholder")}
              required
              value={supplierUsername}
              onChange={(e) => setSupplierUsername(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="w-32 text-end">{t("supplierName")}</Label>
            <Input
              className="flex-1"
              placeholder={t("placeholder")}
              required
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="w-32 text-end">{t("password")}</Label>
            <Password
              type="password"
              className="flex-1"
              placeholder={t("placeholder")}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="w-32 text-end">{t("confirmPassword")}</Label>
            <Password
              type="password"
              className="flex-1"
              placeholder={t("placeholder")}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="w-32 text-end">{t("remark")}</Label>
            <Input
              className="flex-1"
              placeholder={t("placeholder")}
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
