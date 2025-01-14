"use client";
import { postUserInfoWithdraw, postUserInfoWithdrawVerify } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Password } from "@/components/ui/password";
import type { CheckDialogProps, WithdrawFormData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { withdrawFeeAtom } from "@/store";
import Big from "big.js";
import { useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import Form from "next/form";
import { type FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

export function CheckDialog(props: CheckDialogProps) {
  const { open = true, onOpenChange, data } = props;
  const t = useTranslations("personal.info");
  const translations = useTranslations();
  const [step, setStep] = useState(1);
  const router = useTransitionRouter();
  const ref = useRef<HTMLFormElement>(null);
  const [withDrawFee, setWithDrawFee] = useState("0");
  const fees = useAtomValue(withdrawFeeAtom);

  const [googleCode, setGoogleCode] = useState("");
  const [verifyId, setVerifyId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async (f: WithdrawFormData) => {
    if (Number(f.withdrawMoney) > Number(f.availableAmount)) {
      toast.error(t("notAllowWithdraw"));
      return;
    }
    setLoading(true);
    const _res = await postUserInfoWithdraw(f);
    if (_res.code === 0) {
      if (_res?.data?.check && _res?.data?.validationType === "GOOGLE") {
        setVerifyId(_res?.data?.id);
        setStep(2);
      } else {
        toast.success(_res.message);
        onOpenChange(false);
        router.refresh();
      }
    } else {
      toast.error(_res.message);
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    setLoading(true);
    const _res = await postUserInfoWithdrawVerify({
      id: verifyId,
      code: googleCode,
    });
    if (_res.code === 0) {
      toast.success(_res.message);
      onOpenChange(false);
      router.refresh();
    } else {
      toast.error(_res.message);
    }
    setLoading(false);
  };

  const handleWithdrawFee = (value: number) => {
    const percentageFee = fees?.percentageFee || 0;
    const fixedFee = fees?.fixedFee || 0;
    const inputValue = value || 0;

    const _fee = Big(percentageFee)
      .times(inputValue) // 乘法
      .plus(fixedFee); // 加法
    setWithDrawFee(_fee.toString());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current) {
      const f = new FormData(e.currentTarget);
      const formDataObj = Object.fromEntries(f.entries());
      handleNext(formDataObj as WithdrawFormData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>{t("withdraw")}</DialogTitle>
            </DialogHeader>
            <Form action="" onSubmit={handleSubmit} ref={ref}>
              <div className="flex max-h-[50dvh] flex-col gap-4 overflow-y-auto px-4">
                <div className="flex items-center gap-4">
                  <Label className="flex w-24 shrink-0 items-center justify-end gap-1">
                    <span className="text-muted-foreground">
                      {translations("availableAmount")}
                    </span>
                  </Label>
                  <Input
                    type="text"
                    className="flex-1"
                    required
                    name="availableAmount"
                    placeholder={translations("availableAmount")}
                    defaultValue={formatNumber(data?.usableBalanceMoney)}
                    disabled
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Label className="flex w-24 shrink-0 items-center justify-end gap-1">
                    <span className="text-destructive">*</span>
                    <span className="text-muted-foreground">
                      {t("withdrawAmount")}
                    </span>
                  </Label>
                  <Input
                    type="number"
                    className="flex-1"
                    required
                    name="withdrawMoney"
                    placeholder={t("withdrawAmount")}
                    max={Number(data?.usableBalanceMoney)}
                    min={0}
                    step={0.01}
                    onBlur={(e) => {
                      e.target.reportValidity();
                    }}
                    onChange={(e) => {
                      handleWithdrawFee(Number(e.target.value));
                    }}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24" />
                  <div className="space-y-1 text-sm">
                    <div className="text-destructive">{t("notice")}</div>
                    <div className="text-destructive">
                      {t("notAllowWithdraw")}
                    </div>
                    <div className="text-destructive">{t("stopAccept")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Label className="flex w-24 shrink-0 items-center justify-end gap-1">
                    <span className="text-muted-foreground">
                      {t("withdrawFee")}
                    </span>
                  </Label>
                  <Input
                    type="text"
                    className="flex-1"
                    required
                    name="withdrawFee"
                    defaultValue={withDrawFee}
                    disabled
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Label className="flex w-24 shrink-0 items-center justify-end gap-1">
                    <span className="text-muted-foreground">
                      {t("withdrawWay")}
                    </span>
                  </Label>
                  <Input
                    type="text"
                    className="flex-1"
                    required
                    name="withdrawWay"
                    onBlur={(e) => {
                      e.target.reportValidity();
                    }}
                    placeholder={t("withdrawWay")}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Label className="flex w-24 shrink-0 items-center justify-end gap-1">
                    <span className="text-muted-foreground">{t("secret")}</span>
                  </Label>
                  <Password
                    type="password"
                    className="flex-1"
                    required
                    name="secret"
                    onBlur={(e) => {
                      e.target.reportValidity();
                    }}
                    placeholder={t("secret")}
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
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin" />}
                {translations("confirm")}
              </Button>
            </DialogFooter>
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>{t("google2fa")}</DialogTitle>
            </DialogHeader>
            <div className="mx-auto w-full max-w-xl p-4">
              <div className="flex flex-col gap-4">
                <Label className="after:text-destructive shrink-0 after:ml-1 after:content-['*']">
                  {t("google2faCode")}
                </Label>
                <Input
                  placeholder={t("google2faCode")}
                  value={googleCode}
                  onChange={(e) => setGoogleCode(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {translations("cancel")}
              </Button>
              <Button onClick={() => handleVerify()} disabled={loading}>
                {loading && <Loader2 className="animate-spin" />}
                {t("verify")}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
