"use client";

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
import { useTranslations } from "next-intl";
import { useState } from "react";

export function MoneyModal({
  open,
  onOpenChange,
}: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const t = useTranslations("personal.security");
  const translations = useTranslations("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("editMoneyPassword")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="flex gap-2 items-center pt-4">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[100px] text-right text-muted-foreground">
              <span className="text-red-500">*</span>
              {t("oldPassword")}
            </Label>
            <Input
              type="password"
              placeholder={t("placeholderOld")}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[100px] text-right text-muted-foreground">
              <span className="text-red-500">*</span>
              {t("newPassword")}
            </Label>
            <Input
              type="password"
              placeholder={t("placeholderNew")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-[100px] text-right text-muted-foreground">
              {t("confirmMoneyPassword")}
            </Label>
            <Input
              type="password"
              placeholder={t("confirmMoneyDesc")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {translations("cancel")}
          </Button>
          <Button>{translations("confirm")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
