"use client";
import { bindFundPassword, editFundPassword } from "@/api";
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
import { validateFormData } from "./validate";

export function MoneyModal({
  open,
  onOpenChange,
  isOpen,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isOpen: boolean;
}) {
  const t = useTranslations("personal.security");
  const translations = useTranslations("");
  const isEdit = isOpen;
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const submit = async (data: {
    oldPassword?: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (isEdit) {
      startTransition(async () => {
        const { code, message } = await editFundPassword({
          oldSecret: data.oldPassword ?? "",
          newSecret: data.newPassword,
        });
        if (code === 0) {
          toast.success(message);
          onOpenChange(false);
          router.refresh();
        } else {
          toast.error(message);
        }
      });
    } else {
      startTransition(async () => {
        const { code, message } = await bindFundPassword({
          secret: data.newPassword,
        });
        if (code === 0) {
          toast.success(message);
          onOpenChange(false);
          router.refresh();
        } else {
          toast.error(message);
        }
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t("editMoneyPasswordTitle") : t("setMoneyPassword")}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Form
          action=""
          onSubmit={(e) => {
            e.preventDefault();

            startTransition(async () => {
              const formData = new FormData(e.currentTarget);
              const result = await validateFormData(
                formData,
                isEdit ? "edit" : "create",
              );
              if (result.success) {
                submit(
                  result.data as {
                    oldPassword?: string;
                    newPassword: string;
                    confirmPassword: string;
                  },
                );
              } else {
                toast.error(result.errors?.[0]?.message);
              }
            });
          }}
          ref={ref}
        >
          <div className="flex flex-col gap-4">
            {isEdit ? (
              <div className="flex flex-col gap-1">
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
              </div>
            ) : null}
            <div className="flex items-center gap-2">
              <Label className="text-muted-foreground before:text-destructive w-[100px] shrink-0 text-right before:mr-1 before:content-['*']">
                {isEdit ? t("newPassword") : t("fundPassword")}
              </Label>
              <Password
                type="password"
                placeholder={t("placeholderNew")}
                name="newPassword"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-muted-foreground before:text-destructive w-[100px] shrink-0 text-right before:mr-1 before:content-['*']">
                {t("confirmPassword")}
              </Label>
              <Password
                type="password"
                placeholder={t("confirmMoneyDesc")}
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
