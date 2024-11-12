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
import type { AgentData } from "@/lib/types";
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
      <DialogContent className="2xl:max-w-lg lg:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("transferMoney")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full px-4">
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("username")}
            </Label>
            <span>{editData?.username}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
              {t("amount")}
            </Label>
            <Input
              className="w-[200px]"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="shrink-0 w-1/4 text-right text-muted-foreground">
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
