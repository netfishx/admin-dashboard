"use client";

import { cleanSupplierLoginError, editSupplier } from "@/api";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supplierEditDataAtom, supplierEditModalAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function SupplierEditDialog() {
  const translation = useTranslations();
  const t = useTranslations("users.supplier");
  const [isPending, startTransition] = useTransition();
  const [isResetPending, startResetTransition] = useTransition();
  const data = useAtomValue(supplierEditDataAtom);
  const [open, setOpen] = useAtom(supplierEditModalAtom);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (open && data) {
      setId(data.id);
      setUsername(data.username);
      setNickname(data.nickname);
      setRemark(data.remark);
      setStatus(data.status);
    }
  }, [open, data]);
  const handleConfirm = () => {
    startTransition(async () => {
      const { code, message } = await editSupplier({
        id,
        nickname,
        newPassword: password,
        remark,
        status,
      });
      if (code === 0) {
        toast.success(message);
        setOpen(false);
        router.refresh();
      } else {
        toast.error(message);
      }
    });
  };
  const handleResetRestCount = () => {
    startResetTransition(async () => {
      const { code, message } = await cleanSupplierLoginError({ id });
      if (code === 0) {
        toast.success(message);
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
          <DialogTitle>{t("edit")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Label className="w-32 text-end">{t("supplierUsername")}</Label>
            <Input
              className="flex-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="w-32 text-end">{t("supplierName")}</Label>
            <Input
              className="flex-1"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="w-32 text-end">{t("password")}</Label>
            <Password
              type="password"
              className="flex-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="w-32 text-end">{t("confirmPassword")}</Label>
            <Password
              type="password"
              className="flex-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="w-32 text-end">{t("remark")}</Label>
            <Input
              className="flex-1"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="w-32 text-end">{t("resetCount")}</Label>
            <span>{3}</span>
            <Button
              size="sm"
              disabled={isResetPending}
              onClick={handleResetRestCount}
            >
              {isResetPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              {t("reset")}
            </Button>
          </div>
          <div className="flex gap-2 items-center">
            <Label className="w-32 text-end">{t("status")}</Label>
            <RadioGroup
              value={status.toString()}
              className="flex gap-2"
              onValueChange={(value) => setStatus(Number(value))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="0" />
                <Label htmlFor="0">{t("enable")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">{t("disable")}</Label>
              </div>
            </RadioGroup>
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
