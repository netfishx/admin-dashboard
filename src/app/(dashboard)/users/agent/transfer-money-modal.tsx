"use client";

import { transferMoney } from "@/api";
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
  agentDataAtom,
  availableAmountAtom,
  transferMoneyModalAtom,
} from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { GoogleValidataModal } from "../components/google-validata-modal";

export function TransferMoneyModal() {
  const router = useRouter();
  const translation = useTranslations();
  const t = useTranslations("users.agents");

  const [isPeding, startTransition] = useTransition();
  const [open, setOpen] = useAtom(transferMoneyModalAtom);

  const data = useAtomValue(agentDataAtom);
  const availableAmount = useAtomValue(availableAmountAtom);
  const ref = useRef<HTMLFormElement>(null);
  const [googleValidataOpen, setGoogleValidataOpen] = useState(false);
  // 订单id
  const [orderId, setOrderId] = useState("");
  // 金额校验是否正确
  const [isValidataMoney, setIsValidataMoney] = useState(false);

  const handleClickTransferMoney = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      if (!data?.id) {
        return;
      }
      const {
        code,
        data: result,
        message,
      } = await transferMoney({
        userId: formData.get("id") as string,
        amount: Number(formData.get("amount")),
        secret: formData.get("moneyPassword") as string,
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
        <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{t("transferMoney")}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <Form ref={ref} action="" onSubmit={handleClickTransferMoney}>
            <input type="hidden" name="id" value={data?.id} />
            <div className="flex w-full flex-col gap-4 px-4">
              <div className="flex items-center gap-4">
                <Label className="text-muted-foreground w-20 shrink-0 text-right">
                  {t("username")}
                </Label>
                <span>{data?.username}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <Label className="text-muted-foreground w-20 shrink-0 text-right">
                    {t("amount")}
                  </Label>
                  <Input
                    className="flex-1"
                    name="amount"
                    type="number"
                    min={0}
                    max={availableAmount}
                    step={0.01}
                    onBlur={(e) => {
                      setIsValidataMoney(e.target.reportValidity());
                    }}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label className="text-muted-foreground w-20 shrink-0 text-right" />
                  <div className="text-destructive flex flex-1 flex-row text-xs">
                    {t("availableAmount")}:{availableAmount}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Label className="text-muted-foreground w-20 shrink-0 text-right">
                  {t("moneyPassword")}
                </Label>
                <Password
                  type="password"
                  name="moneyPassword"
                  className="flex-1"
                />
              </div>
            </div>
          </Form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {translation("cancel")}
            </Button>
            <Button
              disabled={isPeding || !isValidataMoney}
              onClick={(e) => {
                e.preventDefault();
                if (ref.current) {
                  ref.current.requestSubmit();
                }
              }}
            >
              {isPeding && <Loader2 className="animate-spin" />}
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
