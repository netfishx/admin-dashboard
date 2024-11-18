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
import { deleteCreditModalAtom } from "@/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

export function DeleteCreditModal() {
  const translation = useTranslations();
  const t = useTranslations("users.members");
  const [open, setOpen] = useAtom(deleteCreditModalAtom);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{t("deleteCredit")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="rounded-lg border divide-y indent-4">
          <div className="grid grid-cols-3">
            <div className="border-r py-2 bg-muted text-muted-foreground">
              {t("membershipArrears")}
            </div>
            <div className="py-2">A111</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="border-r py-2 bg-muted text-muted-foreground">
              {t("availableBalance")}
            </div>
            <div className="py-2">8000</div>
          </div>
        </div>

        <div className="rounded-lg border p-4 text-center flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("writeOffAmount")}
            </Label>
            <Input className="w-1/2" />
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
