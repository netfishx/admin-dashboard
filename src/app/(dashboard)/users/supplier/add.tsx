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
import type { AddSupplier } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { validateFormData } from "./validata";

export function Add() {
  const t = useTranslations("users.supplier");
  const [open, setOpen] = useState(false);
  return (
    <>
      <AddDialog open={open} setOpen={setOpen} />
      <Button onClick={() => setOpen(true)}>{t("add")}</Button>
    </>
  );
}

function AddDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const t = useTranslations("users.supplier");
  const translation = useTranslations();
  const ref = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 验证是否校验
  const [validata, setValidata] = useState(false);

  const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await validateFormData(formData);
    if (result.success) {
      setIsLoading(true);
      const { code, message } = await addSupplier(result.data as AddSupplier);
      setIsLoading(false);
      if (code === 0) {
        setOpen(false);
        router.refresh();
      } else {
        toast.error(message);
      }
    } else {
      toast.error(result.errors?.[0]?.message);
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
          <DialogTitle>{t("add")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form ref={ref} action="" onSubmit={handleConfirm}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Label className="w-32 shrink-0 text-end">
                  {t("supplierUsername")}
                </Label>
                <Input
                  className="flex-1"
                  placeholder={t("placeholder")}
                  required
                  defaultValue={""}
                  name="username"
                  onBlur={(e) => {
                    setValidata(e.target.reportValidity());
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-32 shrink-0 text-end" />
                <div className="text-destructive flex-1 text-xs">
                  {t("usernameWarning")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-32 text-end">{t("supplierName")}</Label>
              <Input
                className="flex-1"
                placeholder={t("placeholder")}
                required
                defaultValue={""}
                name="nickname"
                maxLength={20}
                onBlur={(e) => {
                  setValidata(e.target.reportValidity());
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Label className="w-32 text-end">{t("password")}</Label>
                <Password
                  type="password"
                  className="flex-1"
                  placeholder={t("placeholder")}
                  required
                  defaultValue={""}
                  name="newPassword"
                  onBlur={(e) => {
                    setValidata(e.target.reportValidity());
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-32 shrink-0 text-end" />
                <div className="text-destructive flex-1 text-xs">
                  {t("passwordWarning")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-32 text-end">{t("confirmPassword")}</Label>
              <Password
                type="password"
                className="flex-1"
                placeholder={t("placeholder")}
                required
                defaultValue={""}
                name="confirmPassword"
                onBlur={(e) => {
                  setValidata(e.target.reportValidity());
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-32 text-end">{t("remark")}</Label>
              <Input
                className="flex-1"
                placeholder={t("placeholder")}
                defaultValue={""}
                name="remark"
                maxLength={100}
                onBlur={(e) => {
                  setValidata(e.target.reportValidity());
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
            disabled={isLoading || !validata}
            onClick={(e) => {
              e.preventDefault();
              if (ref.current) {
                ref.current.requestSubmit();
              }
            }}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : null}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
