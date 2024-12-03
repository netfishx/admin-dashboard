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
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import { toast } from "sonner";
import { validateLoginFormData } from "./validate";

export function PasswordModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("personal.security");
  const ref = useRef<HTMLFormElement>(null);
  const translations = useTranslations("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{t("changePassword")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Form
          action=""
          onSubmit={(e) => {
            e.preventDefault();

            startTransition(async () => {
              const formData = new FormData(e.currentTarget);
              const result = await validateLoginFormData(formData);
              if (result.success) {
                const { code, message } = await updateSelfPassword({
                  oldPassword: result.data?.oldPassword,
                  newPassword: result.data?.newPassword,
                } as { oldPassword: string; newPassword: string });
                if (code === 0) {
                  toast.success(message);
                  onOpenChange(false);
                  router.refresh();
                } else {
                  toast.error(message);
                }
              } else {
                toast.error(result.errors?.[0]?.message);
              }
            });
          }}
          ref={ref}
        >
          <input type="hidden" name="id" />
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Label className="shrink-0 w-[100px] text-right text-muted-foreground">
                <span className="text-destructive">*</span>
                {t("oldPassword")}
              </Label>
              <Password
                type="password"
                placeholder={t("placeholderOld")}
                name="oldPassword"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="shrink-0 w-[100px] text-right text-muted-foreground">
                <span className="text-destructive">*</span>
                {t("newPassword")}
              </Label>
              <Password
                type="password"
                placeholder={t("placeholderNew")}
                name="newPassword"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-[100px] text-right shrink-0  text-muted-foreground">
                <span className="text-destructive">*</span>
                {t("confirmPassword")}
              </Label>
              <Password
                type="password"
                placeholder={t("placeholderConfirm")}
                name="confirmPassword"
              />
            </div>
          </div>
        </Form>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {translations("cancel")}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (ref.current) {
                ref.current.requestSubmit();
              }
            }}
            disabled={isPending}
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
