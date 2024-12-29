"use client";
import { postCheckMoneySecret } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Password } from "@/components/ui/password";
import type { CollectionAddressListRecords } from "@/lib/types";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import CopyButton from "./copy-button";

interface Dialogprops {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  item: CollectionAddressListRecords;
}

export function CheckDialog(props: Dialogprops) {
  const { open = true, onOpenChange, item } = props;
  const t = useTranslations("fund.collection");
  const translations = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState(1);
  const handleNext = () => {
    startTransition(async () => {
      const res = await postCheckMoneySecret({
        secret: password,
      });
      if (res.code === 0 && res.data) {
        setStep(2);
      } else {
        toast.error(res.message);
      }
    });
  };
  const [password, setPassword] = useState("");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogDescription />

      <DialogContent>
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>{t("checkStep1Title")}</DialogTitle>
            </DialogHeader>
            <div className="items-center gap-2">
              <Label className="before:text-destructive block shrink-0 py-2 before:mr-1 before:content-['*']">
                {t("passwordCheckTips")}
              </Label>
              <Password
                type="password"
                value={password ?? ""}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("checkStep1Desc")}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {translations("cancel")}
              </Button>
              <Button
                onClick={() => handleNext()}
                disabled={isPending || !password}
              >
                {isPending && <Loader2 className="animate-spin" />}
                {translations("confirm")}
              </Button>
            </DialogFooter>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>{t("checkStep2Title")}</DialogTitle>
            </DialogHeader>
            <div className="mx-auto w-full max-w-xl p-4">
              <div className="text-card-foreground rounded-xl  border shadow-sm">
                {/* Header row */}
                <div className="divide-muted flex divide-x">
                  <div className="bg-muted flex w-24 items-center justify-center px-4 py-2.5 text-sm">
                    {t("secretInfo")}
                  </div>
                  <div className="bg-card flex flex-1 items-center justify-between px-4 py-2.5">
                    <span className="break-all font-mono text-sm">
                      {item?.privateKey}
                    </span>
                    <CopyButton address={item?.privateKey} />
                  </div>
                </div>

                {/* Warning message */}
                <div className="border-muted border-t px-4 py-2">
                  <div className="text-destructive flex items-center gap-1.5 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{t("secretWarning")}</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {translations("cancel")}
              </Button>
              <Button onClick={() => onOpenChange(false)}>
                {translations("confirm")}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
