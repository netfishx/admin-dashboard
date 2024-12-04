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
import { increaseCreditModalAtom, memberIdAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function IncreaseCreditModal() {
  const translation = useTranslations();
  const t = useTranslations("users.members");
  const [open, setOpen] = useAtom(increaseCreditModalAtom);
  const [isPending, startTransition] = useTransition();

  const memberId = useAtomValue(memberIdAtom);
  const [amount, setAmount] = useState(0);
  const [moneyPassword, setMoneyPassword] = useState("");

  const handleConfirm = () => {
    startTransition(async () => {
      const { code, message } = await modifyCreditLimit({
        userId: memberId,
        amount,
        secret: moneyPassword,
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
          <DialogTitle>{t("increaseCredit")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="rounded-lg border divide-y indent-4">
          <div className="grid grid-cols-3">
            <div className="border-r py-2 bg-muted text-muted-foreground">
              {t("memberUsername")}
            </div>
            <div className="py-2">A111</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="border-r py-2 bg-muted text-muted-foreground">
              {t("usedCreditAmount")}
            </div>
            <div className="py-2">8000</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="border-r py-2 bg-muted text-muted-foreground">
              {t("usedBorrowAmount")}
            </div>
            <div className="py-2">2000</div>
          </div>
        </div>

        <div className="rounded-lg border p-4 text-center flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("increaseCreditAmount")}
            </Label>
            <Input
              className="flex-1"
              value={amount}
              onChange={(e) => setAmount(e.target.valueAsNumber)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("creditAmountAfter")}
            </Label>
            <Input className="flex-1" disabled value={3000} />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("moneyPassword")}
            </Label>
            <Password
              value={moneyPassword}
              type="password"
              className="flex-1"
              onChange={(e) => setMoneyPassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translation("cancel")}
          </Button>
          <Button disabled={isPending} onClick={handleConfirm}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
