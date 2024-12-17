"use client";

import { getUserBasicInfo, modifyCreditLimit } from "@/api";
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
  increaseCreditModalAtom,
  memberIdAtom,
  memberInfoDataAtom,
} from "@/store";
import { Big } from "big.js";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";
import { GoogleValidataModal } from "../components/google-validata-modal";

export function IncreaseCreditModal() {
  const translation = useTranslations();
  const t = useTranslations("users.members");
  const [open, setOpen] = useAtom(increaseCreditModalAtom);
  const [isPending, startTransition] = useTransition();

  const [amountAfter, setAmountAfter] = useState(0);
  // 金额校验是否正确
  const [isValidataMoney, setIsValidataMoney] = useState(false);

  const memberId = useAtomValue(memberIdAtom);
  const memberInfoData = useAtomValue(memberInfoDataAtom);
  const ref = useRef<HTMLFormElement>(null);
  const [availableAmount, setAvailableAmount] = useState(0);
  const [fetching, startFetching] = useTransition();
  // 订单id
  const [orderId, setOrderId] = useState("");
  // 是否开启谷歌验证弹窗
  const [googleValidataOpen, setGoogleValidataOpen] = useState(false);
  const router = useRouter();
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
        amount: Number(formData.get("amount")),
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
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{t("increaseCredit")}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="divide-y rounded-lg border indent-4">
            <div className="grid grid-cols-3">
              <div className="border-r bg-muted py-2 text-muted-foreground">
                {t("memberUsername")}
              </div>
              <div className="py-2">{memberInfoData?.username}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="border-r bg-muted py-2 text-muted-foreground">
                {t("usedCreditAmount")}
              </div>
              <div className="py-2">{memberInfoData?.creditAmount ?? 0}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="border-r bg-muted py-2 text-muted-foreground">
                {t("usedBorrowAmount")}
              </div>
              <div className="py-2">{memberInfoData?.debtAmount ?? 0}</div>
            </div>
          </div>

          <Form ref={ref} action="" onSubmit={handleConfirm}>
            <input type="hidden" name="userId" value={memberId} />
            <div className="flex flex-col gap-2 rounded-lg border p-4 text-center">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <Label className="w-28 shrink-0 text-right text-muted-foreground">
                    {t("increaseCreditAmount")}
                  </Label>
                  <Input
                    className="flex-1"
                    type="number"
                    name="amount"
                    min={0}
                    step={0.01}
                    max={availableAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) {
                        setAmountAfter(
                          Big(value)
                            .add(Big(memberInfoData?.creditAmount ?? 0))
                            .toNumber(),
                        );
                      } else {
                        setAmountAfter(0);
                      }
                    }}
                    onBlur={(e) => {
                      setIsValidataMoney(e.target.reportValidity());
                    }}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label className="w-28 shrink-0 text-right text-muted-foreground" />
                  <div className="flex flex-1 flex-row text-xs text-destructive">
                    {t("availableAmount")}:
                    {fetching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      availableAmount
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Label className="w-28 shrink-0 text-right text-muted-foreground">
                  {t("creditAmountAfter")}
                </Label>
                <Input
                  className="flex-1"
                  disabled
                  value={amountAfter.toString()}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label className="w-28 shrink-0 text-right text-muted-foreground">
                  {t("moneyPassword")}
                </Label>
                <Password type="password" className="flex-1" name="secret" />
              </div>
            </div>
          </Form>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setAmountAfter(0);
              }}
            >
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
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {translation("confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <GoogleValidataModal
        open={googleValidataOpen}
        setOpen={setGoogleValidataOpen}
        id={orderId}
      />
    </>
  );
}
