"use client";

import { googleValidata, modifyCreditLimit } from "@/api";
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
import { formatNumber } from "@/lib/utils";
import {
  decreaseCreditModalAtom,
  memberIdAtom,
  memberInfoDataAtom,
} from "@/store";
import { Big } from "big.js";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import Form from "next/form";
import { type FormEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { GoogleValidataModal } from "../components/google-validata-modal";

export function DecreaseCreditModal() {
  const translation = useTranslations();
  const t = useTranslations("users.members");
  const [open, setOpen] = useAtom(decreaseCreditModalAtom);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement>(null);

  const memberId = useAtomValue(memberIdAtom);
  const memberInfoData = useAtomValue(memberInfoDataAtom);
  // 可回收金额
  const recoverableAmount = Big(memberInfoData?.creditAmount ?? 0)
    .sub(Big(memberInfoData?.debtAmount ?? 0))
    .toNumber();

  // 订单id
  const [orderId, setOrderId] = useState("");
  // 是否开启谷歌验证弹窗
  const [googleValidataOpen, setGoogleValidataOpen] = useState(false);
  // 金额校验是否正确
  const [isValidataMoney, setIsValidataMoney] = useState(false);

  const router = useTransitionRouter();
  const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const {
        code,
        data: result,
        message,
      } = await modifyCreditLimit({
        userId: formData.get("userId") as string,
        amount: -Number(formData.get("amount")),
        secret: formData.get("secret") as string,
      });
      if (code === 0) {
        if (result?.check) {
          setOrderId(result.id);
          setGoogleValidataOpen(true);
          setOpen(false);
        } else {
          toast.success(message);
          setOpen(false);
          router.refresh();
        }
      } else {
        toast.error(message);
      }
    });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("decreaseCredit")}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="divide-y rounded-lg border indent-4">
            <div className="grid grid-cols-3">
              <div className="bg-muted text-muted-foreground border-r py-2">
                {t("memberUsername")}
              </div>
              <div className="py-2">{memberInfoData?.username}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="bg-muted text-muted-foreground border-r py-2">
                {t("usedCreditAmount")}
              </div>
              <div className="py-2">
                {formatNumber(Number(memberInfoData?.creditAmount ?? 0))}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="bg-muted text-muted-foreground border-r py-2">
                {t("usedBorrowAmount")}
              </div>
              <div className="py-2">
                {formatNumber(Number(memberInfoData?.debtAmount ?? 0))}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="bg-muted text-muted-foreground border-r py-2">
                {t("recoverableAmount")}
              </div>
              <div className="py-2">
                {formatNumber(
                  Big(memberInfoData?.creditAmount ?? 0)
                    .sub(Big(memberInfoData?.debtAmount ?? 0))
                    .toNumber(),
                )}
              </div>
            </div>
          </div>

          <Form ref={ref} action="" onSubmit={handleConfirm}>
            <input type="hidden" name="userId" value={memberId} />
            <div className="flex flex-col gap-2 rounded-lg border p-4 text-center">
              <div className="flex items-center gap-4">
                <Label className="text-muted-foreground w-1/4 shrink-0 text-right">
                  {t("recoverAmount")}
                </Label>
                <Input
                  className="flex-1"
                  type="number"
                  name="amount"
                  min={0}
                  max={recoverableAmount.toFixed(3).slice(0, -1)}
                  step={0.01}
                  onBlur={(e) => {
                    setIsValidataMoney(e.target.reportValidity());
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label className="text-muted-foreground w-1/4 shrink-0 text-right">
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
              disabled={isPending || !isValidataMoney}
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
      <GoogleValidataModal
        open={googleValidataOpen}
        setOpen={setGoogleValidataOpen}
        id={orderId}
        fn={googleValidata}
      />
    </>
  );
}
