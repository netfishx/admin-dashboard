import type { AgentData } from "@/api";
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
import { useTranslations } from "next-intl";
import { useState } from "react";

export function TransferMoneyModal({
  open,
  onOpenChange,
  editData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData: AgentData | null;
}) {
  const t = useTranslations("users.agents");
  const [amount, setAmount] = useState(0);
  const [moneyPassword, setMoneyPassword] = useState("");
  const handleClickTransferMoney = () => {
    console.info(amount, moneyPassword);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("transferMoney")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">{t("userName")}</Label>
            <span>{editData?.userName}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">{t("amount")}</Label>
            <Input
              className="w-1/4"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/5 text-right">
              {t("moneyPassword")}
            </Label>
            <Password
              value={moneyPassword}
              type="password"
              onChange={(e) => setMoneyPassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("close")}
          </Button>
          <Button onClick={handleClickTransferMoney}>{t("save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
