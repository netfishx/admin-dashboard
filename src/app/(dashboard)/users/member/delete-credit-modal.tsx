"use client";

import { deleteDebt, getUserBasicInfo } from "@/api";
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
  deleteCreditModalAtom,
  memberIdAtom,
  memberInfoDataAtom,
} from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";

export function DeleteCreditModal() {
  const translation = useTranslations();
  const t = useTranslations("users.members");
  const [open, setOpen] = useAtom(deleteCreditModalAtom);
  const [isPending, startTransition] = useTransition();
  const [fetching, startFetching] = useTransition();
  const memberId = useAtomValue(memberIdAtom);
  const memberInfoData = useAtomValue(memberInfoDataAtom);
  const ref = useRef<HTMLFormElement>(null);

  const [availableAmount, setAvailableAmount] = useState(0);

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
  useEffect(() => {
    if (open) {
      startFetching(async () => {
        const { code, data, message } = await getUserBasicInfo();
        if (code === 0) {
          setAvailableAmount(data?.usableBalanceMoney || 0);
        } else {
          toast.error(message);
        }
      });
    }
  }, [open]);
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
            <div className="py-2">{memberInfoData?.debtAmount ?? 0}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="border-r py-2 bg-muted text-muted-foreground">
              {t("availableBalance")}
            </div>
            <div className="py-2">
              {fetching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                availableAmount
              )}
            </div>
          </div>
        </div>

        <Form ref={ref} action="" onSubmit={handleConfirm}>
          <input type="hidden" name="userId" value={memberId} />
          <div className="rounded-lg border p-4 text-center flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
                {t("writeOffAmount")}
              </Label>
              <Input className="flex-1" type="number" name="amount" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-4 items-center">
                <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
                  {t("moneyPassword")}
                </Label>
                <Password type="password" className="flex-1" name="secret" />
              </div>
              <div className="flex gap-4 text-start">
                <Label className="shrink-0 w-1/4 text-right text-muted-foreground" />
                <span className="flex-1 text-xs text-destructive">
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
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {translation("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
