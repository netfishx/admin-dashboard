"use client";
import { editRoleAction } from "@/actions";
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
import type {} from "@/lib/types";
import { subaccountAtom, subaccountDialogAtom } from "@/store";
import { Root as VisuallyHiddenRoot } from "@radix-ui/react-visually-hidden";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import { toast } from "sonner";

export function SubaccountDialog() {
  const translations = useTranslations();
  const t = useTranslations("system.subaccount");
  const [open, setOpen] = useAtom(subaccountDialogAtom);
  const data = useAtomValue(subaccountAtom);
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {`${data ? t("edit") : t("add")}${t("title")}`}
          </DialogTitle>
          <VisuallyHiddenRoot>
            <DialogDescription />
          </VisuallyHiddenRoot>
        </DialogHeader>
        <Form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            startTransition(async () => {
              const formData = new FormData(e.currentTarget);

              const res = await editRoleAction(formData);
              if (res.code === 0) {
                setOpen(false);
                router.refresh();
              } else {
                toast.error(res.message);
              }
            });
          }}
          ref={ref}
        >
          <input type="hidden" name="id" value={data?.id} />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <Label className="w-20 text-end shrink-0">{t("name")}</Label>
                <Input
                  className="flex-1"
                  placeholder={t("name")}
                  defaultValue={data?.username}
                  required
                  disabled={!!data}
                  name="username"
                />
              </div>
              <div className="flex gap-2 items-center">
                <Label className="w-20 text-end shrink-0" />
                <div className="flex-1 text-xs text-destructive">
                  以小写字母开头，长度6到16位，且只能包含数字和小写字母的组合，不能包含“admin”的字样
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end shrink-0">{t("password")}</Label>
              <Input
                className="flex-1"
                placeholder={t("password")}
                required
                disabled={!!data}
                name="password"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end shrink-0">
                {t("confirmPassword")}
              </Label>
              <Input
                className="flex-1"
                placeholder={t("confirmPassword")}
                required
                disabled={!!data}
                name="confirmPassword"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Label className="w-20 text-end shrink-0">
                {t("chooseRole")}
              </Label>
              <Input
                className="flex-1"
                placeholder={t("chooseRole")}
                required
                disabled={!!data}
                name="roleId"
              />
            </div>
          </div>
        </Form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
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
