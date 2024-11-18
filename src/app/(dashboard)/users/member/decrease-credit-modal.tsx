"use client";

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
import { decreaseCreditModalAtom } from "@/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

export function DecreaseCreditModal() {
  const translation = useTranslations();
  const t = useTranslations("users.members");
  const [open, setOpen] = useAtom(decreaseCreditModalAtom);
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
          <div className="grid grid-cols-3">
            <div className="border-r py-2 bg-muted text-muted-foreground">
              {t("recoverableAmount")}
            </div>
            <div className="py-2">2000</div>
          </div>
        </div>

        <div className="rounded-lg border p-4 text-center flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("recoverAmount")}
            </Label>
            <Input className="w-1/2" disabled value={3000} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {translation("cancel")}
          </Button>
          <Button>{translation("confirm")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
