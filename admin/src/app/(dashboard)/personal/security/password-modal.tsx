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
import { useTransitionRouter } from "next-view-transitions";
import Form from "next/form";
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
  const router = useTransitionRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-muted-foreground before:text-destructive w-[100px] shrink-0 text-right before:mr-1 before:content-['*']">
                {t("oldPassword")}
              </Label>
              <Password
                type="password"
                placeholder={t("placeholderOld")}
                name="oldPassword"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Label className="text-muted-foreground before:text-destructive w-[100px] shrink-0 text-right before:mr-1 before:content-['*']">
                  {t("newPassword")}
                </Label>
                <Password
                  type="password"
                  placeholder={t("placeholderNew")}
                  name="newPassword"
                />
              </div>
              <div className="text-destructive ml-[110px] mt-2 text-xs">
                {t("passwordWarning")}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-muted-foreground before:text-destructive w-[100px] shrink-0 text-right before:mr-1 before:content-['*']">
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
            {isPending && <Loader2 className="animate-spin" />}
            {translations("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
