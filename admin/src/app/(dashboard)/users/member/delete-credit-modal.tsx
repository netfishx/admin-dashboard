"use client";

import { deleteDebt } from "@/api";
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
import {
  availableAmountAtom,
  deleteCreditModalAtom,
  memberIdAtom,
  memberInfoDataAtom,
} from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";

export function DeleteCreditModal() {
  const translation = useTranslations();
  const t = useTranslations("users.members");
  const [open, setOpen] = useAtom(deleteCreditModalAtom);
  const [isPending, startTransition] = useTransition();

  const memberId = useAtomValue(memberIdAtom);
  const memberInfoData = useAtomValue(memberInfoDataAtom);
  const ref = useRef<HTMLFormElement>(null);

  const availableAmount = useAtomValue(availableAmountAtom);

  const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const { code, message } = await deleteDebt({
        memberId: formData.get("userId") as string,
        money: Number(formData.get("amount")),
        secret: formData.get("secret") as string,
      });
      if (code === 0) {
        toast.success(message);
        setOpen(false);
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("deleteCredit")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="divide-y rounded-lg border indent-4">
          <div className="grid grid-cols-3">
            <div className="bg-muted text-muted-foreground border-r py-2">
              {t("membershipArrears")}
            </div>
            <div className="py-2">{memberInfoData?.debtAmount ?? 0}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="bg-muted text-muted-foreground border-r py-2">
              {t("availableBalance")}
            </div>
            <div className="py-2">{availableAmount}</div>
          </div>
        </div>

        <Form ref={ref} action="" onSubmit={handleConfirm}>
          <input type="hidden" name="userId" value={memberId} />
          <div className="flex flex-col gap-2 rounded-lg border p-4 text-center">
            <div className="flex items-center gap-4">
              <Label className="text-muted-foreground w-1/4 shrink-0 text-right">
                {t("writeOffAmount")}
              </Label>
              <Input className="flex-1" type="number" name="amount" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <Label className="text-muted-foreground w-1/4 shrink-0 text-right">
                  {t("moneyPassword")}
                </Label>
                <Password type="password" className="flex-1" name="secret" />
              </div>
              <div className="flex gap-4 text-start">
                <Label className="text-muted-foreground w-1/4 shrink-0 text-right" />
                <span className="text-destructive flex-1 text-xs">
                  {t("deleteCreditWarning")}
                </span>
              </div>
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
            {isPending && <Loader2 className="animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
