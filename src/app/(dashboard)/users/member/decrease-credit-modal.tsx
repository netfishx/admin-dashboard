"use client";

import { modifyCreditLimit } from "@/api";
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
  decreaseCreditModalAtom,
  memberIdAtom,
  memberInfoDataAtom,
} from "@/store";
import { Big } from "big.js";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { type FormEvent, useRef, useTransition } from "react";
import { toast } from "sonner";

export function DecreaseCreditModal() {
  const translation = useTranslations();
  const t = useTranslations("users.members");
  const [open, setOpen] = useAtom(decreaseCreditModalAtom);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement>(null);

  const memberId = useAtomValue(memberIdAtom);
  const memberInfoData = useAtomValue(memberInfoDataAtom);

  const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const { code, message } = await modifyCreditLimit({
        userId: formData.get("userId") as string,
        amount: -Number(formData.get("amount")),
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
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{t("decreaseCredit")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="rounded-lg border divide-y indent-4">
          <div className="grid grid-cols-3">
            <div className="border-r py-2 bg-muted text-muted-foreground">
              {t("memberUsername")}
            </div>
            <div className="py-2">{memberInfoData?.username}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="border-r py-2 bg-muted text-muted-foreground">
              {t("usedCreditAmount")}
            </div>
            <div className="py-2">{memberInfoData?.creditAmount ?? 0}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="border-r py-2 bg-muted text-muted-foreground">
              {t("usedBorrowAmount")}
            </div>
            <div className="py-2">{memberInfoData?.debtAmount ?? 0}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="border-r py-2 bg-muted text-muted-foreground">
              {t("recoverableAmount")}
            </div>
            <div className="py-2">
              {Big(memberInfoData?.creditAmount ?? 0)
                .sub(Big(memberInfoData?.debtAmount ?? 0))
                .toNumber()}
            </div>
          </div>
        </div>

        <Form ref={ref} action="" onSubmit={handleConfirm}>
          <input type="hidden" name="userId" value={memberId} />
          <div className="rounded-lg border p-4 text-center flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
                {t("recoverAmount")}
              </Label>
              <Input className="flex-1" type="number" name="amount" />
            </div>
            <div className="flex gap-4 items-center">
              <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
                {t("moneyPassword")}
              </Label>
              <Password type="password" className="flex-1" name="secret" />
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
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
