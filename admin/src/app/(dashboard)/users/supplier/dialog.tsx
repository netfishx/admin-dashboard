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
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { validateEditFormData } from "./validata";

export function SupplierEditDialog() {
  const translation = useTranslations();
  const t = useTranslations("users.supplier");
  const [isPending, startTransition] = useTransition();
  const [isResetPending, startResetTransition] = useTransition();
  const [data, setData] = useAtom(supplierEditDataAtom);
  const [open, setOpen] = useAtom(supplierEditModalAtom);

  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const [times, setTimes] = useState<number>();

  const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await validateEditFormData(formData);
    if (result.success) {
      startTransition(async () => {
        const { code, message } = await editSupplier({
          id: result.data?.id as string,
          nickname: result.data?.nickname as string,
          remark: result.data?.remark as string,
          newPassword: result.data?.newPassword as string,
          status: result.data?.status as number,
        });
        if (code === 0) {
          toast.success(message);
          setOpen(false);
          router.refresh();
        } else {
          toast.error(message);
        }
      });
    } else {
      toast.error(result.errors?.[0]?.message);
    }
  };
  const handleResetRestCount = () => {
    startResetTransition(async () => {
      if (data) {
        const {
          code,
          data: result,
          message,
        } = await cleanSupplierLoginError({ id: data.id });
        if (code === 0) {
          toast.success(message);
          setTimes(Number(result));
        } else {
          toast.error(message);
        }
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          setTimes(undefined);
          setData(undefined);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("edit")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form ref={ref} action="" onSubmit={handleConfirm}>
          <input type="hidden" name="id" value={data?.id} />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Label className="w-32 text-end">{t("supplierUsername")}</Label>
              <Input
                className="flex-1"
                defaultValue={data?.username}
                disabled
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-32 text-end">{t("supplierName")}</Label>
              <Input
                className="flex-1"
                defaultValue={data?.nickname}
                name="nickname"
                maxLength={20}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-32 text-end">{t("password")}</Label>
              <Password type="password" className="flex-1" name="newPassword" />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-32 text-end">{t("confirmPassword")}</Label>
              <Password
                type="password"
                className="flex-1"
                name="confirmPassword"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-32 text-end">{t("remark")}</Label>
              <Input
                className="flex-1"
                defaultValue={data?.remark}
                name="remark"
                maxLength={100}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-32 text-end">{t("resetCount")}</Label>
              <span>{times || data?.remainLoginTime}</span>
              <Button
                size="sm"
                disabled={isResetPending}
                onClick={handleResetRestCount}
              >
                {isResetPending && <Loader2 className="animate-spin" />}
                {t("reset")}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Label className="w-32 text-end">{t("status")}</Label>
              <RadioGroup
                defaultValue={data?.status.toString()}
                className="flex gap-2"
                name="status"
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
        </Form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translation("cancel")}
          </Button>
          <Button
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              if (ref.current) {
                ref.current.requestSubmit();
              }
            }}
          >
            {isPending ? <Loader2 className="animate-spin" /> : null}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
