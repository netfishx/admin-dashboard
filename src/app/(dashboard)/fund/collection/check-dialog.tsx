"use client";
import { postCheckMoneySecret } from "@/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {} from "@/components/ui/tooltip";
import type { CollectionAddressListRecords } from "@/lib/types";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
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
  const [step, setStep] = useState(1);
  const handleNext = async () => {
    const res = await postCheckMoneySecret({
      userId: item.id,
      secret: password,
    });
    setStep(2);
  };
  const [password, setPassword] = useState("");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[500px]"
        onInteractOutside={(event) => {
          event.preventDefault(); // 阻止关闭弹框
        }}
      >
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>{t("checkStep1Title")}</DialogTitle>
            </DialogHeader>
            <div className="gap-2 items-center">
              <Label className="shrink-0">{t("password")}</Label>
              <Input
                value={password ?? ""}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("checkStep1Desc")}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {translations("cancel")}
              </Button>
              <Button onClick={() => handleNext()}>
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
            <div className="max-w-xl w-full mx-auto p-4">
              <Card className="border border-gray-200 shadow-sm">
                {/* Header row */}
                <div className="flex divide-x divide-gray-200">
                  <div className="py-2.5 px-4 text-gray-600 bg-gray-50 w-24 text-sm">
                    {t("secretInfo")}
                  </div>
                  <div className="py-2.5 px-4 flex-1 flex justify-between items-center bg-card">
                    <span className="text-gray-800 font-mono text-sm">
                      {item?.privateKey}
                    </span>
                    <CopyButton address={item?.privateKey} />
                  </div>
                </div>

                {/* Warning message */}
                <div className="px-4 py-2 border-t border-gray-200">
                  <div className="flex items-center gap-1.5 text-red-500 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{t("secretWarning")}</span>
                  </div>
                </div>
              </Card>
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
