"use client";

import { updateSelfPassword } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Password } from "@/components/ui/password";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

export function PasswordModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("personal.security");
  const translations = useTranslations("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  // todo: 判断二次确认密码和新密码是否一致
  const submit = async () => {
    startTransition(async () => {
      const { code, message } = await updateSelfPassword({
        id: "-1",
        oldPassword,
        newPassword,
      });
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{t("changePassword")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="flex gap-2 items-center pt-4">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[100px] text-right text-muted-foreground">
              <span className="text-destructive">*</span>
              {t("oldPassword")}
            </Label>
            <Password
              type="password"
              placeholder={t("placeholderOld")}
              name="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0  w-[100px] text-right text-muted-foreground">
              <span className="text-destructive">*</span>
              {t("newPassword")}
            </Label>
            <Password
              type="password"
              placeholder={t("placeholderNew")}
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center pb-4">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[100px] text-right text-muted-foreground">
              {t("confirmPassword")}
            </Label>
            <Password
              type="password"
              placeholder={t("placeholderConfirm")}
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {translations("cancel")}
          </Button>
          <Button onClick={submit} disabled={isPending}>
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
